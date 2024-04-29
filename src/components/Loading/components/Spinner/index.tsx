import React from 'react';

import { LoaderProps } from 'components/Loading/Loading.types';
import { classBase } from 'components/Loading/Loading.utils';

import { SpinnerContainer } from './styles';

function Spinner(props: LoaderProps) {
	return (
		<SpinnerContainer
			className={classBase('spinner')}
			$duration={props.duration}
			$size={props.size}
		>
			<svg viewBox="0 0 50 50">
				<circle
					className={classBase('spinner-path')}
					cx={25}
					cy={25}
					r={20}
					fill="none"
					strokeWidth={props.spinner?.strokeWidth}
					stroke={props.theme.colors?.primary}
				/>
			</svg>
		</SpinnerContainer>
	);
}

export default Spinner;
