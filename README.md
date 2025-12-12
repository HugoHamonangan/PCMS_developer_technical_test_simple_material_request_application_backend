

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

- project will be running in the http://localhost:3000 

For Login 

ADMIN ROLE
email: admin@company.com
password : Pa$$w0rd!

APPROVER ROLE
email: approver@company.com
password: Pa$$w0rd!

REQUESTER ROLE
email: requester1@company.com
password: Pa$$w0rd!

