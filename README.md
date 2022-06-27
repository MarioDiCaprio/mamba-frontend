# Mamba (frontend)
This is the frontend of the *Mamba* website. It is a *NodeJS* application written in
*Typescript* and *Sass*. Furthermore, it uses *NextJS* to easily manage routes and
resources.

## Tech Stack
This project utilizes the following technologies:
- NextJS (React)
- Redux (Redux Toolkit)
- Apollo GraphQL
- Typescript
- Sass

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

## Deployment
This application was deployed on *Heroku* and is publicly accessible [here](https://mamba-frontend.herokuapp.com).
