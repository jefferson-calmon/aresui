import { config } from 'pandora-tools';

config();

export function buildClassName(...classes: (string | undefined)[]) {
	return classes.compact().uniq().join(' ');
}
