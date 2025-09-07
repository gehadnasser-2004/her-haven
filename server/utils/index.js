import { createJWT, isTokenValid, attachCookiesToResponse } from "./jwt.js";
import createTokenUser from "./createTokenUser.js";
import checkPermissions from "./checkPermissions.js";
import sendVerificationEmail from "./sendVerificationEmail.js";
import sendResetPasswordEmail from "./sendResetPasswordEmail.js";
import createHash from "./createHash.js";

export const utils = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
};
