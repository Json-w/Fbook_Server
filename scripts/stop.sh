#! /bin/bash
#pid=$(lsof -i:3000 |grep -v "PID" | awk '{print $2}')
#echo killing $pid
#kill -9 $pid
#echo killed success
pm2 stop app
pm2 delete app
