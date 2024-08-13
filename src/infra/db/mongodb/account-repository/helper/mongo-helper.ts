import { MongoClient, Collection } from "mongodb";

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

  getCollection(name: string): Collection {
    this.ensureClientInitialized();
    return this.client!.db().collection(name);
  },

  ensureClientInitialized(): void {
    if (!this.client) {
      throw new Error("MongoClient not initialized");
    }
  },
};
