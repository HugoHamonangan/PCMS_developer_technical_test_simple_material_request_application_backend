

## Description

Project Overview

Hello! 👋 Welcome to the PCMS Developer Technical Test: Simple Material Request Application (Backend Setup).


## Project setup

```bash
$ Important Information, you must atleast using Node v22 and npm V10
```

```bash
$ npm install
```

```bash
$ change env to .env in root project 
```

- change the host and password based on your postgresql, make database in postgresql with name material_request_app_db
- import to the material_request_app_db with sql file that has been provided in root project

```bash
$ npx prisma generate
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

- project will be running in the http://localhost:3000 

For Login 

ADMIN ROLE
email: admin@company.com
password : Pa$$w0rd!

APPROVER ROLE
email: approver@company.com
password: Pa$$w0rd!

For testing purpose POSTMAN collection is provided also

REQUESTER ROLE
email: requester1@company.com
password: Pa$$w0rd!

















<hr>

Documentantion and discussion that help me make this backend

https://ui.shadcn.com/docs/components/form

https://nextjs.org/docs/app/api-reference/functions/cookies

https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

https://lucide.dev/guide/packages/lucide-react

https://ui.shadcn.com/docs/components/sidebar

https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render

https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes

https://zustand.docs.pmnd.rs/integrations/persisting-store-data

https://stackoverflow.com/questions/10730362/get-cookie-by-name

https://github.com/shadcn-ui/ui/issues/7036](https://www.prisma.io/docs/orm/prisma-schema/data-model/models

https://docs.nestjs.com/recipes/prisma

https://github.com/prisma/prisma/issues/28573

https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

https://github.com/nestjs/jwt

https://docs.nestjs.com/security/authentication#jwt-token

https://docs.nestjs.com/custom-decorators#param-decorators

https://www.prisma.io/docs/orm/prisma-client/queries/crud

https://www.prisma.io/docs/orm/prisma-client/queries/pagination

https://github.com/prisma/prisma-examples/blob/latest/orm/nest/src/prisma.service.ts

https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/composite-types#finding-records-that-contain-composite-types-with-find-and-findmany

https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search#querying-the-database

https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined#the-effect-of-null-and-undefined-on-conditionals

https://www.prisma.io/docs/orm/prisma-client/queries/case-sensitivity#options-for-case-insensitive-filtering

https://www.prisma.io/docs/orm/prisma-client/queries/select-fields#omit-specific-fields

https://github.com/prisma/prisma/discussions/12453

https://github.com/prisma/prisma/issues/3636

https://stackoverflow.com/questions/42629925/testing-with-jest-and-webpack-aliases

https://www.prisma.io/docs/orm/overview/prisma-in-your-stack/rest#post

https://www.prisma.io/docs/orm/prisma-client/queries/custom-validation

https://docs.nestjs.com/pipes

https://zod.dev/v4/changelog#znativeenum-deprecated

https://zod.dev/api#enum

https://docs.nestjs.com/security/encryption-and-hashing#hashing

https://stackoverflow.com/questions/43253392/how-many-rounds-is-the-recommended-for-bcrypt-password-hasing

https://www.prisma.io/docs/orm/prisma-client/queries/crud#delete

https://www.prisma.io/docs/orm/prisma-client/queries/crud#update

https://www.prisma.io/docs/orm/prisma-client/queries/crud#create

https://www.prisma.io/docs/orm/prisma-client/queries/transactions

https://docs.nestjs.com/exception-filters#built-in-http-exceptions

https://docs.nestjs.com/faq/request-lifecycle#interceptors

https://www.prisma.io/docs/orm/reference/error-reference#p2025

https://www.prisma.io/docs/orm/prisma-migrate/workflows/customizing-migrations

https://docs.nestjs.com/recipes/passport#implement-protected-route-and-jwt-strategy-guards

https://docs.nestjs.com/guards#role-based-authentication

https://docs.nestjs.com/guards#role-based-authentication
