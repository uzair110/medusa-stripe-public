import StripeBase from '../core/stripe-base';
import { PaymentIntentOptions, PaymentProviderKeys } from '../types';
import type { StoreService } from '@medusajs/medusa';
type InjectedDependencies = {
  storeService: StoreService;
};

class BlikProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.BLIK;

  constructor(_, options, container: InjectedDependencies) {
    super(_, options, container);
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ['blik'],
      capture_method: 'automatic',
    };
  }
}

export default BlikProviderService;
