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
var BancontactProviderService = /** @class */ (function (_super) {
    __extends(BancontactProviderService, _super);
    function BancontactProviderService(_, options) {
        return _super.call(this, _, options) || this;
    }
    Object.defineProperty(BancontactProviderService.prototype, "paymentIntentOptions", {
        get: function () {
            return {
                payment_method_types: ["bancontact"],
                capture_method: "automatic",
            };
        },
        enumerable: false,
        configurable: true
    });
    BancontactProviderService.identifier = types_1.PaymentProviderKeys.BAN_CONTACT;
    return BancontactProviderService;
}(stripe_base_1.default));
exports.default = BancontactProviderService;
//# sourceMappingURL=stripe-bancontact.js.map