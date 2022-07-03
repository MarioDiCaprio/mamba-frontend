# Mamba (frontend)
This is the frontend of the *Mamba* website. It is a *NodeJS* application written in
*Typescript* and *Sass*. Furthermore, it uses *NextJS* to easily manage routes and
resources. Testing, both Unit and E2E, is done with *Cypress*.

## Tech Stack
This project utilizes the following technologies:
- [NextJS](https://nextjs.org/)
- [Redux](https://redux.js.org/) ([Redux Toolkit](https://redux-toolkit.js.org/))
- [Apollo GraphQL](https://www.apollographql.com/docs/react)
- [Typescript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Cypress](https://www.cypress.io/)

## Project Structure
This application has the following structure:
- `/components`:
    This directory contains all reusable React Components for the application.
    Each component is contained in a folder with its corresponding name, along with
    its Sass modules and tests.
    - Example:
        The component `<Base />` results in the directory `/components/base` with the files
        `Base.tsx`, `Base.module.scss` and `Base.test.tsx`.
    - Components for a page are contained in a directory with an underscore and the page's name.
      For example, components for the page `/activity` are stored in a directory with the name
      `/components/_activity`.
- `/declarations`:
    Typescript declarations.
- `/graphql`:
    This directory contains data related to the *GraphQL API*.
    - `api.tsx`: Customizes the API
    - `types.ts`: Type declarations for the API
    - `/hooks`: Contains reusable hooks that consume the API
- `/pages`:
    This directory contains all routes for *NextJS*.
- `/public`:
    Public data, such as public images.
- `/redux`:
    State management for the application using *Redux Toolkit*.
- `/styles`:
    This directory contains all global *Sass* styles and all *Sass* modules
    for components under `/pages`.
- `/utils`:
    Contains other utilities.

## Testing
This project uses *Cypress* for both Unit- and E2E-Tests. Please follow these instructions to run the
tests.
### Unit Tests
In order to run Unit Tests you first need to build the project: `yarn build`. After that you can run
all tests with `yarn cypress:run:ct`.
- Unit tests are located in a folder alongside each component in the `/components` directory.
### E2E Tests
In order to run E2E Tests you need to start the development server first: `yarn dev`. Then, run all
tests with `yarn cypress:run`.
- E2E tests address the components under the `/pages` directory and are located under `/cypress/e2e`.

## Requirements
This application requires [NodeJS](https://nodejs.org) (v.16 or above, though older versions may work too) and
its package manager [Yarn](https://yarnpkg.com/) to be installed.

## Deployment
This application was deployed on *Heroku* and is publicly accessible [here](https://mamba-frontend.herokuapp.com).
