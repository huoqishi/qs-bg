/**
 * the configuration for development
 */
// var os = require('os'),
//   iptable = {},
//   ifaces = os.networkInterfaces()
// for (var dev in ifaces) {
//   ifaces[dev].forEach(function (details, alias) {
//     if (details.family == 'IPv4') {
//       iptable[dev + (alias ? ':' + alias : '')] = details.address
//     }
//   })
// }
module.exports = {
  PORT: 8088,
  IP: '127.0.0.1',
  http: 'http://127.0.0.1:8080/',
  https: 'https://127.0.0.1:8080/'
}
