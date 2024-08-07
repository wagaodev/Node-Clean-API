import { HttpRequestProtocol, HttpResponseProtocol } from "./http";

export interface ControllerProtocol {
  handle(httpRequest: HttpRequestProtocol): Promise<HttpResponseProtocol>;
}
