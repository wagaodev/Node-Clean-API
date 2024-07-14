import {
  HttpRequestProtocol,
  HttpResponseProtocol,
  ControllerProtocol,
  EmailValidatorProtocol,
} from "../../protocols";
import { InvalidParamError, ServerError } from "../errors";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, serverError } from "../helpers/http-helper";

export class SignUpController implements ControllerProtocol {
  private readonly emailValidator: EmailValidatorProtocol;
  constructor(emailValidator: EmailValidatorProtocol) {
    this.emailValidator = emailValidator;
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

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      return {
        statusCode: 200,
        body: "success",
      };
    } catch (err) {
      return serverError();
    }
  }
}
