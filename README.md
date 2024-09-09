<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
</p>

## Description

This Proof of Concept (PoC) API, built with NestJS, demonstrates Single Sign-On (SSO) integration using third-party identity providers like Google. It handles authentication, token management, and user sessions, offering a secure and scalable foundation for future SSO implementations.

## SSO authentication step-by-step:

**Install passport dependencies:**

```bash
$ npm install @nestjs/passport passport passport-google-oauth20 @nestjs/jwt passport-jwt     
$ npm install --save-dev @types/passport-google-oauth20
```

**Install others dependencies:**

```bash
$ npm install express-session @types/express cookie-parser cors
$ npm install --save-dev @types/express-session
```

**Add the Following Code to `main.ts`:**

   ```typescript
   import * as session from 'express-session';
   import * as passport from 'passport';
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   import * as dotenv from 'dotenv';

   // Load environment variables from .env file
   dotenv.config();

   async function bootstrap() {
     // Create the NestJS application
     const app = await NestFactory.create(AppModule);

     // Configure session middleware
     app.use(
       session({
         secret: process.env.SESSION_SECRET, // The secret key for sessions should be in the .env file
         resave: false,
         saveUninitialized: false,
       }),
     );

     // Initialize Passport for authentication management
     app.use(passport.initialize());
     app.use(passport.session());

     // Start the server on port 3000
     await app.listen(3000);
   }

   bootstrap();
```

**Get your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`:**
1. Configure the Google API Console
2. Go to the Google API Console.
3. Create a new project or select an existing one.
4. In the navigation pane, go to Credentials.
5. Click Create Credentials > OAuth 2.0 Client IDs.
6. Configure the information including the application name and redirect URIs (the redirect URI will be something like http://localhost:3000 during development).
7. Take the provided Client ID and Client Secret or download the json with this informations.

**Understanding Authorized URI for Redirect and Origin:**

- **Origin URI**: The origin URI is the domain authorized to initiate Google authorization requests.
- **Redirect URI**: The redirect URI is the URL where users will be redirected after successful authentication.


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates: [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest and this repository is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
