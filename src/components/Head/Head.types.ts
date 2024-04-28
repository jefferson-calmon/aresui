import {} from 'next/head';

export interface HeadProps {
	title: string;
	titleSeparator?: string;

	description?: string;
	keywords?: string[];
	robots?: ('index' | 'follow')[];
    author?: string;
    language?: string;

	children?: React.ReactNode;
}
