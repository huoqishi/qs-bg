const Sequelize = require('sequelize')
const config = require('../config')
// console.log(Sequelize)
/**
 * params qs 数据库名
 * params root 数据库用户名
 * params      数据库密码
 */
const sequelize = new Sequelize(
  config.db.dbname,
  config.db.username,
  config.db.password,
  {
    host: 'localhost',
    dialect: 'mysql', // | 'sqlite' | 'postgres' | 'mssql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false,
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  // 仅限 SQLite
  // storage: 'path/to/database.sqlite'
  })

module.exports = sequelize
