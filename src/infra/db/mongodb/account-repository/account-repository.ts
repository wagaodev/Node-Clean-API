interface AddAccountModel {
  name: string;
  email: string;
  password: string;
}

export class AccountMongoRepository {
  async add(accountData: AddAccountModel): Promise<any> {
    return accountData;
  }
}
