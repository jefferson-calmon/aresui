import { useRouter } from 'next/router';

export interface RedirectProps {
	to: string;
	delay: number;
	toBack: boolean;
	transitionOptions: Parameters<ReturnType<typeof useRouter>['push']>['2'];
}

export const defaultPropsRedirect: RedirectProps = {
	to: '',
	delay: 0,
	toBack: false,
	transitionOptions: undefined,
};
