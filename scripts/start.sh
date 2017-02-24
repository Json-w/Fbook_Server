echo 'starting Fbook_server'
MYSQL_PASSWORD=$1 node ../start.js > ../log.txt
echo 'started'
