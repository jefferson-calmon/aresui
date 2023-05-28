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
