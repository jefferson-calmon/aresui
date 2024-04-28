export interface HandleClickOutsideProps {
	selectors: string[];

	onClickOutside?: () => void;
	disabled?: boolean;
	delay?: number;
}
