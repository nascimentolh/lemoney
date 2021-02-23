import { SodiumPlus } from 'sodium-plus';

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
}
