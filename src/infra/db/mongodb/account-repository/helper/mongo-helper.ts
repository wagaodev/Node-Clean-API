import { MongoClient, Collection, ObjectId } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: "" as string,

  async connect(uri?: string): Promise<void> {
    if (uri) this.uri = uri;
    if (!this.uri) throw new Error("Mongo URI is not defined");

    if (!this.client || !(await this.isConnected())) {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
    }
  },

  async disconnect(): Promise<void> {
    await this.client?.close();
    this.client = null;
  },

  async isConnected(): Promise<boolean> {
    if (!this.client) return false;
    try {
      await this.client.db().command({ ping: 1 });
      return true;
    } catch {
      return false;
    }
  },

  getClient(): MongoClient {
    this.ensureClientInitialized();
    return this.client as MongoClient;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client || !(await this.isConnected())) {
      await this.connect();
    }
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
