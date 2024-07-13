import { SignUpController } from "./signup";

describe("SignUpController", () => {
  const mockData = {
    name: "Jane Doe",
    email: "janedoe@mail.com",
    password: "anypass",
  };
  it("should return status code 400 if name is not provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: mockData.email,
        password: mockData.password,
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: name"));
  });
  it("should return status code 400 if email is not provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: mockData.name,
        password: mockData.password,
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: email"));
  });
});
