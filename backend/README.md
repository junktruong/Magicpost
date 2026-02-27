# Backend (NestJS)

## Local development

```bash
cp .env.example .env
npm install
npm run db:dev:up
npm run prisma:dev:deploy
npm run start:dev
```

## Test database

```bash
npm run db:test:up
npm run prisma:test:deploy
```

## Quality

```bash
npm run lint
npm run typecheck
npm run test
```
