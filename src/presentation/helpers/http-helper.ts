import { HttpResponseProtocol } from "../../protocols";
import { ServerError } from "../errors";

export const badRequest = (error: Error): HttpResponseProtocol => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): HttpResponseProtocol => ({
  statusCode: 500,
  body: new ServerError(),
});
