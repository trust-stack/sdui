# Server Driven UI

A library for server-driven UI development. It provides TypeScript types generated from JSON Schema definitions and Form Builder components to create dynamic forms and UIs that can be configured from the server-side.

## Project setup

```bash
pnpm install
```

## JSON Schema Type Generation

TypeScript types are automatically generated from JSON Schema files in the `src/schema` directory.

Root schema files that start with `@` (e.g. `@pager-form.json`) are used as entry points for type generation. Referenced schemas without `@` are only included when referenced by a root schema to prevent duplicate type definitions.

The generated TypeScript types are combined into a single file at `src/schema/generated/index.ts`.

To generate types, run:

```bash
pnpm run codegen:json-schema
```

## Run examples

```bash
pnpm run storybook
```

## Run tests

```bash
# unit tests
pnpm run test
```
