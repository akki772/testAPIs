import { createSecretKey, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const key = createSecretKey(Buffer.from(SECRET));

export async function signToken(payload: JWTPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key);
  return token;
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, key);
  return payload;
}

// very light password hash util (demo only). Prefer bcrypt/argon2 in prod.
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return salt.toString('hex') + ':' + hash.toString('hex');
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':');
  const salt = Buffer.from(saltHex, 'hex');
  const hash = Buffer.from(hashHex, 'hex');
  const test = scryptSync(password, salt, 64);
  return timingSafeEqual(hash, test);
}
