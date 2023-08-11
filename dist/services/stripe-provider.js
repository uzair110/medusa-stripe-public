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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stripe_base_1 = __importDefault(require("../core/stripe-base"));
var types_1 = require("../types");
var StripeProviderService = /** @class */ (function (_super) {
    __extends(StripeProviderService, _super);
    function StripeProviderService(_, options) {
        return _super.call(this, _, options) || this;
    }
    Object.defineProperty(StripeProviderService.prototype, "paymentIntentOptions", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    StripeProviderService.identifier = types_1.PaymentProviderKeys.STRIPE;
    return StripeProviderService;
}(stripe_base_1.default));
exports.default = StripeProviderService;
//# sourceMappingURL=stripe-provider.js.map