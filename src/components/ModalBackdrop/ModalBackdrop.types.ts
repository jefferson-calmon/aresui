export interface ModalBackdropProps {
	/**
	 * Use query selector from modal to apply click outside event.
	 *
	 * Ex: .modal, #modal
	 */
	modalSelector?: string;
	onClose: () => void;
}
