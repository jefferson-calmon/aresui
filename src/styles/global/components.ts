import { Theme } from 'contexts';
import { css } from 'styled-components';

export const globalStyle = (theme: Theme) => css`
	/* Global reset */
	margin: 0;
	padding: 0;
	outline: none;
	border: none;
	box-sizing: border-box;
	font-family: 'Roboto', Helvetica, Arial, sans-serif;

	/* Global variables */
	--color-primary: ${theme.colors.primary};
	--color-text: #333333;
	--color-placeholder: ${theme.colors.inputPlaceholder};
	--color-line: ${theme.colors.line};
	--color-background: ${theme.colors.background};
	--color-error: ${theme.colors.error};

    --base-height: ${theme.baseHeight};
	--border-width-unfocused: ${theme.borderWidthUnfocused};
	--border-width-focused: ${theme.borderWidthFocused};
	--border-radius: ${theme.borderRadius};

    --shadow-smallest: 0px 2px 4px rgba(0,0,0,.1);
    --shadow-extra-small: 0px 4px 8px rgba(0,0,0,.12);
    --shadow-small: 0 5px 10px rgba(0,0,0,.12);
    --shadow-medium: 0 8px 30px rgba(0,0,0,.12);

	/* Global styles */
	::-webkit-scrollbar {
		width: 4px;
		background: transparent;
		padding-right: 3px;
	}

	::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.07);
	}

	html {
		font-size: 10px !important;
		scroll-behavior: smooth;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	button {
		cursor: pointer;
	}

	img {
		user-select: none;
		pointer-events: none;
	}

	i {
		font-style: normal;
		font-weight: normal !important;
		font-variant: normal;
		text-transform: none;
		line-height: 1;
	}
`;
