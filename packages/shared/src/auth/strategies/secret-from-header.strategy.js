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
exports.SecretFromHeaderStrategy = void 0;
var passport_1 = require("@nestjs/passport");
var strategy_1 = require("../passports/passport-api-key/strategy");
var common_1 = require("@nestjs/common");
var SecretFromHeaderStrategy = /** @class */ (function (_super) {
    __extends(SecretFromHeaderStrategy, _super);
    function SecretFromHeaderStrategy() {
        return _super.call(this, {
            tokenFunc: (0, strategy_1.fromHeader)(process.env.secret_header_name),
            passReqToCallback: false
        }) || this;
    }
    SecretFromHeaderStrategy.prototype.validate = function (token) {
        if (process.env.secret_key !== token) {
            throw new common_1.UnauthorizedException('Secret was not provided or is incorrect');
        }
        return true;
    };
    return SecretFromHeaderStrategy;
}((0, passport_1.PassportStrategy)(strategy_1.Strategy, 'secret-from-header')));
exports.SecretFromHeaderStrategy = SecretFromHeaderStrategy;
