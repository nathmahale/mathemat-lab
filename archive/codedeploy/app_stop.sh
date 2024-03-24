#!/bin/bash

# This script is used to stop application
cd /home/ec2-user/app-destination
pm2 stop app.js || true