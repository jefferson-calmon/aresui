import { Theme } from 'contexts';
import { darken, transparentize, readableColor } from 'polished';

interface Props {
	theme: Theme;
}

export function readableColorByBackground(props: Props) {
	return readableColor(props.theme.colors.background);
}

export function darkenLineColorBy5Percent(props: Props) {
	return darken(0.05, props.theme.colors.line);
}

export function transparentizePrimaryColorBy97Percent(props: Props) {
	return transparentize(0.97, props.theme.colors.primary);
}
