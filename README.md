# FitMetrify

Portal web de calculadoras fitness, nutrição, emagrecimento, corrida e musculação.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- PostgreSQL + Prisma
- Docker

## Rodar tudo com Docker (recomendado)

Pré-requisito: [Docker Desktop](https://www.docker.com/products/docker-desktop/) ou Docker Engine + Compose v2.

```bash
# Desenvolvimento (hot reload) — app + PostgreSQL
docker compose up --build
```

Abra [http://localhost:3001](http://localhost:3001).

O serviço `web` executa automaticamente `prisma generate`, `prisma db push` e `npm run dev`.

### Produção (imagem otimizada)

```bash
docker compose --profile prod up --build
```

Usa o target `runner` do Dockerfile (build Next.js standalone).

### Comandos úteis

```bash
# Rodar em segundo plano
docker compose up -d --build

# Parar
docker compose down

# Parar e apagar volume do banco
docker compose down -v

# Ver logs do app
docker compose logs -f web
```

## Desenvolvimento local (sem Docker no app)

```bash
npm install
docker compose up -d postgres
cp .env.example .env
npm run db:generate
npm run db:push
npm run dev
```

## Testes

```bash
npm test
```

## Environment

Copie `.env.example` para `.env` se for rodar o app fora do Docker. No Compose, `DATABASE_URL` aponta para o host `postgres`.
# fitmetrify
