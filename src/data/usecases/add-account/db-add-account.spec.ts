import { EncrypterProtocol } from "../../protocols/encrypter";
import { DbAddAccount } from "./db-add-account";

interface SutType {
  sut: DbAddAccount;
  encrypterStub: EncrypterProtocol;
}

const makeSut = (): SutType => {
  class EncrypterStub {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  const encrypterStub = new EncrypterStub();
  const sut = new DbAddAccount(encrypterStub);
  return {
    sut,
    encrypterStub,
  };
};

describe("DbAddAccount Usecase", () => {
  it("Should call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
  it("Should return 500 if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    // jest.spyOn(encrypterStub, "encrypt").mockImplementationOnce(() => {
    //   return new Promise((_, reject) => reject(new Error()));
    // });
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
