import NiceModal from '@ebay/nice-modal-react';

import PlansModal from '../components/PlansModal';

export const MODAL_IDS = {
  PLAN: 'plan-modal',
} as const;

const registerModals = () => {
  NiceModal.register(MODAL_IDS.PLAN, PlansModal);
};

export default registerModals;
