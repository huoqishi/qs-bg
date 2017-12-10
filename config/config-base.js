/**
 * the configuration is common
 */
var os = require('os'),
  iptable = {},
  ifaces = os.networkInterfaces()
for (var dev in ifaces) {
  ifaces[dev].forEach(function (details, alias) {
    if (details.family == 'IPv4') {
      iptable[dev + (alias ? ':' + alias : '')] = details.address
    }
  })
}
console.log(iptable)
module.exports = {
  // host: 'http://qs.huoqishi.net'
  // en0:1
  host: 'http://' + iptable['en4:1'] + ':8080'
}
