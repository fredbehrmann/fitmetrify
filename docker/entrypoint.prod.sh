#!/bin/sh
set -e

# Prisma Client is generated at build time (Dockerfile builder stage).
# db push/migrate can run as a release command when models are added.
exec node server.js
