import StripeBase from '../core/stripe-base';
import { PaymentIntentOptions, PaymentProviderKeys } from '../types';
import type { StoreService } from '@medusajs/medusa';
type InjectedDependencies = {
  storeService: StoreService;
};

class Przelewy24ProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.PRZELEWY_24;

  constructor(_, options, container: InjectedDependencies) {
    super(_, options, container);
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ['p24'],
      capture_method: 'automatic',
    };
  }
}

export default Przelewy24ProviderService;
