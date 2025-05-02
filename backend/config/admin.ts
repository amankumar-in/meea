export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "default-admin-jwt-secret-for-dev"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "default-api-token-salt-for-dev"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "default-transfer-token-salt-for-dev"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
