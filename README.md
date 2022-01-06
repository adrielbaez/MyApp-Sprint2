# MyApp-API

_API to manage all Delilah Restó restaurant orders. Developed with Node, Express and Swagger._

## Starting 🚀

_These instructions will allow you to obtain a working copy of the project on your local machine for development and testing purposes._

### Pre-requisites 📋

_What you need to install the software and how to install them_

* [Node.js](https://nodejs.org/es/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Account on MongoDb](https://account.mongodb.com/account/login?signedOut=true)
* [Redis](https://redis.io/download)

### Instalation Part 1 🔧

* Create folder for your installation
* Enter the created folder and from the console run:
  ```
  git clone https://github.com/adrielbaez/MyApp-Sprint2.git
  ```
### Sets the necessary requirements in the environment variables

* Enter the MyApp-Sprint2 folder.
* Changes the name of the .env.example file to .env
* No MongoDB account? create an account [Account on MongoDb](https://account.mongodb.com/account/login?signedOut=true)
* In the file .env you must replace the url of your database in the environment variable "MONGODB". 
* Set the name of your secret key.

### Instalation Part 2 🔧

* Run
  ```
  npm install
  ```
* To raise the server, we run the following command
  ```
  npm start
  ```
* If you have nodemon installed, Runs the application in development mode
  ```
  npm run dev
  ```
### Documentation 📋
_The documentation is done with Swagger_
_Requirements: you have to start session, then in autorize put your token and this will authenticate you in the application_
* [Swagger Documentation ( http://localhost:4000/api-docs )](http://localhost:4000/api-docs)

### Run Test 📋
_to run the test of the registration form, you must go to the root of the application, and run the following_
 ```
  npm test
 ```
### AWS 📋
_To access the infrastructure console, you need an access provided by the administrator_

_Please contact: baez.adriel27@gmail.com_
