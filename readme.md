# AuthsyJWT

AuthsyJWT is a simple and customizable authentication system for Node.js using JWT (JSON Web Token). It supports token versioning and IP-based validation.

## Features
- JWT-based authentication
- Token versioning for invalidation
- IP-based validation for enhanced security
- Custom error handling

## Installation
```sh
npm install authsy-jwt
```

## Usage
### Importing AuthsyJWT
```js
const AuthsyJWT = require('authsyjwt');

// Initialize AuthSys with secret key, versioning, and IP validation options
const auth = new AuthsyJWT("mySecretKey", true, true);
```

### Generating a Token
```js
const token = auth.signToken({ userId: "12345" }, 1, "192.168.1.1");
console.log(token);
```

### Verifying a Token
```js
const result = auth.verifyToken(token, 1, "192.168.1.1");
console.log(result);
```

## API Reference
### `new AuthsyJWT(secret, isVersioningEnabled, isIpValidationEnabled)`
Creates an instance of AuthsyJWT.
- `secret`: Secret key for signing the JWT.
- `isVersioningEnabled`: Enable token versioning (default: `false`).
- `isIpValidationEnabled`: Enable IP validation (default: `false`).

### `signToken(payload, version = 0, requestIp = null)`
Generates a JWT.
- `payload`: Data to include in the token.
- `version`: Token version for invalidation.
- `requestIp`: IP address for validation.

### `verifyToken(token, version = 0, requestIp = null)`
Verifies a JWT.
- `token`: JWT to verify.
- `version`: Current version.
- `requestIp`: IP address for validation.

## Error Handling
AuthsyJWT provides custom error codes:
- `TOKEN_EXPIRED`: Token has expired.
- `INVALID_TOKEN`: Token is invalid.
- `TOKEN_INVALIDATED`: Token version mismatch.
- `IP_MISMATCH`: IP address does not match.

## License
MIT

