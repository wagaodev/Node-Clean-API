import { AccountMongoRepository } from "./account-repository";
import { MongoHelper } from "./helper/mongo-helper";

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it("Should return an account on success", async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
    expect(account).toBeTruthy();
    expect(account.name).toEqual("any_name");
    expect(account.email).toEqual("any_email@mail.com");
    expect(account.password).toEqual("any_password");
  });
});
