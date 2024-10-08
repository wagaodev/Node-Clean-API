import {
  AccountModel,
  AddAccountModel,
  AddAccountRepositoryProtocol,
  EncrypterProtocol,
} from ".";
import { DbAddAccount } from "./db-add-account";

interface SutType {
  sut: DbAddAccount;
  encrypterStub: EncrypterProtocol;
  AddAccountRepositoryStub: AddAccountRepositoryProtocol;
}

const makeEncrypter = (): EncrypterProtocol => {
  class EncrypterStub implements EncrypterProtocol {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};

const makeAddAccountRepository = (): AddAccountRepositoryProtocol => {
  class AddAccountRepositoryStub implements AddAccountRepositoryProtocol {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        password: "hashed_password",
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountRepositoryStub();
};

const makeSut = (): SutType => {
  const encrypterStub = makeEncrypter();
  const AddAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, AddAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    AddAccountRepositoryStub,
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
  it("Should throws if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const account = sut.add(accountData);
    await expect(account).rejects.toThrow();
  });
  it("Should call AddAccountRepository with correct values", async () => {
    const { sut, AddAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(AddAccountRepositoryStub, "add");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });

  it("Should throw if Encrypter throws", async () => {
    const { sut, AddAccountRepositoryStub } = makeSut();
    jest
      .spyOn(AddAccountRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
  it("Should return an account on success", async () => {
    const { sut } = makeSut();
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const account = await sut.add(accountData);
    expect(account).toEqual({
      id: "valid_id",
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });
});
