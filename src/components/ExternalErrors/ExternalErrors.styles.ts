import styled, { StyledComponent } from 'styled-components';

import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';

interface Props {
	theme: Theme;
}

type StyledType = StyledComponent<'div', any, Props, never>;

export const ExternalErrorsContainer: StyledType = styled.div`
	${(props: Props) => globalStyle(props.theme)}

	display: flex;
	flex-direction: column;
	gap: 0.4em;

	span {
		display: flex;

		color: var(--color-error);
		font-size: 1.4em;
		font-weight: 400;
	}

	@media (max-width: 768px) {
		.errors {
			span.error {
				font-size: 13px;
			}
		}
	}
`;

export default ExternalErrorsContainer;
