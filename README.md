<div align='center'>
	<h1>Pass.in</h1>
	<img src='https://img.shields.io/github/languages/top/nitoba/picpay-challenge' alt='Linguagem mais utilizada' />
	<img src='https://img.shields.io/github/last-commit/nitoba/picpay-challenge' alt='Último commit' />
</div>

<div align='center'>
	<img src='.github/preview.svg' style="width: 400px; height:auto;" alt='Preview' />
</div>


## 🚀 Introduction
pass.in is an application for **managing participants in in-person events**.
The tool allows the organizer to register an event and open a public registration page.
Registered participants can issue a credential for check-in on the day of the event.
The system will scan the participant's credentials to allow entry to the event.


## 👨‍💻 Technologies

- [Javascript/Typescript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript): Main programming language.
- [BunJs](https://bun.sh/): Platform to run Javascript on the server
- [NodeJs](nodejs.org/en): Platform to run Javascript on the client
- [PostgreSQL](https://www.postgresql.org/): Relational database to store persistent data.
- [Fastify](https://fastify.dev/): Web framework for building APIs in NodeJS.
- [DrizzleORM](hhttps://orm.drizzle.team/): ORM (Object-Relational Mapping) for communication with the database.
- [Docker](https://www.docker.com/): Development environment for PostgreSQL.
- [ReactJs](https://react.dev/): The library for web and native user interfaces.
- [TailwindCss](https://tailwindcss.com/): Rapidly build modern websites without ever leaving your HTML.
- [ReactQuery](https://tanstack.com/query/latest): TanStack Query (FKA React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze.
- [Axios](https://axios-http.com/ptbr/docs/intro): Axios is a promise-based HTTP client for node.js and the browser.
- 

## 🏗️ Design Patterns

The application follows the following design patterns:

1. **Clean Architecture**: The project structure is organized in layers (entities, use cases, interfaces) to separate concerns and facilitate maintenance.

2. **Domain Driven Design (DDD)**: The software design is domain-oriented, focusing on business rules and main entities.

3. **Dependency Injection**: Inversion of control and dependency injection are used to ensure code flexibility and testability.

4. **Ports and Adapters**: The ports and adapters pattern, also known as hexagonal architecture, is a software design pattern that creates loosely coupled application components.

## 🎯 Main Features

- [X] The organizer must be able to register a new event;
- [X] The organizer must be able to view event data;
- [X] The organizer must be able to view the list of participants;
- [X] The participant must be able to register for an event;
- [X] The participant must be able to view their registration badge;
- [X] The participant must be able to check-in at the event;
- [X] Participants can only register for an event once;
- [X] Participants can only register for events with available places;
- [X] The participant can only check in to an event once;

## 🔧 Running the project

To run this application, you need to have [BunJs](https://bun.sh/), [NodeJS](https://nodejs.org/en) and [Docker](https://www.docker.com/) installed on your machine.
### Running the server
- First things first navigate to the server folder
- Run the command touch .env && cp .env.example .env to create environment variable files.
- Run the command `bun i` to install the dependencies.
- Run the command `docker compose up -d` to start the database service
- Run the command `bun db:migrate` to apply the migrations to the database.
- Run the command `bun db:seed` to populate the database with some initial data
- Run the command `bun dev` to start the application.
- Open the `client.http` file at the root of the project to call the http route that performs the operation. It is important to have the [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension installed in VsCode
- Open the http://localhost:3333/docs to view the API specifications using the Swagger UI
### Running the web app
- First things first navigate to the web folder
- Run the command pnpm install to install the dependencies. Or using the package manager that you prefer
- Run the command pnpm dev to start the application


## ✍🏽 Important learnings
- How to Calculate Distances Between Points Using Mathematics
- Build adapters for http layer decoupling with [Fastify](https://fastify.dev/) and controllers

## 🧑‍💻 Possible improvements
- Write unite tests for the api server
- Add dependency injection system to auto create the objects and inject them in the controllers

## 📄 License

This project is under the MIT license. Access the link [LICENSE](https://mit-license.org/) for more details.

## 🌐 GitHub

The source code of the application can be found on GitHub: [Project Link](https://github.com/nitoba/picpay-challenge)

## 📧 Contact

In case of doubts or suggestions, contact us through the email: [nito.ba.dev@gmail.com](mailto:nito.ba.dev@gmail.com).