import { DropzoneOptions } from 'react-dropzone';

export interface DropzoneProps {
	children: React.ReactNode;
	options?: DropzoneOptions;
	className?: string;

	onUpload?: (file: File[]) => void;
	onChangeDragActive?: (isDragActive: boolean) => void;
}

export const defaultPropsDropzone: DropzoneProps = {
	children: null,
};
