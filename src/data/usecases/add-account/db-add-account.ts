import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepositoryProtocol,
  EncrypterProtocol,
} from ".";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: EncrypterProtocol;
  private readonly addAccountRepository: AddAccountRepositoryProtocol;
  constructor(
    encrypter: EncrypterProtocol,
    addAccountRepository: AddAccountRepositoryProtocol,
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);

    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });

    return account;
  }
}
