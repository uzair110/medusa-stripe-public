import StripeBase from '../core/stripe-base';
import { PaymentIntentOptions, PaymentProviderKeys } from '../types';
import type { StoreService } from '@medusajs/medusa';
type InjectedDependencies = {
  storeService: StoreService;
};

class StripeProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.STRIPE;

  constructor(_, options, container: InjectedDependencies) {
    super(_, options, container);
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {};
  }
}

export default StripeProviderService;
