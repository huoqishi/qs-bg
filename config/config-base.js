/**
 * the configuration is common
 */
/**
 * the configuration is common
 */
const config = {
  port: 8088,
  hostname: 'localhost',
  protocol: 'http',
  issuer: 'www.huoqishi.net',
  audience: 'huoqishi',
  expires: '1h',
  secret: 'i am chinese',
  // 数据库配置
  db: {
    dbname: 'qs',
    username: 'root',
    password: ''
  }
}
module.exports = config
