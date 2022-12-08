#!/usr/bin/env bash

cd /app/

echo 'NPM Building...'
yarn
yarn build

echo "Migrating DB..."
npx prisma migrate deploy
# cd /app/ && npx prisma generate

echo 'Starting up API...'
if [ "$NODE_ENV" == "development" ]
then
  echo "Development MODE"
  pm2 start /app/.docker/api/pm2/pm2.json
else
  echo "Production MODE"
  pm2 start /app/.docker/api/pm2/pm2.json
fi

# Keep Container Running
tail -f /dev/null
