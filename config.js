let pwd=process.env.MYSQL_PASSWORD;
const config = {
  database: 'Fbook',
  username: 'root',
  password: pwd,
  host: 'localhost',
  port: 3306,
}

module.exports = config;
