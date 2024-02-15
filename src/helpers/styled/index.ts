import { Theme } from 'contexts';
import * as P from 'polished';

export interface StyledProps {
	$theme: Theme;
}

type Color = keyof Theme['colors'] & string;

export function size(sizeInRem: number) {
	return (props: StyledProps) => props.$theme.size * sizeInRem + 'px';
}

export function readableColor(color: Color) {
	return (props: StyledProps) =>
		P.readableColor(props.$theme.colors?.[color] ?? color);
}

export function darken(color: Color, amount: number) {
	return (props: StyledProps) =>
		P.darken(amount, props.$theme.colors?.[color] ?? color);
}

export function transparentize(color: Color, amount: number) {
	return (props: StyledProps) =>
		P.transparentize(amount, props.$theme.colors?.[color] ?? color);
}

export function transparentizeReadableColor(color: Color, amount: number) {
	return (props: StyledProps) =>
		P.transparentize(
			amount,
			P.readableColor(props.$theme.colors?.[color] ?? color)
		);
}
