// load env variables
require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  db: process.env.MONGODB_URL
}