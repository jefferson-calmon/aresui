import React, { useCallback, useEffect, useMemo } from 'react';

import * as D from 'react-dropzone';

import * as T from './Dropzone.types';
import * as U from './Dropzone.utils';

import { DropzoneContainer } from './Dropzone.styles';

export function Dropzone(props: T.DropzoneProps): JSX.Element {
	// Callbacks
	const onDrop = useCallback(
		(files: File[]) => props.onUpload?.(files),
		[props.onUpload]
	);

	const onChangeDragActive = useCallback(
		(isActive: boolean) => props.onChangeDragActive?.(isActive),
		[props]
	);

	// Hooks
	const dropzone = D.useDropzone({
		onDrop,
		accept: U.getAccepts(props.options),
		...props.options,
	});

	// Effects
	useEffect(() => {
		onChangeDragActive(dropzone.isDragActive);
	}, [dropzone.isDragActive, onChangeDragActive]);

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			dropzone.isDragActive && U.classBase('drag-active'),
		];

		return U.buildClassName(...classes);
	}, [props, dropzone]);

	return (
		<DropzoneContainer {...dropzone.getRootProps()} className={className}>
			<input {...dropzone.getInputProps()} />

			{props.children}
		</DropzoneContainer>
	);
}

Dropzone.defaultProps = T.defaultPropsDropzone;

export * from './Dropzone.types'

export default Dropzone;
