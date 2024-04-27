import React from 'react';

import * as Utils from '../../Table.utils';

import { NotFoundMessageContainer } from './styles';

function NotFoundMessage() {
	return (
		<NotFoundMessageContainer className={Utils.classBase('no-data')}>
			<p>Nenhum dado encontrado para ser mostrado</p>
		</NotFoundMessageContainer>
	);
}

export default NotFoundMessage;
