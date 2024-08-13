import { MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient | null,

  async connect(uri: string): Promise<void> {
    if (!this.client) {
      this.client = new MongoClient(uri);
      await this.client.connect();
    }
  },

  async disconnect(): Promise<void> {
    if (!this.client) {
      throw new Error("MongoClient not initialized");
    }
    await this.client.close();
    this.client = null;
  },

  getClient(): MongoClient {
    if (!this.client) {
      throw new Error("MongoClient not initialized");
    }
    return this.client;
  },
};
