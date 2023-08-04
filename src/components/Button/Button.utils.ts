import { baseClass } from 'helpers/baseClass';

export const classBase = baseClass('Button');

export function handleRippleEffect(
	event: React.MouseEvent<HTMLButtonElement>,
	parentUniqClass: string
) {
	const button = event.currentTarget;
	const buttonRect = button.getBoundingClientRect();

	const rippleSize = Math.max(buttonRect.width, buttonRect.height);
	const rippleX = event.clientX - buttonRect.left - rippleSize / 2;
	const rippleY = event.clientY - buttonRect.top - rippleSize / 2;

	const ripple = document.createElement('div');

	ripple.className = classBase('ripple');
	ripple.style.top = rippleY + 'px';
	ripple.style.left = rippleX + 'px';
	ripple.style.width = rippleSize + 'px';
	ripple.style.height = rippleSize + 'px';

	const parentClass = '.' + parentUniqClass;

	document.querySelector(parentClass)?.appendChild(ripple);

	setTimeout(() => ripple.remove(), 600);
}
