export interface HandleClickProps {
	elementSelectors: string[];
	disabled?: boolean;
	onClick: () => void;
}

export const defaultPropsHandleClick: HandleClickProps = {
	elementSelectors: [],
	onClick: () => ({}),
};
