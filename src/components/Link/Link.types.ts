import { LinkProps as NextLinkProps } from 'next/link';

import { UrlObject } from 'url';

export interface LinkProps extends Omit<NextLinkProps, 'href'> {
	to: Url;

	className?: string;
	children?: React.ReactNode | JSX.Element;
}

type Url = string | UrlObject;
