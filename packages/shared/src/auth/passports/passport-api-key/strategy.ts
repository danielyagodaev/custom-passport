import { Strategy as PassportStrategy } from 'passport-strategy';
import { Request } from 'express';

const AUTHORIZATION_HEADER_NAME = 'authorization';

export class Strategy extends PassportStrategy {
  name: string;
  private readonly _tokenFunc: ExtractTokenFunc;
  private readonly _passReqToCallback: boolean;
  private readonly _verify: VerifyCallback | VerifyCallbackWithRequest;

  constructor(
    opt: StrategyOptions,
    verify: VerifyCallback | VerifyCallbackWithRequest,
  ) {
    super();
    this._tokenFunc = opt.tokenFunc;
    this._passReqToCallback = opt.passReqToCallback;
    this._verify = verify;
  }

  authenticate(req: Request, options?: any) {
    try {
      const token = this._tokenFunc(req);
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      const verified = (err: Error, user: any, info: any) => {
        if (err) {
          const res = self.error(err);
          return res;
        }
        if (!user) {
          return self.fail(info);
        }
        self.success(user);
      };
      let verifyCallback: VerifyCallback | VerifyCallbackWithRequest;
      if (this._passReqToCallback) {
        verifyCallback = this._verify as VerifyCallbackWithRequest;
        verifyCallback(req, token, verified);
      } else {
        verifyCallback = this._verify as VerifyCallback;
        verifyCallback(token, verified);
      }
    } catch (e) {
      this.error(e);
    }
  }
}

export interface StrategyOptions {
  tokenFunc: ExtractTokenFunc;
  passReqToCallback?: boolean | undefined;
}

export type VerifyCallback = (token: string, done: VerifiedCallback) => void;

export type VerifyCallbackWithRequest = (
  req: Request,
  token: string,
  done: VerifiedCallback,
) => void;

export type VerifiedCallback = (error: any, user?: any, info?: any) => void;

export type ExtractTokenFunc = (req: Request) => string | null;

export function fromHeader(headerName: string): ExtractTokenFunc {
  return (request: Request) => {
    let token = null;
    if (request.headers[headerName]) {
      token = request.headers[headerName];
    }
    return token;
  };
}

export function fromAuthHeaderAsApiKey(): ExtractTokenFunc {
  return (request: Request) => {
    let token = null;
    const authHeader = request.headers[AUTHORIZATION_HEADER_NAME];
    if (authHeader && typeof authHeader === 'string') {
      const regex = /(\S+)\s+(\S+)/;
      try {
        const authHeaderContent = authHeader.match(regex);
        if (authHeaderContent[1] === 'Api-Key') {
          token = authHeaderContent[2];
        }
      } catch (e) {}
    }
    return token;
  };
}
