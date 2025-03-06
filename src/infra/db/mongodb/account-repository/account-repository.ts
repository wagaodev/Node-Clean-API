import {
  AccountModel,
  AddAccountModel,
} from "../../../../domain/models/account";
import { MongoHelper } from "./helper/mongo-helper";

export class AccountMongoRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const { insertedId } = await accountCollection.insertOne(accountData);
    const account = await MongoHelper.findByIdAndMap<AccountModel>(
      "accounts",
      insertedId,
    );
    if (!account) throw new Error("Account not found");
    return account;
  }
}
