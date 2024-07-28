import {
  HttpRequestProtocol,
  HttpResponseProtocol,
  ControllerProtocol,
  EmailValidatorProtocol,
  AddAccount,
} from "../signup/signup-protocols";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, ok, serverError } from "../../helpers";

export class SignUpController implements ControllerProtocol {
  private readonly emailValidator: EmailValidatorProtocol;
  private readonly addAccount: AddAccount;
  constructor(emailValidator: EmailValidatorProtocol, addAcount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAcount;
  }
  async handle(
    httpRequest: HttpRequestProtocol,
  ): Promise<HttpResponseProtocol> {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      return ok(account);
    } catch (err) {
      return serverError();
    }
  }
}
