import { Layout } from './Pagination.types';

import { default as Total } from './components/Layout/Total';
import { default as Pager } from './components/Layout/Pager';
import { default as SpaceBetween } from './components/Layout/SpaceBetween';

export const layout: Record<Layout, () => JSX.Element> = {
	total: Total,
	'-': SpaceBetween,
	pager: Pager,
};
