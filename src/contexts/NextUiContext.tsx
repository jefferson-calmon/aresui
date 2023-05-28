import { mergeObjects } from 'pandora-tools';
import React, { createContext, useContext } from 'react';

export interface Config {
	app: {
		name: string;
	};
}

export interface Theme {
	colors: {
		primary: string;
		line: string;
		error: string;
		text: string;

		inputPlaceholder: string;
	};
	borderRadius: string;
	borderWidth: string;
}

export interface NextUIContextProps {
	children: React.ReactNode;
	config: Config;
	theme: Theme;
}

export interface NextUIContextData {
	config: Config;
	theme: Theme;
}

const defaultTheme: Theme = {
	colors: {
		primary: '#000',
		text: '#000',
		line: '#f1f3f4',
		inputPlaceholder: 'rgba(0, 0, 0, 0.15)',
		error: 'e83f5b',
	},
	borderRadius: '.4rem',
	borderWidth: '1px',
};

const defaultConfig: Config = {
	app: {
		name: '',
	},
};

export const NextUIContext = createContext({} as NextUIContextData);

export const NextUIProvider = (props: NextUIContextProps): JSX.Element => {
	return (
		<NextUIContext.Provider
			value={{
				config: mergeObjects(defaultConfig, props.config),
				theme: mergeObjects(defaultTheme, props.theme),
			}}
		>
			{props.children}
		</NextUIContext.Provider>
	);
};

export const useNextUI = () => {
	const contextData = useContext(NextUIContext);

	const data: NextUIContextData = {
		config: mergeObjects(defaultConfig, contextData.config || {}),
		theme: mergeObjects(defaultTheme, contextData.theme || {}),
	};

	return data;
};
