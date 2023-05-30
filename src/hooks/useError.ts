import { useMemo, useState } from 'react';

import { config } from 'pandora-tools';

interface Error {
	id: string;
	message: string;
}

function createErrorFromString(error: string): Error {
	return {
		id: error.slugify(),
		message: error,
	};
}

config();

export function useError() {
	// States
	const [errors, setErrors] = useState<Error[]>([]);
	const [lastError, setLastError] = useState<Error | undefined>();

	// Memo vars
	const exists = useMemo(() => errors.length > 0, [errors]);

	// Functions
	function clear() {
		setErrors([]);
		setLastError(undefined);
	}

	function add(error: Error | string) {
		setErrors((prev) => {
			const errors = Array.from(prev);
			const isString = typeof error === 'string';

			const errorObject = isString ? createErrorFromString(error) : error;
            
			errors.push(errorObject);

			setLastError(errorObject);
			return errors.uniqByKey('id');
		});
	}

	function get(id: string) {
		return errors.find((error) => error.id === id);
	}

	function remove(id: string) {
		setErrors((prev) => prev.filter((error) => error.id !== id));
	}

	function update(id: string, message: string) {
		setErrors((prev) => {
			const errors = Array.from(prev);
			const index = errors.findIndex((error) => error.id === id);

			if (index >= 0) errors[index].message = message;
			return errors;
		});
	}

	function catcher(error: unknown) {
		const err = error as Record<string, string>;
		const message = err.message;

		console.log('[+] Error in `useError.catcher`', error);

		add({
			id: 'process',
			message: `Houve um erro durante o processo. Error: ${message}.`,
		});
	}

	return {
		exists,
		errors,
		lastError,

		catcher,
		clear,
		add,
		get,
		remove,
		update,
	};
}
