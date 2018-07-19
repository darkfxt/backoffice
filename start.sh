#!/bin/bash
echo $NODE_ENV
pm2 start /opt/app/config/pm2/pm2-$NODE_ENV.json -i 0 --no-daemon
