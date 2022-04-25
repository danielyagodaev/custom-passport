import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SecretFromHeaderStrategy } from './strategies/secret-from-header.strategy';

@Global()
@Module({
  imports: [PassportModule],
  providers: [SecretFromHeaderStrategy],
  exports: [SecretFromHeaderStrategy],
})
export class AuthModule {}
