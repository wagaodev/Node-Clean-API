import { MongoClient, Collection, ObjectId } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient | null,

  async connect(uri: string): Promise<void> {
    if (!this.client) {
      this.client = new MongoClient(uri);
      await this.client.connect();
    }
  },

  async disconnect(): Promise<void> {
    this.ensureClientInitialized();
    await this.client?.close();
    this.client = null;
  },

  getClient(): MongoClient {
    this.ensureClientInitialized();
    return this.client as MongoClient;
  },

  async getCollection(name: string): Promise<Collection> {
    this.ensureClientInitialized();
    return this.client!.db().collection(name);
  },

  ensureClientInitialized(): void {
    if (!this.client) {
      throw new Error("MongoClient not initialized");
    }
  },
  async findByIdAndMap<T>(
    collectionName: string,
    id: ObjectId,
  ): Promise<T | null> {
    const collection = await this.getCollection(collectionName);
    const result = await collection.findOne({ _id: id });
    if (!result) return null;
    const { _id, ...documentWithoutId } = result;
    return { ...documentWithoutId, id: _id.toHexString() } as T;
  },
};
