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

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
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

  it("Should throw an error if findByIdAndMap returns null", async () => {
    const sut = makeSut();

    jest.spyOn(MongoHelper, "findByIdAndMap").mockResolvedValueOnce(null);

    const promise = sut.add({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });

    await expect(promise).rejects.toThrow(new Error("Account not found"));
  });
});
