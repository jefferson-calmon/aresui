import { DropzoneOptions } from 'react-dropzone';

import { ComponentProps, DivHTMLAttributes, Width } from 'types';

export interface UploadAreaProps extends ComponentProps<{}> {
	label?: string;

	width: Width;
	preview?: boolean;
	multipleFiles: boolean;

	uploadIcon?: JSX.Element;
	uploadText?: JSX.Element;

	dropzoneOptions: DropzoneOptions;
	containerProps: DivHTMLAttributes;

	onUpload?: (files: File[]) => void;
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
	multipleFiles: true,
};
