# RetroMail SMTP Server

[Summary](#summary) | [Specification](#specification) | [Getting started](#getting-started) | [Approach](#approach) | [More](#further-development)

## Summary

A Javascript application that provides back end logic for the React.js front end of the application, facilitating communication between the front end and SMTP and POP servers.

It builds upon the [Net](https://nodejs.org/api/net.html) Node.js module which provides an API for creating stream-based TCP servers and clients. The app can be run using Node.js and will log server events such as clients connections, disconnections and the messages it receives.

## Specification

### Requirements

The primary requirement was to implement minimalistic handshake with SMTP and POP servers, allowing for sending and receiving of messages. The handshake sequence for SMTP client was implemented as a minimalistic implementation of the SMTP RFC. The POP handshake was derived from the POP3 RFC but implemented in a simplified form due to time constraints.

Mail Client - SMTP handshake sequence:

```
   ========                         ========
  |        |-------- EHLO -------->|        |
  |        |<------- 250 ----------|        |
  |        |                       |        |
  |        |-- MAIL FROM:<email>-->|        |
  |        |<------- 250 ----------|        |
  |        |                       |        |
  |        |-- RCPT TO:<email> --->|        |
  |        |<------- 250 ----------|        |
  | CLIENT |                       |  SMTP  |
  |        |------- DATA --------->|        |
  |        |<------- 354 ----------|        |
  |        |                       |        |
  |        |------ <message> ----->|        |
  |        |<------- 250 ----------|        |
  |        |                       |        |
  |        |-------- QUIT -------->|        |
  |        |<------- 221 ----------|        |
   ========                         ========

```

Mail Client - POP handshake sequence:

```
   ========                         ========
  |        |-------- HELLO ------->|        |
  |        |<------- 250 ----------|        |
  |        |                       |        |
  |        |-- USER <email>     -->|        |
  |        |<------- 250 ----------|        |
  | CLIENT |                       |  POP3  |
  |        |--- MessageRequest --->|        |
  |        |<- <messages for user>-|        |
  |        |                       |        |
  |        |------- QUIT --------->|        |
  |        |<------- 331 ----------|        |
   ========                         ========
```
The key features required were:
* Mail client must be able to connect to both the SMTP and POP server
* Mail client must be able to run through the handshake sequence with both servers and send/retrieve messages (as appropriate)
* Mail client must be able to accept commands from the React front end
* Logging of handshake process for debugging/monitoring purposes


### Acceptance Criteria

* Mail Client connects to SMTP/POP server over TCP and executes handshake correctly
* Mail Client receives message content from React front end and passes it to the SMTP Server
* Mail Client retrieves messages from POP and provides it to React front end
* Mail Client closes the connection on completion of the handshake

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This requires Node to run it and npm as the package manager to simplify the build process and include all necessary dependencies. If you do not have Node.js installed, it is recommended you do so ([Node](https://nodejs.org/en/download/)).

### Running the app

#### Installation
To get started please follow the subsequent steps.

```
$ git clone https://github.com/charmalt/final-project-client.git
$ cd <repo name>
$ npm install
```
#### Config

Server ports and addresses are contained in the `config.js` in the root directory.

#### Starting the app

To start the app:

1. Run`npm start` in the root directory
2. Run `npm start` in the clientFrontEnd directory

The app will open on `localhost:3000`

## Approach

### Overview of the email process 

Our overall model for the email process is based on the following representation of the email process:

![EmailProcess](./images/EMAIL%20PROCESS%20-%20Page%201.png)

### Methodology

The aim for the project was to understand how email worked in greater detail. The high level goals were to have code that was clean, easy to read, well encapsulated and easy to extend. We took an Object Oriented Programming (OOP) approach and, although there are still plenty of areas we would like to improve if given the time, we did our best to keep to the Single Responsibility Principle. This particular repository represents just the Mail Client element of the project and more information about the project as a whole can be found [here](XXXXXXXXXXXXXXXX).

The following diagram shows the relationships between the objects as well as their properties and public methods:

![MailClient](./images/Email-UML%20for%20Mail%20Client_SMALL.png)

### Technologies

The project was written using Javascript with ES6 syntax. This language was selected as the most suitable for the team based on its growing popularity, level of familiarity across all team members and interesting challenges around asynchronous behaviour. We used Jest as the testing framework and ESLint for linting. We also used TravisCI as our Continuous Integration tool.

## Testing

### Testing Approach

We adopted a test-driven development (TDD) approach to this project with extensive unit testing to ensure our code was behaving as we intended. We isolated our test objects using Jest's in-build mocking capabilities. We made sure to mock out any imported libraries as these should have been tested by the libraries' developers.

Certain key interfaces such as database connection and connecting to clients were tested using feature tests. One area for improvement would be to have more feature tests as this would have helped identify some issues with functionality at an earlier stage.

### Running the tests

Automated tests are run with ```npm test``` from the root directory. 

```
 PASS  test/inbox.test.js
 PASS  test/serverConnection.test.js
 PASS  test/receiverHandshake.test.js
 PASS  test/senderHandshake.test.js
 PASS  test/mailClient.test.js
 PASS  test/features/clientConnection.test.js (6.493s)
----------------------|----------|----------|----------|----------|-------------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------------|----------|----------|----------|----------|-------------------|
All files             |    99.01 |      100 |    97.56 |      100 |                   |
 inbox.js             |      100 |      100 |      100 |      100 |                   |
 mailClient.js        |      100 |      100 |      100 |      100 |                   |
 receiverHandshake.js |      100 |      100 |      100 |      100 |                   |
 senderHandshake.js   |      100 |      100 |      100 |      100 |                   |
 serverConnection.js  |    95.45 |      100 |       90 |      100 |                   |
----------------------|----------|----------|----------|----------|-------------------|

Test Suites: 6 passed, 6 total
Tests:       50 passed, 50 total
Snapshots:   0 total
Time:        7.994s
Ran all test suites.
```

### Coverage

As the above shows we have 100% test coverage except where there are alternative branches depending on environment. Although the overall figure of 100% is not always critical it was important in our case to have a high coverage as the majority of our code is our own and does not rely on external libraries or frameworks.


## Deployment

This application was not deployed due to the fact that it required the hosting service to provide a static IP and port as well as a TCP connection so that clients could connect. We investigated hosting it on an Amazon EC2 instance however these challenges meant it would have taken too long to deploy and it was not a key requirement for the project.

## Further development

The main areas for improvement that we have identified are:

* A full implementation of the SMTP and POP protocols as per RFCs
* Better error handling on the server handshake
* Simplifying the handshake logic to remove the if/else statements
* Implementing encrypted message transmission
* Using an options hash approach across all objects with a large number of arguments
* Further extraction and a more rigorous approach to SRP
* Simplifying our approach to mocking in the tests

## Contributing

We do not plan to develop this repository further so it is unlikely that we will respond to pull requests. If you do still feel a strong desire to contribute then please do so following the Github code of conduct for contributing [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Contributors

* **Ben Furber** - [Github Account](https://github.com/benfurber)
* **John Newman** - [Github Account](https://github.com/JohnNewman1)
* **Charlene Chetcuti** - [Github Account](https://github.com/charmalt)
* **Igor Ryabchuk** - [Github Account](https://github.com/nixlim)
* **George Sykes** - [Github Account](https://github.com/georgesykes86)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* All the coaches and staff at Makers Academy who pushed us to become better developers
* All the amazing brains who helped to make email and provided such an interesting challenge for us
