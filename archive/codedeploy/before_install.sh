#!/bin/bash

# This script is executed before copying the source

yum -y update

npm install -g pm2
pm2 update

export app_root=/home/ec2-user/app-destination
if [ -d "$app_root" ];then
    rm -rf /home/ec2-user/app-destination
    mkdir -p /home/ec2-user/app-destination
else
    mkdir -p /home/ec2-user/app-destination
fi