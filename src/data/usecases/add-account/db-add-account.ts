import { AccountModel, AddAccountModel } from "../../../domain/models/account";
import { AddAccount } from "../../../domain/usecases/add-account";
import { EncrypterProtocol } from "../../protocols/encrypter";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: EncrypterProtocol;
  constructor(encrypter: EncrypterProtocol) {
    this.encrypter = encrypter;
  }
  async add(account: AddAccountModel): Promise<any> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(null));
  }
}
