#!/usr/bin/env bash

echo "********************************"
echo 'Building...'
echo "********************************"
cd /app/ && yarn build

echo "Migrating DB..."
# cd /app/ && yarn prisma migrate deploy
# cd /app/ && npx prisma generate

echo "********************************"
echo 'Starting up API...'
echo "********************************"
if [ "$NODE_ENV" == "development" ]
then
  echo "Development MODE"
  pm2 start /app/.docker/loopback/pm2/pm2.json
else
  echo "Production MODE"
  pm2 start /app/.docker/loopback/pm2/pm2.json
fi

# Keep Container Running
tail -f /dev/null
