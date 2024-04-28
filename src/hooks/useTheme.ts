import { merge } from 'codekit';
import { useAresUI } from 'contexts';
import { BaseProps } from 'types';

export function useTheme(theme?: BaseProps<'div'>['theme']) {
	// Hooks
	const aresUI = useAresUI();

	return merge(aresUI.theme, theme ?? {});
}
