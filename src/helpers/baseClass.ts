import { config } from 'codekit';

config();

export function baseClass(baseClass?: string) {
	return (...classes: string[]) => {
		return ['aresui', baseClass, ...classes]
			.compact()
			.join('-')
			.toLowerCase();
	};
}
