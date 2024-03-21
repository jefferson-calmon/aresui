/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';

interface Props {
	$theme: Theme;
}

export const LoadingContainer = styled.div`
	${(props: Props) => globalStyle(props.$theme)}
`;

export default LoadingContainer;
