import { DropzoneOptions } from 'react-dropzone';

export interface DropzoneProps {
	children: JSX.Element | React.ReactNode;
	options?: DropzoneOptions;
	className?: string;

	onUpload?: (file: File[]) => void;
	onChangeDragActive?: (isDragActive: boolean) => void;
}
