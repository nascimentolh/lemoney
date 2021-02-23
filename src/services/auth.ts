import { SodiumPlus } from 'sodium-plus';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '@src/models/user';

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
}

export default class AuthService {
  public static async hashPassword(password: string): Promise<string> {
    const sodium = await SodiumPlus.auto();

    return await sodium.crypto_pwhash_str(
      password,
      sodium.CRYPTO_PWHASH_OPSLIMIT_INTERACTIVE,
      sodium.CRYPTO_PWHASH_MEMLIMIT_INTERACTIVE
    );
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const sodium = await SodiumPlus.auto();
    return await sodium.crypto_pwhash_str_verify(password, hashedPassword);
  }

  public static generateToken(payload: object): string {
    return jwt.sign(payload, config.get('App.auth.key'), {
      expiresIn: config.get('App.auth.tokenExpiresIn'),
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, config.get('App.auth.key')) as DecodedUser;
  }
}
