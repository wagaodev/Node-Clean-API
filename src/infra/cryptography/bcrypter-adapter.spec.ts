import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";
import { EncrypterProtocol } from "../../data/protocols/encrypter";

jest.mock("Bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));
describe("Bcrypt Adapter", () => {
  const salt = 12;

  const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt);
  };

  it("Should call bcrypt with correct value", async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });
  it("Should return a hash on success", async () => {
    const sut = makeSut();
    const hash = await sut.encrypt("any_value");
    expect(hash).toBe("hash");
  });
  it("Should throw when bcrypt throws", async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementationOnce(() => Promise.reject(new Error()));

    const promise = sut.encrypt("any_value");
    await expect(promise).rejects.toThrow();
  });
});
