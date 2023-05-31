import { Theme } from 'contexts';
import { darken, transparentize, readableColor } from 'polished';

interface Props {
	UITheme: Theme;
}

export function readableColorByBackground(props: Props) {
	return readableColor(props.UITheme.colors.background);
}

export function readableColorByPrimary(props: Props) {
	return readableColor(props.UITheme.colors.primary);
}

export function darkenLineColorBy5Percent(props: Props) {
	return darken(0.05, props.UITheme.colors.line);
}

export function transparentizePrimaryColorBy97Percent(props: Props) {
	return transparentize(0.97, props.UITheme.colors.primary);
}
