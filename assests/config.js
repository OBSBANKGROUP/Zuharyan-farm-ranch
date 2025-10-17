// Simple config loader for client or server environments.
// In Node or bundlers that replace process.env, SECRET_KEY will be available.
// In the browser we won't expose the SECRET_KEY; use backend endpoints for sensitive operations.
const Config = {
  getSecretKey() {
    if (
      typeof process !== "undefined" &&
      process.env &&
      process.env.SECRET_KEY
    ) {
      return process.env.SECRET_KEY;
    }
    // Not available in browser — return null to avoid accidental exposure.
    return null;
  },
};

export default Config;
