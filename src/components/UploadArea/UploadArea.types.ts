import { DropzoneOptions } from 'react-dropzone';

import { ComponentProps, DivHTMLAttributes, Width } from 'types';

export interface UploadAreaProps extends ComponentProps<object> {
	label?: string;

	width: Width;
	multiple: boolean;
	files?: FileItem[];
	preview?: boolean;

	uploadIcon?: JSX.Element;
	uploadText?: JSX.Element;

	dropzoneOptions: DropzoneOptions;
	containerProps: DivHTMLAttributes;

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

export const defaultPropsUploadArea: UploadAreaProps = {
	preview: true,
	width: 400,
	theme: {},
	dropzoneOptions: {},
	containerProps: {},
	multiple: true,
};
