import {
  HttpRequestProtocol,
  HttpResponseProtocol,
  ControllerProtocol,
  EmailValidatorProtocol,
} from "../protocols";
import { InvalidParamError } from "../errors";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, serverError } from "../helpers/http-helper";
import { AddAccount } from "../../domain/usecases/add-account";

export class SignUpController implements ControllerProtocol {
  private readonly emailValidator: EmailValidatorProtocol;
  private readonly addAccount: AddAccount;
  constructor(emailValidator: EmailValidatorProtocol, addAcount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAcount;
  }
  handle(httpRequest: HttpRequestProtocol): HttpResponseProtocol {
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

      this.addAccount.add({
        name,
        email,
        password,
      });

      return {
        statusCode: 200,
        body: "success",
      };
    } catch (err) {
      return serverError();
    }
  }
}
