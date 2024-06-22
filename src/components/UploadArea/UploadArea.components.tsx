import React from 'react';

import { classBase, getPreviewContentByFile } from './UploadArea.utils';
import { FileItem } from './UploadArea.types';

import {
	FileListPreviewContainer,
	FilePreviewContainer,
} from './UploadArea.styles';

interface FilePreviewProps {
	file: FileItem;
	onDelete: () => void;
}

interface FileListPreviewProps {
	files: FileItem[];
	onDelete: (file: FileItem) => void;
}

export function FilePreview(props: FilePreviewProps) {
	return (
		<FilePreviewContainer className={classBase('file-preview')}>
			<div className={classBase('file-preview-content')}>
				{getPreviewContentByFile(props.file.file)}
                
				<div className={classBase('remove')} onClick={props.onDelete}>
					<IconTimes />
				</div>
			</div>
		</FilePreviewContainer>
	);
}

export function FileListPreview(props: FileListPreviewProps) {
	return (
		<FileListPreviewContainer>
			{props.files.map((file) => (
				<div
					key={file.id}
					className={classBase('file-list-preview-item')}
				>
					{getPreviewContentByFile(file.file)}
				</div>
			))}
		</FileListPreviewContainer>
	);
}

export function IconTimes(): JSX.Element {
	return (
		<svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8 8L16 16"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16 8L8 16"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function IconUpload() {
	return (
		<svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 19V12"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9.833 14L12 11.833L14.167 14"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16 19H18.56C20.488 19 22.06 17.428 22.06 15.5C22.06 13.572 20.488 12 18.56 12H18.125V11C18.125 7.69 15.435 5 12.125 5C9.148 5 6.68 7.178 6.212 10.023C3.835 10.144 1.94 12.093 1.94 14.5C1.94 16.985 3.955 19 6.44 19H8"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
