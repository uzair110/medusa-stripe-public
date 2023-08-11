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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stripe_1 = __importDefault(require("stripe"));
var os_1 = require("os");
var medusa_1 = require("@medusajs/medusa");
var types_1 = require("../types");
var utils_1 = require("@medusajs/utils");
var StripeBase = /** @class */ (function (_super) {
    __extends(StripeBase, _super);
    function StripeBase(_, options) {
        var _this = _super.call(this, _, options) || this;
        _this.options_ = options;
        _this.init();
        return _this;
    }
    StripeBase.prototype.init = function () {
        this.stripe_ =
            this.stripe_ ||
                new stripe_1.default(this.options_.api_key, {
                    apiVersion: "2022-11-15",
                });
    };
    StripeBase.prototype.getPaymentIntentOptions = function () {
        var _a, _b, _c;
        var options = {};
        if ((_a = this === null || this === void 0 ? void 0 : this.paymentIntentOptions) === null || _a === void 0 ? void 0 : _a.capture_method) {
            options.capture_method = this.paymentIntentOptions.capture_method;
        }
        if ((_b = this === null || this === void 0 ? void 0 : this.paymentIntentOptions) === null || _b === void 0 ? void 0 : _b.setup_future_usage) {
            options.setup_future_usage = this.paymentIntentOptions.setup_future_usage;
        }
        if ((_c = this === null || this === void 0 ? void 0 : this.paymentIntentOptions) === null || _c === void 0 ? void 0 : _c.payment_method_types) {
            options.payment_method_types =
                this.paymentIntentOptions.payment_method_types;
        }
        return options;
    };
    StripeBase.prototype.getPaymentStatus = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var id, paymentIntent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = paymentSessionData.id;
                        return [4 /*yield*/, this.stripe_.paymentIntents.retrieve(id)];
                    case 1:
                        paymentIntent = _a.sent();
                        switch (paymentIntent.status) {
                            case "requires_payment_method":
                            case "requires_confirmation":
                            case "processing":
                                return [2 /*return*/, medusa_1.PaymentSessionStatus.PENDING];
                            case "requires_action":
                                return [2 /*return*/, medusa_1.PaymentSessionStatus.REQUIRES_MORE];
                            case "canceled":
                                return [2 /*return*/, medusa_1.PaymentSessionStatus.CANCELED];
                            case "requires_capture":
                            case "succeeded":
                                return [2 /*return*/, medusa_1.PaymentSessionStatus.AUTHORIZED];
                            default:
                                return [2 /*return*/, medusa_1.PaymentSessionStatus.PENDING];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StripeBase.prototype.initiatePayment = function (context) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var intentRequestData, email, cart_context, currency_code, amount, resource_id, customer, description, intentRequest, stripeCustomer, e_1, session_data, e_2;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        intentRequestData = this.getPaymentIntentOptions();
                        email = context.email, cart_context = context.context, currency_code = context.currency_code, amount = context.amount, resource_id = context.resource_id, customer = context.customer;
                        description = ((_a = cart_context.payment_description) !== null && _a !== void 0 ? _a : (_b = this.options_) === null || _b === void 0 ? void 0 : _b.payment_description);
                        intentRequest = __assign({ description: description, amount: Math.round(amount), currency: currency_code, metadata: { resource_id: resource_id }, capture_method: this.options_.capture ? "automatic" : "manual" }, intentRequestData);
                        if ((_c = this.options_) === null || _c === void 0 ? void 0 : _c.automatic_payment_methods) {
                            intentRequest.automatic_payment_methods = { enabled: true };
                        }
                        if (!((_d = customer === null || customer === void 0 ? void 0 : customer.metadata) === null || _d === void 0 ? void 0 : _d.stripe_id)) return [3 /*break*/, 1];
                        intentRequest.customer = customer.metadata.stripe_id;
                        return [3 /*break*/, 6];
                    case 1:
                        stripeCustomer = void 0;
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.stripe_.customers.create({
                                email: email,
                            })];
                    case 3:
                        stripeCustomer = _f.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _f.sent();
                        return [2 /*return*/, this.buildError("An error occurred in initiatePayment when creating a Stripe customer", e_1)];
                    case 5:
                        intentRequest.customer = stripeCustomer.id;
                        _f.label = 6;
                    case 6:
                        _f.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.stripe_.paymentIntents.create(intentRequest)];
                    case 7:
                        session_data = (_f.sent());
                        return [3 /*break*/, 9];
                    case 8:
                        e_2 = _f.sent();
                        return [2 /*return*/, this.buildError("An error occurred in InitiatePayment during the creation of the stripe payment intent", e_2)];
                    case 9: return [2 /*return*/, {
                            session_data: session_data,
                            update_requests: ((_e = customer === null || customer === void 0 ? void 0 : customer.metadata) === null || _e === void 0 ? void 0 : _e.stripe_id)
                                ? undefined
                                : {
                                    customer_metadata: {
                                        stripe_id: intentRequest.customer,
                                    },
                                },
                        }];
                }
            });
        });
    };
    StripeBase.prototype.authorizePayment = function (paymentSessionData, context) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPaymentStatus(paymentSessionData)];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, { data: paymentSessionData, status: status }];
                }
            });
        });
    };
    StripeBase.prototype.cancelPayment = function (paymentSessionData) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = paymentSessionData.id;
                        return [4 /*yield*/, this.stripe_.paymentIntents.cancel(id)];
                    case 1: return [2 /*return*/, (_b.sent())];
                    case 2:
                        error_1 = _b.sent();
                        if (((_a = error_1.payment_intent) === null || _a === void 0 ? void 0 : _a.status) === types_1.ErrorIntentStatus.CANCELED) {
                            return [2 /*return*/, error_1.payment_intent];
                        }
                        return [2 /*return*/, this.buildError("An error occurred in cancelPayment", error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StripeBase.prototype.capturePayment = function (paymentSessionData) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, intent, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = paymentSessionData.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.stripe_.paymentIntents.capture(id)];
                    case 2:
                        intent = _b.sent();
                        return [2 /*return*/, intent];
                    case 3:
                        error_2 = _b.sent();
                        if (error_2.code === types_1.ErrorCodes.PAYMENT_INTENT_UNEXPECTED_STATE) {
                            if (((_a = error_2.payment_intent) === null || _a === void 0 ? void 0 : _a.status) === types_1.ErrorIntentStatus.SUCCEEDED) {
                                return [2 /*return*/, error_2.payment_intent];
                            }
                        }
                        return [2 /*return*/, this.buildError("An error occurred in capturePayment", error_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StripeBase.prototype.deletePayment = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cancelPayment(paymentSessionData)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StripeBase.prototype.refundPayment = function (paymentSessionData, refundAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var id, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = paymentSessionData.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.stripe_.refunds.create({
                                amount: Math.round(refundAmount),
                                payment_intent: id,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        return [2 /*return*/, this.buildError("An error occurred in refundPayment", e_3)];
                    case 4: return [2 /*return*/, paymentSessionData];
                }
            });
        });
    };
    StripeBase.prototype.retrievePayment = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var id, intent, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = paymentSessionData.id;
                        return [4 /*yield*/, this.stripe_.paymentIntents.retrieve(id)];
                    case 1:
                        intent = _a.sent();
                        return [2 /*return*/, intent];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, this.buildError("An error occurred in retrievePayment", e_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StripeBase.prototype.updatePayment = function (context) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var amount, customer, paymentSessionData, stripeId, result, id, sessionData, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        amount = context.amount, customer = context.customer, paymentSessionData = context.paymentSessionData;
                        stripeId = (_a = customer === null || customer === void 0 ? void 0 : customer.metadata) === null || _a === void 0 ? void 0 : _a.stripe_id;
                        if (!(stripeId !== paymentSessionData.customer)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initiatePayment(context)];
                    case 1:
                        result = _b.sent();
                        if ((0, medusa_1.isPaymentProcessorError)(result)) {
                            return [2 /*return*/, this.buildError("An error occurred in updatePayment during the initiate of the new payment for the new customer", result)];
                        }
                        return [2 /*return*/, result];
                    case 2:
                        if (amount && paymentSessionData.amount === Math.round(amount)) {
                            return [2 /*return*/];
                        }
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        id = paymentSessionData.id;
                        return [4 /*yield*/, this.stripe_.paymentIntents.update(id, {
                                amount: Math.round(amount),
                            })];
                    case 4:
                        sessionData = (_b.sent());
                        return [2 /*return*/, { session_data: sessionData }];
                    case 5:
                        e_5 = _b.sent();
                        return [2 /*return*/, this.buildError("An error occurred in updatePayment", e_5)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StripeBase.prototype.updatePaymentData = function (sessionId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Prevent from updating the amount from here as it should go through
                        // the updatePayment method to perform the correct logic
                        if (data.amount) {
                            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Cannot update amount, use updatePayment instead");
                        }
                        return [4 /*yield*/, this.stripe_.paymentIntents.update(sessionId, __assign({}, data))];
                    case 1: return [2 /*return*/, (_a.sent())];
                    case 2:
                        e_6 = _a.sent();
                        return [2 /*return*/, this.buildError("An error occurred in updatePaymentData", e_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Constructs Stripe Webhook event
     * @param {object} data - the data of the webhook request: req.body
     * @param {object} signature - the Stripe signature on the event, that
     *    ensures integrity of the webhook event
     * @return {object} Stripe Webhook event
     */
    StripeBase.prototype.constructWebhookEvent = function (data, signature) {
        return this.stripe_.webhooks.constructEvent(data, signature, this.options_.webhook_secret);
    };
    StripeBase.prototype.buildError = function (message, e) {
        var _a, _b;
        return {
            error: message,
            code: "code" in e ? e.code : "",
            detail: (0, medusa_1.isPaymentProcessorError)(e)
                ? "".concat(e.error).concat(os_1.EOL).concat((_a = e.detail) !== null && _a !== void 0 ? _a : "")
                : "detail" in e
                    ? e.detail
                    : (_b = e.message) !== null && _b !== void 0 ? _b : "",
        };
    };
    StripeBase.identifier = "";
    return StripeBase;
}(medusa_1.AbstractPaymentProcessor));
exports.default = StripeBase;
//# sourceMappingURL=stripe-base.js.map