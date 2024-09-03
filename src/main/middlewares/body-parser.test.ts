import request from "supertest";
import app from "../config/app";

describe("Body Parser Middleware", () => {
  it("Should parse body as json", async () => {
    app.post("/test_body_parser", (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post("/test_body_parser")
      .send({ name: "Wagner" })
      .expect({ name: "Wagner" });
  });
  it("Should return xml content type when forced", async () => {
    app.post("/test_content_type_xml", (req, res) => {
      res.type("xml");
      res.send("");
    });
    await request(app)
      .post("/test_content_type_xml")
      .expect("content-type", /xml/);
  });
});
