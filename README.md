# Angular practice

## Pre-requisites

- Install Node.js
- Install pnpm
- Install Nx CLI

## Install dependencies

```sh
pnpm install
```

## Create a new app

```sh
pnpm exec nx g @app/plugin:app <app-name>
```

Your app will be created in the `web/apps/<app-name>` directory.
To start the app, run:

```sh
pnpm exec nx serve <app-name>
```

Or you can add below script to `package.json`:

```json
"scripts": {
  "start:<app-name>": "pnpm exec nx serve <app-name>"
}
```

Then you can run:

```sh
pnpm run start:<app-name>
```

## Create a new library

```sh
pnpm exec nx g @app/plugin:library <lib-name>
```

## Create a new component

```sh
pnpm exec nx g @app/plugin:component <component-name>
```

## Create a new dialog

```sh
pnpm exec nx g @app/plugin:dialog <dialog-name>
```
