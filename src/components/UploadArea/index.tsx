import React, { useMemo, useState } from 'react';

import { config, uuid } from 'codekit';

import * as T from './UploadArea.types';
import * as U from './UploadArea.utils';
import * as C from './UploadArea.components';
import Dropzone from 'components/Dropzone';
import { useControlledState } from 'hooks/useControlledState';
import { useTheme } from 'hooks/useTheme';

import { UploadAreaContainer } from './UploadArea.styles';

config();

export function UploadArea({
	width = 400,
	multiple = true,
	preview = true,
	containerProps = {},
	...props
}: T.UploadAreaProps) {
	// Hooks
	const theme = useTheme(props.theme);

	// States
	const [isDragging, setIsDragging] = useState<boolean>(false);

	// Controlled states
	const [files, setFiles] = useControlledState(
		props.files,
		[] as T.FileItem[]
	);

	// Memo vars
	const className = useMemo(() => {
		const previewMultiple =
			preview && files && files.length > 0 && multiple;

		const classes = [
			U.classBase(),
			isDragging && U.classBase('dragging'),
			containerProps?.className,
			previewMultiple && U.classBase('preview-multiple'),
		];

		return U.buildClassName(...classes);
	}, [preview, files, multiple, isDragging, containerProps?.className]);

	const showDropzoneContent = useMemo(() => {
		if (multiple) return true;

		return !preview || files?.length === 0;
	}, [files?.length, multiple, preview]);

	// Functions
	function handleUpload(files: File[]) {
		props.onUpload?.(files);

		const filesNormalized = files.map<T.FileItem>((file) => ({
			id: uuid(),
			file,
		}));

		setFiles((prev) => {
			const newPrev = prev ?? [];
			const newFiles = [...newPrev, ...filesNormalized];

			props.onChange?.(newFiles);

			return newFiles;
		});
	}

	function handleDelete(file: T.FileItem) {
		setFiles((prev) => {
			const newPrev = prev ?? [];
			const newFiles = newPrev.filter((f) => f.id !== file.id);

			props.onChange?.(newFiles);

			return newFiles;
		});
	}

	return (
		<UploadAreaContainer
			{...containerProps}
			className={className}
			$theme={theme}
			$width={width}
		>
			{props.label && <label>{props.label}</label>}

			<Dropzone
				className={U.classBase('dropzone')}
				onUpload={handleUpload}
				onChangeDragActive={setIsDragging}
				options={{
					disabled: !!(!multiple && files && files.length > 0),
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

				{preview && files && files.length > 0 && !multiple && (
					<C.FilePreview
						file={files.last()}
						onDelete={() => handleDelete(files.last())}
					/>
				)}
			</Dropzone>

			{preview && files && files.length > 0 && multiple && (
				<C.FileListPreview files={files} onDelete={handleDelete} />
			)}
		</UploadAreaContainer>
	);
}

export * from './UploadArea.types';

export default UploadArea;
