import { config } from 'pandora-tools';

config();

export function buildClassName(...classes: (string | undefined | false | null)[]) {
	return classes.compact().uniq().join(' ');
}
