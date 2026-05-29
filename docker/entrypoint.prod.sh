#!/bin/sh
set -e

PRISMA_CLI="./node_modules/prisma/build/index.js"

if [ ! -f "$PRISMA_CLI" ]; then
  echo "Prisma CLI not found at $PRISMA_CLI" >&2
  exit 1
fi

node "$PRISMA_CLI" generate
node "$PRISMA_CLI" db push

exec node server.js
