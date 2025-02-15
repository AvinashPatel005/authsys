const {
    signToken,
    verifyToken
} = require('./auth');
const crypto = require("crypto");

/**
 * AuthsyJWT - Authentication System
 * @param {String} secret - Secret key
 * @param {Boolean} isVersioningEnabled - Enable token versioning
 * @param {Boolean} isIpValidationEnabled - Enable IP validation
 */
function AuthsyJWT(secret, isVersioningEnabled, isIpValidationEnabled) {
    this.secret = secret;
    this.isVersioningEnabled = isVersioningEnabled;
    this.isIpValidationEnabled = isIpValidationEnabled;

    /**
    * Generate JWT Token
    * @param {Object} payload - User data to embed in token
    * @param {Number} version - Token version for Invalidation (if versioning enabled),
    * @param {String} requestIp - Request IP address for IP validation (if IP validation enabled)
    * @returns {String} - Token
    */

    this.signToken = function(payload,version=0,requestIp){
        if(payload==null){
            throw new Error("No Payload Provided!")
        }
        if(isIpValidationEnabled && requestIp==null){
            throw new Error("No requestIP Provided!")
        }
        return signToken(payload,secret,version,requestIp?crypto.createHash("sha256").update(requestIp).digest("hex"):null)
    }

     /**
    * Generate JWT Token
    * @param {String} token - User data to embed in token
    * @param {Number} version - Current version (if versioning enabled),
    * @param {String} requestIp - Request IP address for IP validation (if IP validation enabled)
    * @returns {String} - Decode Payload
    */
    this.verifyToken = function(token,version=0,requestIp){
        if(token==null){
            throw new Error("No Token Provided!")
        }
        if(isIpValidationEnabled && requestIp==null){
            throw new Error("No requestIP Provided!")
        }
        return verifyToken(token,secret,version,requestIp?crypto.createHash("sha256").update(requestIp).digest("hex"):null)
    }
}

module.exports = AuthsyJWT;