import { ObjectId } from "mongodb";
import { MongoHelper as sut } from "./mongo-helper";

describe("MongoHelper", () => {
  beforeEach(async () => {
    await sut.connect(process.env.MONGO_URL as string);
  });

  afterEach(async () => {
    await sut.disconnect();
    jest.restoreAllMocks();
  });

  it("Should reconnect if mongoDB is down", async () => {
    jest.spyOn(sut, "isConnected").mockResolvedValueOnce(false);
    const connectSpy = jest.spyOn(sut, "connect");

    const collection = await sut.getCollection("accounts");

    expect(collection).toBeTruthy();
    expect(connectSpy).toHaveBeenCalled();
  });

  it("Should return true if MongoClient is connected", async () => {
    const commandMock = jest.fn().mockResolvedValueOnce({ ok: 1 });

    jest.spyOn(sut.client!, "db").mockReturnValueOnce({
      command: commandMock,
    } as any);

    const result = await sut.isConnected();
    expect(result).toBe(true);
  });

  it("Should return false if MongoClient ping fails", async () => {
    const commandMock = jest
      .fn()
      .mockRejectedValueOnce(new Error("ping failed"));

    jest.spyOn(sut.client!, "db").mockReturnValueOnce({
      command: commandMock,
    } as any);

    const result = await sut.isConnected();
    expect(result).toBe(false);
  });

  it("Should throw if getClient is called without initializing client", () => {
    sut.client = null;
    expect(() => sut.getClient()).toThrow("MongoClient not initialized");
  });

  it("Should NOT throw if disconnect is called without initializing client", async () => {
    sut.client = null;
    await expect(sut.disconnect()).resolves.not.toThrow();
  });

  it("Should call client.close on disconnect if client is initialized", async () => {
    const closeSpy = jest.fn().mockResolvedValue(undefined);
    sut.client = { close: closeSpy } as any;

    await sut.disconnect();

    expect(closeSpy).toHaveBeenCalled();
    expect(sut.client).toBeNull();
  });

  it("Should return null if findByIdAndMap doesn't find document", async () => {
    const fakeCollection = {
      findOne: jest.fn().mockResolvedValueOnce(null),
    };

    jest
      .spyOn(sut, "getCollection")
      .mockResolvedValueOnce(fakeCollection as any);

    const result = await sut.findByIdAndMap("accounts", new ObjectId());

    expect(result).toBeNull();
    expect(fakeCollection.findOne).toHaveBeenCalled();
  });
});
