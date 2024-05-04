import { HandleClickOutsideProps } from 'components/HandleClickOutside';

export interface ModalBackdropProps {
	/**
	 * Use query selector from modal to apply click outside event.
	 *
	 * Ex: .modal, #modal
	 */
	modalSelector?: string;

    disableScrollLock?: boolean;

	onClose?: () => void;

	clickOutsideProps?: Partial<HandleClickOutsideProps>;
}
