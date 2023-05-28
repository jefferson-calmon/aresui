import {} from 'next/head';

export interface HeadProps {
	title: string;
    titleSeparator: string;
	children?: React.ReactNode;
}

export const defaultPropsHead: HeadProps = {
	title: '',
    titleSeparator: ' | ',
	children: undefined,
};
