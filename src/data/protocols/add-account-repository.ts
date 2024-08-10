import { AddAccountModel, AccountModel } from "../../domain/models/account";

export interface AddAccountRepositoryProtocol {
  add(accountData: AddAccountModel): Promise<AccountModel>;
}
