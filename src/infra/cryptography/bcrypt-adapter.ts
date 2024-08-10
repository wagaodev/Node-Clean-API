import bcrypt from "bcrypt";
import { EncrypterProtocol } from "../../data/protocols/encrypter";

export class BcryptAdapter implements EncrypterProtocol {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }
  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }
}
