import React, { useMemo, useState } from 'react';

import { config, mergeObjects } from 'pandora-tools';

import * as T from './UploadArea.types';
import * as U from './UploadArea.utils';
import * as C from './UploadArea.components';
import Dropzone from 'components/Dropzone';
import { useAresUI } from 'contexts';

import { UploadAreaContainer } from './UploadArea.styles';

config();

export function UploadArea(props: T.UploadAreaProps) {
	// Hooks
	const aresUI = useAresUI();

	// States
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [files, setFiles] = useState<File[]>([]);

	// Memo vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme);
	}, [props.theme]);

	const className = useMemo(() => {
		const previewMultiple =
			props.preview && files.length > 0 && props.multipleFiles;

		const classes = [
			U.classBase(),
			isDragging && U.classBase('dragging'),
			props.containerProps.className,
			previewMultiple && U.classBase('preview-multiple'),
		];

		return U.buildClassName(...classes);
	}, [props, isDragging, files]);

	const showDropzoneContent = useMemo(() => {
		if (props.multipleFiles) return true;

		return !props.preview || files.length === 0;
	}, []);

	// Functions
	function handleUpload(files: File[]) {
		setFiles((prev) => [...prev, ...files]);

		props.onUpload?.(files);
	}

	function handleDelete(file: File) {
		setFiles((files) => files.filter((f) => f.name !== file.name));
	}

	return (
		<UploadAreaContainer
			{...props.containerProps}
			className={className}
			UITheme={theme}
			width={props.width}
		>
			{props.label && <label>{props.label}</label>}

			<Dropzone
				className={U.classBase('dropzone')}
				onUpload={handleUpload}
				onChangeDragActive={setIsDragging}
				options={{
					disabled: !props.multipleFiles && files.length > 0,
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

				{props.preview && files.length > 0 && !props.multipleFiles && (
					<C.FilePreview
						file={files.last()}
						onDelete={() => handleDelete(files.last())}
					/>
				)}
			</Dropzone>

			{props.preview && files.length > 0 && props.multipleFiles && (
				<C.FileListPreview files={files} onDelete={handleDelete} />
			)}
		</UploadAreaContainer>
	);
}

UploadArea.defaultProps = T.defaultPropsUploadArea;

export * from './UploadArea.types';

export default UploadArea;
