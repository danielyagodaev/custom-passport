"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.fromAuthHeaderAsApiKey = exports.fromHeader = exports.Strategy = void 0;
var passport_strategy_1 = require("passport-strategy");
var AUTHORIZATION_HEADER_NAME = 'authorization';
var Strategy = /** @class */ (function (_super) {
    __extends(Strategy, _super);
    function Strategy(opt, verify) {
        var _this = _super.call(this) || this;
        _this._tokenFunc = opt.tokenFunc;
        _this._passReqToCallback = opt.passReqToCallback;
        _this._verify = verify;
        return _this;
    }
    Strategy.prototype.authenticate = function (req, options) {
        try {
            var token = this._tokenFunc(req);
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var self_1 = this;
            var verified = function (err, user, info) {
                if (err) {
                    var res = self_1.error(err);
                    return res;
                }
                if (!user) {
                    return self_1.fail(info);
                }
                self_1.success(user);
            };
            var verifyCallback = void 0;
            if (this._passReqToCallback) {
                verifyCallback = this._verify;
                verifyCallback(req, token, verified);
            }
            else {
                verifyCallback = this._verify;
                verifyCallback(token, verified);
            }
        }
        catch (e) {
            this.error(e);
        }
    };
    return Strategy;
}(passport_strategy_1.Strategy));
exports.Strategy = Strategy;
function fromHeader(headerName) {
    return function (request) {
        var token = null;
        if (request.headers[headerName]) {
            token = request.headers[headerName];
        }
        return token;
    };
}
exports.fromHeader = fromHeader;
function fromAuthHeaderAsApiKey() {
    return function (request) {
        var token = null;
        var authHeader = request.headers[AUTHORIZATION_HEADER_NAME];
        if (authHeader && typeof authHeader === 'string') {
            var regex = /(\S+)\s+(\S+)/;
            try {
                var authHeaderContent = authHeader.match(regex);
                if (authHeaderContent[1] === 'Api-Key') {
                    token = authHeaderContent[2];
                }
            }
            catch (e) { }
        }
        return token;
    };
}
exports.fromAuthHeaderAsApiKey = fromAuthHeaderAsApiKey;
