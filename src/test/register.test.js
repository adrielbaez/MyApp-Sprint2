const assert = require("chai").assert;
const fetch = require("node-fetch");
const urlAPI = "http://localhost:4000/api/users";

describe("Test API Register", () => {
  it("1.API Signup", async () => {
    let request = await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "nickName": "t1ve8s43t8211",
        "firstName": "Adriel",
        "lastName": "Baez",
        "email": "te15svfdf22591t@gmail.com",
        "phone": "2526854341",
        "address": "avenida 9 de julio 723",
        "password": "1234",
      }),
    });
    let response = await request.json();
    console.log(response.response);
    //console.log(json.status)
    assert.strictEqual(response.response.status, 201);
  });
});
