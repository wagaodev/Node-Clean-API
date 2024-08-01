import { AddAccount, AddAccountModel, EncrypterProtocol } from ".";

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
