const jwt = require("jsonwebtoken");
const ERROR_CODES = require("./error");

/**
 * Generate JWT Token
 * @param {Object} payload - User data to embed in token
 * @param {String} secret -  Secret key
 * @param {Number} version - Token version for Invalidation (optional),
 * @param {String} hashedRequestIp - Hashed Request IP address for IP validation (optional)
 * @returns {String} - Token
 */
function signToken(
    payload,
    secret,
    version = 0,
    hashedRequestIp = null,
) {
    return jwt.sign(
        { ...payload, version, hashedRequestIp },
        secret
    )
}


/**
 * Verify JWT Token
 * @param {String} token - Token to verify
 * @param {String} secret - Secret key
 * @param {Number} currentVersion - Current token version (if versioning enabled)
 * @param {String?} hashedRequestIp - Hashed Request IP address (if IP validation enabled)
 * @returns {Object}  - Decoded payload if valid else error
 */

function verifyToken(token, secret, currentVersion = 0, hashedRequestIp = null) {
    try {
        const decoded = jwt.verify(token, secret);
        if (decoded.version && (decoded.version !== currentVersion)) {
            return { valid: false, ...ERROR_CODES.TOKEN_INVALIDATED };
        }
       
        if (decoded.hashedRequestIp && (decoded.hashedRequestIp !== hashedRequestIp)) {
            return { valid: false, ...ERROR_CODES.IP_MISMATCH };
        }

        return { valid: true, user: decoded };

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return { valid: false, ...ERROR_CODES.TOKEN_EXPIRED };
        } else if (error.name === "JsonWebTokenError") {
            return { valid: false, ...ERROR_CODES.INVALID_TOKEN };
        } else {
            console.log("Error:", error);
            return { valid: false, ...ERROR_CODES.UNKOWN_ERROR };
        }
    }
}

module.exports = {
    signToken,
    verifyToken
}
