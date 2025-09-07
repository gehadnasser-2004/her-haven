import { errors as CustomError } from "../errors/index.js";
import { isTokenValid, attachCookiesToResponse } from "../utils/jwt.js";
import Token from "../models/Token.js";

const authenticateUser = async (req, res, next) => {
  // Check for Bearer token in Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = isTokenValid(token);
      req.user = { userId: payload.userId, role: payload.role };
      return next();
    } catch (error) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
  }

  // Fallback to cookies (legacy)
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = { userId: payload.userId, role: payload.role };
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }

    attachCookiesToResponse({
      res,
      user: { userId: payload.userId, role: payload.role },
      refreshToken: existingToken.refreshToken,
    });

    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

export default { authenticateUser, authorizePermissions };
