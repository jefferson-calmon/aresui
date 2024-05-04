import { HTMLAttributes } from 'react';
import { DropzoneOptions } from 'react-dropzone';

import { BasePropsWithoutComponentProps, Width } from 'types';

export interface UploadAreaProps extends BasePropsWithoutComponentProps {
	label?: string;

	width?: Width;
	multiple?: boolean;
	files?: FileItem[];
	preview?: boolean;

	uploadIcon?: JSX.Element;
	uploadText?: JSX.Element;

	dropzoneOptions?: Partial<DropzoneOptions>;
	containerProps?: HTMLAttributes<HTMLDivElement>;

	onUpload?: (files: File[]) => void;
	onChange?: (files: FileItem[]) => void;
}

export interface FileItem {
	id: string;
	file: File | Blob;
}

export interface FilePreviewProps {
	file: File;
	onDelete: () => void;
}
