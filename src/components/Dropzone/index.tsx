import React, { useEffect, useMemo } from 'react';

import * as D from 'react-dropzone';

import * as T from './Dropzone.types';
import * as U from './Dropzone.utils';

import { DropzoneContainer } from './Dropzone.styles';

export function Dropzone({
	children = null,
	options = {},
	onUpload,
	onChangeDragActive,
	...props
}: T.DropzoneProps): JSX.Element {
	// Hooks
	const dropzone = D.useDropzone({
		onDrop: (files: File[]) => onUpload?.(files),
		accept: {
			'image/*': [],
			'video/*': [],
			'audio/*': [],
			'text/*': [],
			'application/pdf': [],
		},
		...options,
	});

	// Effects
	useEffect(() => {
		onChangeDragActive?.(dropzone.isDragActive);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dropzone.isDragActive]);

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			props.className,
			dropzone.isDragActive && U.classBase('drag-active'),
		];

		return U.buildClassName(...classes);
	}, [dropzone, props.className]);

	return (
		<DropzoneContainer {...dropzone.getRootProps()} className={className}>
			<input {...dropzone.getInputProps()} />

			{children}
		</DropzoneContainer>
	);
}

export * from './Dropzone.types';

export default Dropzone;
