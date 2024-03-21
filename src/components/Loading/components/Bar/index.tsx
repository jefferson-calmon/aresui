import React from 'react';

import { LoaderProps, LoadingProps } from 'components/Loading/Loading.types';

import { BarContainer } from './styles';

function Bar(props: LoadingProps & LoaderProps) {
	return (
		<BarContainer
			$width={props.bar?.width ?? props.size ?? 150}
			$height={props.bar?.height ?? 5}
			$duration={props.duration ?? 1.5}
		>
			<div className="bar" />
		</BarContainer>
	);
}

export default Bar;
