# Environment Setup (Her Haven Server)

This server uses environment variables for secrets and configuration.

## Required
- URL: MongoDB connection string (Atlas or local)
- JWT_SECRET: Secret used to sign JWTs and cookies

## Optional
- PORT: Server port (default: 5000)
- NODE_ENV: development | production (affects cookie security)
- EMAIL_HOST: SMTP host (e.g., smtp.ethereal.email or your provider)
- EMAIL_PORT: SMTP port (e.g., 587)
- EMAIL_USER: SMTP username
- EMAIL_PASS: SMTP password

## Example .env
```
# MongoDB
URL=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/herhaven

# Auth
JWT_SECRET=change_me_to_a_long_random_string

# Server
PORT=5000
NODE_ENV=development

# Email (Ethereal for dev or your real SMTP)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=<ethereal_user>
EMAIL_PASS=<ethereal_pass>
```

## Notes
- MongoDB Atlas: add your IP to the project allowlist (Network Access) or use 0.0.0.0/0 for dev.
- Cookies are signed using JWT_SECRET. In production, cookies are set with `secure: true`.
- Email: By default, config reads EMAIL_* vars. If not provided, it falls back to Ethereal dev settings in `utils/nodemailerConfig.js`.
