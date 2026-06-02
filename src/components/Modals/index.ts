import NiceModal from '@ebay/nice-modal-react';

import PlansModal from './PlansModal';
import ConfirmationModal from './ConfirmationModal';

export const MODAL_IDS = {
  PLAN: 'plan-modal',
  CONFIRMATION: 'confirmation-modal',
} as const;

const registerModals = () => {
  NiceModal.register(MODAL_IDS.PLAN, PlansModal);
  NiceModal.register(MODAL_IDS.CONFIRMATION, ConfirmationModal);
};

export default registerModals;
