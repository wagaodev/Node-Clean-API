import validator from "validator";
import { EmailValidatorProtocol } from "../presentation/protocols";

export class EmailValidatorAdapter implements EmailValidatorProtocol {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
