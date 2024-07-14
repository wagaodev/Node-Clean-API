import { HttpResponseProtocol } from "../../protocols";

export const badRequest = (error: Error): HttpResponseProtocol => ({
  statusCode: 400,
  body: error,
});
