import React from 'react';

import Image from 'components/Image';
import { baseClass } from 'helpers/baseClass';
import { IconFileUploaded } from 'icons';
import { formatFileSize } from 'utils/formatFileSize';

export { buildClassName } from 'helpers/buildClassName';

export const classBase = baseClass('UploadArea');

export const defaultUploadText = `Arraste e solte seus arquivos aqui ou clique para
${'selecionar-los'}.`;

export function getPreviewContentByFile(file: File | Blob) {
	if (file.type.includes('image')) {
		return (
			<Image
				src={URL.createObjectURL(file)}
				alt={(file as File)?.name ?? ''}
				width={100}
				height={100}
			/>
		);
	}

	return (
		<div className="file">
			{<IconFileUploaded />}

			<small>
				{file.type} • {formatFileSize(file.size)}
			</small>

			<p>{(file as File)?.name ?? 'Arquivo'}</p>
		</div>
	);
}
