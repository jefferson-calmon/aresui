import { config } from 'codekit';

config();

export function buildClassName(...classes: (string | undefined | false | null)[]) {
	return classes.compact().uniq().join(' ');
}
