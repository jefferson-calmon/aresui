import styled from 'styled-components';

import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';
import { Width } from 'types';

interface Props {
	$theme: Theme;
	$width?: Width;
}

export const PaginationContainer = styled.div`
	${(props: Props) => globalStyle(props.$theme)}

	display: flex;
	align-items: center;
	gap: 12px;

	width: ${(props: Props) => props.$width ?? '100%'};
`;
