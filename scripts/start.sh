echo 'starting Fbook_server'
MYSQL_PASSWORD=$1 node ../start.js > ../log.txt &
BUILD_ID=dontKillMe
echo 'started'
