import { PassportStrategy } from '@nestjs/passport';
import { fromHeader, Strategy } from '../passports/passport-api-key/strategy';
import { UnauthorizedException } from '@nestjs/common';

export class SecretFromHeaderStrategy extends PassportStrategy(
  Strategy,
  'secret-from-header',
) {
  constructor() {
    super({
      tokenFunc: fromHeader('secret'),
      passReqToCallback: false,
    });
  }

  validate(token: string): boolean {
    if (token !== '123') {
      throw new UnauthorizedException(
        'Secret was not provided or is incorrect',
      );
    }
    return true;
  }
}
