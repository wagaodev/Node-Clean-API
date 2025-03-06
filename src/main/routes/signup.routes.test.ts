import request from "supertest";
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/account-repository/helper/mongo-helper";

describe("Signup Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection("accounts");
    accountCollection.deleteMany({});
  });

  it("Should return an account on success", async () => {
    await request(app).post("/api/signup").send({
      name: "Wagão",
      email: "wagaodev@gmail.com",
      password: "123",
      passwordConfirmation: "123",
    });
  });
});
