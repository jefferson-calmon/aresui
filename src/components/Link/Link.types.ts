import { LinkProps as NextLinkProps } from 'next/link';

import { UrlObject } from 'url';

export interface LinkProps extends Omit<NextLinkProps, 'href'> {
	children: React.ReactNode | JSX.Element;
	to: Url;
	className?: string;
}

type Url = string | UrlObject;

export const defaultPropsLink: LinkProps = {
	children: 'Link',
	to: '#',
};
