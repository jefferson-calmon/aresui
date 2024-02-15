import React, { useMemo, useState } from 'react';

import { config, mergeObjects } from 'codekit';

import * as T from './UploadArea.types';
import * as U from './UploadArea.utils';
import * as C from './UploadArea.components';
import Dropzone from 'components/Dropzone';
import { useAresUI } from 'contexts';
import { useControlledState } from 'hooks/useControlledState';

import { UploadAreaContainer } from './UploadArea.styles';

config();

export function UploadArea(props: T.UploadAreaProps) {
	// Hooks
	const aresUI = useAresUI();

	// States
	const [isDragging, setIsDragging] = useState<boolean>(false);

	// Controlled states
	const [files, setFiles] = useControlledState(
		props.files,
		[] as (File | Blob)[]
	);

	// Memo vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme);
	}, [aresUI.theme, props.theme]);

	const className = useMemo(() => {
		const previewMultiple =
			props.preview && files && files.length > 0 && props.multiple;

		const classes = [
			U.classBase(),
			isDragging && U.classBase('dragging'),
			props.containerProps.className,
			previewMultiple && U.classBase('preview-multiple'),
		];

		return U.buildClassName(...classes);
	}, [props, isDragging, files]);

	const showDropzoneContent = useMemo(() => {
		if (props.multiple) return true;

		return !props.preview || files?.length === 0;
	}, [files?.length, props.multiple, props.preview]);

	// Functions
	function handleUpload(files: File[]) {
        props.onUpload?.(files);

		setFiles((prev) => {
			const newPrev = prev ?? [];
			const newFiles = [...newPrev, ...files];

			props.onChange?.(newFiles);

			return [...newPrev, ...files];
		});
	}

	function handleDelete(file: File | Blob) {
		setFiles((prev) => {
			const newPrev = prev ?? [];
			const newFiles = newPrev.filter((f) => f.name !== file.name);

			props.onChange?.(newFiles);

			return newFiles;
		});
	}

	return (
		<UploadAreaContainer
			{...props.containerProps}
			className={className}
			$theme={theme}
			$width={props.width}
		>
			{props.label && <label>{props.label}</label>}

			<Dropzone
				className={U.classBase('dropzone')}
				onUpload={handleUpload}
				onChangeDragActive={setIsDragging}
				options={{
					disabled: !!(!props.multiple && files && files.length > 0),
					...props.dropzoneOptions,
				}}
			>
				{showDropzoneContent && (
					<div className={U.classBase('dz-content')}>
						<div className={U.classBase('icon')}>
							{!props.uploadIcon && <C.UploadIcon />}
							{props.uploadIcon && props.uploadIcon}
						</div>

						{!props.uploadText && <p>{U.defaultUploadText}</p>}
						{props.uploadText && <p>{props.uploadText}</p>}
					</div>
				)}

				{isDragging && <div className={U.classBase('overlay')} />}

				{props.preview &&
					files &&
					files.length > 0 &&
					!props.multiple && (
						<C.FilePreview
							file={files.last()}
							onDelete={() => handleDelete(files.last())}
						/>
					)}
			</Dropzone>

			{props.preview && files && files.length > 0 && props.multiple && (
				<C.FileListPreview files={files} onDelete={handleDelete} />
			)}
		</UploadAreaContainer>
	);
}

UploadArea.defaultProps = T.defaultPropsUploadArea;

export * from './UploadArea.types';

export default UploadArea;
