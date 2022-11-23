const usParser = require('ua-parser-js');

const deviceInfo = (userAgent) => {
    const uaInfo = new usParser(userAgent)
    return uaInfo.getResult()
}

module.exports = deviceInfo