import { useTransition } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type Variant = 'danger' | 'warning' | 'info';

type ConfirmationModalProps = {
  title: string;
  name: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: Variant;
  onConfirm: () => void | Promise<void>;
};

const variantStyles: Record<Variant, { icon: string; button: string }> = {
  danger: {
    icon: 'text-red-500 bg-red-50',
    button: 'bg-red-500 hover:bg-red-600',
  },
  warning: {
    icon: 'text-yellow-500 bg-yellow-50',
    button: 'bg-yellow-500 hover:bg-yellow-600',
  },
  info: {
    icon: 'text-green-500 bg-green-50',
    button: 'bg-green-500 hover:bg-green-600',
  },
};

const ConfirmationModal = NiceModal.create(
  ({
    title,
    name,
    description,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    variant = 'danger',
    onConfirm,
  }: ConfirmationModalProps) => {
    const modal = useModal();
    const [isPending, startTransition] = useTransition();

    const styles = variantStyles[variant];

    const handleConfirm = () => {
      startTransition(async () => {
        await onConfirm();
        modal.hide();
      });
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) modal.hide();
    };

    if (!modal.visible) {
      return null;
    }

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 px-4"
        onClick={handleBackdropClick}
      >
        <span id="confirmation-modal-title" className="sr-only">
          {name}
        </span>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
          <div className="px-6 pt-6 pb-4 flex flex-col items-center text-center gap-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${styles.icon}`}
            >
              <ExclamationTriangleIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">{title}</h2>
              {description && (
                <p className="text-sm text-gray-400 mt-1">{description}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => modal.hide()}
              disabled={isPending}
              className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isPending}
              className={`flex-1 px-4 py-2 text-sm text-white rounded-lg disabled:opacity-50 transition-colors ${styles.button}`}
            >
              {isPending ? 'Aguarde...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default ConfirmationModal;
