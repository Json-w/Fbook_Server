echo 'starting Fbook_server'
MYSQL_PASSWORD=$1 npm start > ../log.txt &
BUILD_ID=dontKillMe
echo 'started'
