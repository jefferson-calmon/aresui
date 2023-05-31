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
		lineDark: string;
		error: string;
		background: string;
		text: string;

		inputPlaceholder: string;
	};
	borderRadius: string;
	borderWidthUnfocused: string;
	borderWidthFocused: string;
    baseHeight: string;
}

export interface AresUIContextProps {
	children: React.ReactNode;
	config: Config;
	theme: DeepPartial<Theme>;
}

export interface AresUIContextData {
	config: Config;
	theme: Theme;
}

const defaultTheme: Theme = {
	colors: {
		primary: '#000',
		text: '#000',
		line: '#f1f3f4',
		lineDark: '#d9d9d9',
		inputPlaceholder: 'rgba(0, 0, 0, 0.15)',
		background: '#fff',
		error: '#e83f5b',
	},
	borderRadius: '6px',
	borderWidthUnfocused: '2px',
	borderWidthFocused: '1px',
    baseHeight: '40px'
};

const defaultConfig: Config = {
	app: {
		name: '',
	},
};

export const AresUIContext = createContext({} as AresUIContextData);

export const AresUIProvider = (props: AresUIContextProps): JSX.Element => {
	return (
		<AresUIContext.Provider
			value={{
				config: mergeObjects(defaultConfig, props.config),
				theme: mergeObjects(defaultTheme, props.theme),
			}}
		>
			{props.children}
		</AresUIContext.Provider>
	);
};

export const useAresUI = () => {
	const contextData = useContext(AresUIContext);

	const data: AresUIContextData = {
		config: mergeObjects(defaultConfig, contextData.config || {}),
		theme: mergeObjects(defaultTheme, contextData.theme || {}),
	};

	return data;
};
