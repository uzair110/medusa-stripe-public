import StripeBase from '../core/stripe-base';
import { PaymentIntentOptions, PaymentProviderKeys } from '../types';
import type { StoreService } from '@medusajs/medusa';
type InjectedDependencies = {
  storeService: StoreService;
};

class IdealProviderService extends StripeBase {
  static identifier = PaymentProviderKeys.IDEAL;

  constructor(_, options, container: InjectedDependencies) {
    super(_, options, container);
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ['ideal'],
      capture_method: 'automatic',
    };
  }
}

export default IdealProviderService;
