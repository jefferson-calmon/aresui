import { Theme } from 'contexts';
import { DeepPartial } from 'types';

export interface ExternalErrorsProps {
	errors: ExternalError[];
	theme: DeepPartial<Theme>;

	prefix?: string;
}

export interface ExternalError {
	id: string;
	message: string;
}

export const defaultPropsExternalErrors: ExternalErrorsProps = {
	errors: [],
	theme: {},
};
