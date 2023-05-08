#!/bin/bash

echo 'run application_start.sh: ' >> /home/ubuntu/project4backend/backend/deploy.log

echo 'pm2 restart nodejs-express-app' >> /home/ubuntu/project4backend/backend/deploy.log
pm2 restart server.js >> /home/ubuntu/project4backend/backend/deploy.log