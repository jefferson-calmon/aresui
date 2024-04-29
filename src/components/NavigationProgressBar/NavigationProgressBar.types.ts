import { NProgressOptions } from 'nprogress';

export interface NavigationProgressBarProps {
	/**
	 * The color of the bar.
	 * @default "#000000"
	 */
	color?: string;
	/**
	 * The start position of the bar.
	 * @default 0.3
	 */
	startPosition?: number;
	/**
	 * The stop delay in milliseconds.
	 * @default 200
	 */
	stopDelayMs?: number;
	/**
	 * The height of the bar.
	 * @default 2.5
	 */
	height?: number;
	/**
	 * Whether to show the bar on shallow routes.
	 * @default true
	 */
	showOnShallow?: boolean;
	/**
	 * The other NProgress configuration options to pass to NProgress.
	 * @default null
	 */
	options?: Partial<NProgressOptions>;
	/**
	 * The nonce attribute to use for the `style` tag.
	 * @default undefined
	 */
	nonce?: string | undefined;

	/**
	 * Use your custom CSS tag instead of the default one.
	 * This is useful if you want to use a different style or minify the CSS.
	 * @default (css) => <style nonce={nonce}>{css}</style>
	 */
	transformCSS?: (css: string) => JSX.Element;
}
