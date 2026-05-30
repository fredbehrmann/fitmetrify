#!/bin/sh
set -e

if [ ! -d "node_modules/next" ]; then
  echo "Installing dependencies..."
  npm ci
fi

npx prisma generate
npx prisma migrate deploy

exec npm run dev
