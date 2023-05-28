import { config } from 'pandora-tools';

config();

export function baseClass(baseClass?: string) {
	return (...classes: string[]) => {
		return ['aresui', baseClass, ...classes]
			.compact()
			.join('-')
			.toLowerCase();
	};
}
