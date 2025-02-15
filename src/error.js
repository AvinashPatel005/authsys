const ERROR_CODES = {
    INVALID_TOKEN: {
        code: "INVALID_TOKEN",
        message: "Invalid token",
        status: 403,
    },
    TOKEN_EXPIRED: {
        code: "TOKEN_EXPIRED",
        message: "Token has expired. Please log in again.",
        status: 401,
    },
    TOKEN_INVALIDATED: {
        code: "TOKEN_INVALIDATED",
        message: "Token has been invalidated. Please log in again.",
        status: 403,
    },
    IP_MISMATCH: { 
        code: "IP_MISMATCH", 
        message: "IP address does not match", 
        status: 403 
    },
    UNKOWN_ERROR: {
        code: "UNKOWN_ERROR",
        message: "An unknown error occurred.",
        status: 500,
    },
};

module.exports = ERROR_CODES;
