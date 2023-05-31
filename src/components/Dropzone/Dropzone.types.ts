import { DropzoneOptions } from "react-dropzone";

export interface DropzoneProps {
	children: React.ReactNode;
	options?: DropzoneOptions;
	onUpload?: (file: File[]) => void;
	onChangeDragActive?: (isDragActive: boolean) => void;
}

export const defaultPropsDropzone: DropzoneProps = {
    children: null,
}
