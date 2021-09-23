const assert = require('chai').assert;
const fetch = require('node-fetch');
const urlAPI = 'http://localhost:4000/api/users';

describe("Test API Register", () => {

  it("1.API Signup: Failed new user creation", async () => {
    await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "nickName": "tes1212t",
        "firstName": "Adriel",
        "lastName": "Baez",
        "email": "tes584551t@gmail.com"
      }),
    })
    .then(responseApi => responseApi.json())
    .then(data =>{

        //should return a status 500, because information is missing
        //to create the new user
        assert.strictEqual(data.status, 500, 'One state expected: 500');
    })
  });

  it("2.API Signup : Correct creation of the user", async () => {
    await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "nickName": "newUser",
        "firstName": "Adriel",
        "lastName": "Baez",
        "email": "newUser@gmail.com",
        "phone": "2526854341",
        "address": "avenida 9 de julio 723",
        "password": "1234"
      }),
    })
    .then(responseApi => responseApi.json())
    .then(data =>{

        //should return a status 201, because
        //to created the new user
        assert.strictEqual(data.status, 201, 'One state expected: 201');
        assert.exists(data.response.token, 'A token is expected in response');
    })
  });

  it("3.API Signup : Existing email", async () => {
    await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "nickName": "newUser",
        "firstName": "Adriel",
        "lastName": "Baez",
        "email": "newUser@gmail.com",
        "phone": "2526854341",
        "address": "avenida 9 de julio 723",
        "password": "1234"
      }),
    })
    .then(responseApi => responseApi.json())
    .then(data =>{

        //should return a status 400, because
        //The email already exists in our databases
        assert.strictEqual(data.status, 400, 'One state expected: 400');
    })
  });
});
