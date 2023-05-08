#!/bin/bash
echo 'run after_install.sh: ' >> /home/ubuntu/project4backend/backend/deploy.log

echo 'cd /home/ec2-user/nodejs-server-cicd' >> /home/ubuntu/project4backend/backend/deploy.log
cd /home/ubuntu/project4backend/backend >> /home/ubuntu/project4backend/backend/deploy.log

echo 'npm install' >> /home/ubuntu/project4backend/backend/deploy.log 
npm install >> /home/ubuntu/project4backend/backend/deploy.log