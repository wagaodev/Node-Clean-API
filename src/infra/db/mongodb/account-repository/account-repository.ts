import {
  AccountModel,
  AddAccountModel,
} from "../../../../domain/models/account";
import { MongoHelper } from "./helper/mongo-helper";
import { ObjectId } from "mongodb";

export class AccountMongoRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const { insertedId } = await accountCollection.insertOne(accountData);
    const account = await MongoHelper.findByIdAndMap<AccountModel>(
      "accounts",
      insertedId as ObjectId,
    );
    if (!account) throw new Error("Account not found");
    return account;
  }
}
