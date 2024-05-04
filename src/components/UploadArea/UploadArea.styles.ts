/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

import * as H from 'helpers/styled';
import { globalStyle } from 'styles/global/components';
import { Theme } from 'contexts';
import { classBase } from './UploadArea.utils';
import { UploadAreaProps } from './UploadArea.types';

interface Props {
	$theme: Theme;
	$width: UploadAreaProps['width'];
}

export const UploadAreaContainer = styled.div`
	${(props: Props) => globalStyle(props.$theme)}

	--side-preview-size: 72.00px;
	--dropzone-height: 200px;

	position: relative;

	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		'label'
		'dropzone';

	width: ${({ $width }) =>
		typeof $width === 'string' ? $width : $width + 'px'};

	label {
		grid-area: label;
		display: inline-block;
		font-size: 14px;
		font-weight: 400;

		color: ${H.readableColor('background')};

		margin-bottom: 6px;
	}

	.${classBase('dropzone')} {
		position: relative;

		grid-area: dropzone;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 32px;

		width: 100%;
		height: var(--dropzone-height);

		border-radius: var(--border-radius);
		border: 2px dashed var(--color-line-dark);
		background: ${H.transparentizeReadableColor('background', 0.99)};

		.${classBase('dz-content')} {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: 12px;

			padding: 28px;

			.${classBase('icon')} {
				width: 44px;
				height: 44px;

				svg {
					width: 100%;
					height: 100%;
					object-fit: contain;
					color: ${H.readableColor('background')};
					opacity: 0.7;
				}
			}

			p {
				display: inline-block;

				max-width: 170px;

				font-size: 16px;
				opacity: 0.8;
				line-height: 1.4;
			}
		}

		.${classBase('overlay')} {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;

			width: 100%;
			height: 100%;

			background: ${H.transparentize('primary', 0.97)};
		}
	}

	&.${classBase('dragging')} {
		.${classBase('dropzone')} {
			border-color: var(--color-primary);
			background: var(--color-background);
		}
	}

	&.${classBase('preview-multiple')} {
		grid-template-columns: var(--side-preview-size) 1fr;
		grid-template-rows: auto 1fr;
		grid-template-areas:
			'label label'
			'preview dropzone';
		gap: 0 12px;
	}
`;

export const FilePreviewContainer = styled.div`
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	width: 120px;
	height: 120px;

	cursor: pointer;

	.${classBase('file-preview-content')} {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: var(--border-radius);

		svg,
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			background: var(--color-line);
		}
	}

	.${classBase('remove')} {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);

		display: flex;
		align-items: center;
		justify-content: center;

		width: 20px;
		height: 20px;

		background: var(--color-error);
		border-radius: 50%;

		transition: 0.15s;

		opacity: 0;
		transform: translate(40%, -40%);
		pointer-events: none;

		opacity: 1;
		transform: translate(50%, -50%);
		pointer-events: auto;

		svg {
			width: 100%;
			height: 100%;

			object-fit: contain;

			color: #fff;
		}
	}
`;

export const FileListPreviewContainer = styled.div`
	--size: calc(var(--side-preview-size) - 0px);

	grid-area: preview;
	display: flex;
	flex-direction: column;
	gap: 8px;

	border-radius: var(--border-radius);

	width: 100%;
	height: var(--dropzone-height);

	overflow-x: hidden;
	overflow-y: scroll;
	scroll-snap-type: y mandatory;

	&::-webkit-scrollbar {
		display: none;
	}

	.${classBase('file-list-preview-item')} {
		width: var(--size);
		height: var(--size);
		border-radius: var(--border-radius);
		flex-shrink: 0;

		overflow: hidden;

		background: var(--color-line);
		border: 1px solid var(--color-line-dark);

		svg,
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			background: var(--color-line);
		}
	}
`;

export default UploadAreaContainer;
