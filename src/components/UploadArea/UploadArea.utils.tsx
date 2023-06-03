import React from 'react';

import Image from 'components/Image';
import { baseClass } from 'helpers/baseClass';

export { buildClassName } from 'helpers/buildClassName';

export const classBase = baseClass('UploadArea');

export const defaultUploadText = `Arraste e solte seus arquivos aqui ou clique para
${'selecionar-los'}.`;

export function getPreviewContentByFile(file: File) {
	if (file.type.includes('image')) {
		return (
			<Image
				src={URL.createObjectURL(file)}
				alt={file.name}
				width={100}
				height={100}
			/>
		);
	}

	return null;
}
