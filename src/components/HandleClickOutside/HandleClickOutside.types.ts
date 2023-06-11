export interface HandleClickOutsideProps {
	elementSelectors: string[];
	onClickOutside: () => void;
	disabled?: boolean;
	delay: number;
}

export const defaultPropsHandleClickOutside: HandleClickOutsideProps = {
	elementSelectors: [],
	onClickOutside: () => ({}),
	delay: 300,
};
