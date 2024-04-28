import { BasePropsWithoutComponentProps } from 'types';

export interface ErrorsProps extends BasePropsWithoutComponentProps {
	errors: (ErrorItem | string)[];

	prefix?: string;
}

export interface ErrorItem {
	id: string;
	message: string;
}
