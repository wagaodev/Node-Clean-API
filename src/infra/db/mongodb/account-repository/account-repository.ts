import {
  AccountModel,
  AddAccountModel,
} from "../../../../domain/models/account";
import { MongoHelper } from "./helper/mongo-helper";

export class AccountMongoRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const { insertedId } = await accountCollection.insertOne(accountData);
    const accountById = await accountCollection.findOne({ _id: insertedId });
    if (!accountById) throw new Error("Account not found");
    const { _id, ...accountDataWithoutId } = accountById;
    return {
      ...accountDataWithoutId,
      id: _id.toHexString(),
    } as AccountModel;
  }
}
