# User Sectors

> Frontend: React + Vite
> 
> Backend: Express + MongoDB

## How to run:

Prerequisites: **Node** >= 20, **Yarn** >= 1.22

## Backend:

- Go to **backend** directory.
- Create `.env` file and add following ennvironment variables:
  
  ```
  PORT (default: 8080)
  MONGO_URI
  ```
- Run `yarn` to install dependencies.
- Run `yarn dev` to start the development server.
- To create build, run `yarn build`.
- Run `yarn start` to start the server.

## Client:

- Go to **client** directory.
- Create `.env` file and add following ennvironment variables:

  ```
  BACKEND_URL (default: http://localhost:8080/)
  ```

- Run `yarn` to install dependencies.
- Run `yarn dev` to start the development server.
- To create build, run `yarn build`.
- Run `yarn start` to preview the production build.
