import jwt from 'jsonwebtoken';

export const APP_SECRET = 'GraphQL-is-aw3some';

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

export function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }
  throw new Error('Not authenticated');
}

