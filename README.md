# Express Backend API With Prisma and TypeScript

## Author:

[Younesse ElKars](#) - [LinkedIn](https://www.linkedin.com/in/younesse-elkars/)

## Modify: Reinhard Alfaries Saemani

## Description:

An Express-based RESTful API with TypeScript and Prisma , managing both authentication and CRUD operations.

## Features

- [x] MVC Pattern
- [x] Prima as ORM
- [x] Seed Script
- [x] Authentication Routes (/Login , /Logout)
- [x] JWT (HTTP-Only)
- [x] Protected Routes
- [x] Validation With Zod as middleware
- [x] Error Handler middleware :
  - [x] Prisma Errors
  - [x] Zod Errors
  - [x] JWT Parsing Errors
  - [x] Route Not Found Error
- [x] CRUD Operations ( Author , Books resources)
- [x] Custom Handler for Response
- [x] Custom HTTP Codes enum list
- [x] CORS Middleware with custom config object

## Icoming Features

- [ ] API Documentation Using Swagger

- [ ] Sanitize queries against SQL Injection and XSS

- [x] Middlewrae logger

- [ ] Testing

## Getting Started

#### Clone the repo:

```bash
git clone https://github.com/reinsaemani/Express-Prisma-TypeScript.git
```

#### Install dependencies:

```bash
pnpm install
```

#### Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
pnpm run dev
```

## Running in Production

```bash
pnpm run start
```

## Contributions

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests to enhance the functionality or fix any issues.
