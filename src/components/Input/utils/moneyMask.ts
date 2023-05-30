// @ts-ignore
/* eslint-disable prefer-rest-params */
interface Input extends HTMLInputElement {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createTextRange: any;
	maskArgs: MoneyArgs;
	_value: string;
	formatToNumber: () => void;
}

export interface MoneyArgs {
	prefix?: string;
	suffix?: string;
	fixed?: boolean;
	fractionDigits?: number;
	decimalSeparator?: string;
	thousandsSeparator?: string;
	cursor?: string;
}

interface MoneyMaskResponse {
	format: (value: string) => string;
	setMask: (element: Input | string) => Input | undefined;
}

export function inputMask(
	event: React.KeyboardEvent<HTMLInputElement>,
	mask: string
) {
	if (!event) return console.error('Error in mask');
	event.preventDefault();

	const input = event.target as HTMLInputElement,
		value = input.value.replace(/\D/g, '');

	let cursor = input.selectionStart as number,
		cursorFixed = false,
		livre = false,
		j = 0,
		keyCode = 0;
	if (window.event) keyCode = event.keyCode;
	else if (event.which) keyCode = event.which;

	if (cursor < value.length) cursorFixed = true;

	if (keyCode === 16 || keyCode === 19 || (keyCode >= 33 && keyCode <= 40))
		livre = true;

	if (!livre && keyCode !== 8) {
		input.value = '';

		for (let i = 0; i < mask.length; i++) {
			if (mask.substr(i, 1) === '#') {
				input.value += value.substr(j, 1);
				j++;
			} else if (mask.substr(i, 1) !== '#') {
				input.value += mask.substr(i, 1);
			}

			if (keyCode !== 8 && !cursorFixed) cursor++;

			if (j === value.length + 1) break;
		}
	}

	if (cursorFixed && !livre) cursor--;
	input.setSelectionRange(cursor, cursor);
}

export function moneyMask(
	event:
		| React.KeyboardEvent<HTMLInputElement>
		| React.FocusEvent<HTMLInputElement>,
	args: MoneyArgs = {}
) {
	// Verify if key pressed is a number
	// const reg = new RegExp('^[0-9]$'),
	//   isNumber = reg.test(event.key);
	// if (!isNumber) return;
	// --

	const input = event.target as Input;
    const { setMask } = MoneyMask(args);

    setMask(input);
}

export const MoneyMask = (options: MoneyArgs = {}): MoneyMaskResponse => {
	const args = {
		prefix: 'R$ ',
		suffix: '',
		fixed: true,
		fractionDigits: 2,
		decimalSeparator: ',',
		thousandsSeparator: '.',
		cursor: 'end',
		...options,
	};

	function Completer() {
		function get() {
			const size =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: 1;
			return args.fixed ? ''.padEnd(size, '0') : ''.padEnd(size, '_');
		}

		function add(value: string, completer: string, length: number) {
			const start =
				arguments.length > 3 && arguments[3] !== undefined
					? arguments[3]
					: true;
			while (value.length < length) {
				value = start ? '' + completer + value : '' + value + completer;
			}

			return value;
		}

		function remove(value: string, completer: string) {
			const start =
				arguments.length > 2 && arguments[2] !== undefined
					? arguments[2]
					: true;

			const getPosition = () => (start ? 0 : value.length - 1);

			let position = getPosition();

			while (value[position] === completer) {
				value =
					value.substring(0, position - 1) +
					value.substring(position + 1, value.length);
				position = getPosition();
			}

			return value;
		}

		return {
			get,
			add,
			remove,
		};
	}

	function Prefix() {
		function add(value: string) {
			return '' + args.prefix + value;
		}

		function remove(value: string) {
			const position = value.indexOf(args.prefix, 0);

			if (position !== -1) {
				value = value.substring(args.prefix.length, value.length);
			}

			return value;
		}

		return {
			add,
			remove,
		};
	}

	function Suffix() {
		function add(value: string) {
			return '' + value + args.suffix;
		}

		function remove(value: string) {
			const position = value.indexOf(
				args.suffix,
				value.length - args.suffix.length
			);
			if (position !== -1) {
				const start = value.substring(0, position);
				value =
					start +
					value.substring(
						start.length + args.suffix.length - 1,
						value.length - 1
					);
			}

			return value;
		}

		return {
			add,
			remove,
		};
	}

	function extractNumber(value: string) {
		const hasDecimalSeparator = value
			.toString()
			.indexOf(args.decimalSeparator);

		let putDecimalSeparator = false,
			result = '';

		value
			.split('')
			.reverse()
			.forEach((letter) => {
				if (
					isFinite(Number(letter)) ||
					(!args.fixed && letter === '_')
				) {
					result = letter + result;
				} else if (
					hasDecimalSeparator !== -1 &&
					!putDecimalSeparator &&
					letter === args.decimalSeparator
				) {
					result =
						letter.replace(args.decimalSeparator, '.') + result;
					putDecimalSeparator = true;
				}
			});

		return result[0] === '.' ? '0' + result : result;
	}

	function checkNumberStart(value: string, separator: string) {
		return value[0] === separator
			? '' + (args.fixed ? '0' : '_') + value
			: value;
	}

	function textToNumber(value: string) {
		let result = value.toString();
		const completer = Completer().get();

		if (args.prefix) result = Prefix().remove(result);
		if (args.suffix) result = Suffix().remove(result);

		result = extractNumber(result);

		if (result) {
			result = Completer().remove(result, completer);
			result = checkNumberStart(result, '.');
		}

		return result || (args.fixed ? '0' : '');
	}

	function emptyOrInvalid() {
		return (
			'' + Completer().get() + args.decimalSeparator + Completer().get()
		);
	}

	function replaceSeparator(value: string, separator: string) {
		const replacer =
			arguments.length > 2 && arguments[2] !== undefined
				? arguments[2]
				: '';
		return value.replace(new RegExp('\\' + separator, 'g'), replacer);
	}

	function isFloat(number: number) {
		return number % 1 !== 0;
	}

	function addSeparators(value: string) {
		let size = value.length - args.fractionDigits;

		const character = args.fixed ? 'd' : 'w';

		let regexp = '\\,?||\\.?(\\' + character + ')';

		const hundreds = Math.ceil(size / 3);

		let replacement = args.decimalSeparator + '$' + (hundreds + 1);

		for (let i = hundreds; i !== 0; i--) {
			if (size >= 3) {
				regexp = '(\\' + character + '{3})' + regexp;
				size -= 3;
			} else {
				regexp = '(\\' + character + '{' + size + '})' + regexp;
			}

			if (i > 1) {
				replacement = args.thousandsSeparator + '$' + i + replacement;
			} else {
				replacement = '$' + i + replacement;
			}
		}

		Array(hundreds).forEach((_number: number, index: number) => {
			if (size >= 3) {
				regexp = '(\\' + character + '{3})' + regexp;
				size -= 3;
			} else {
				regexp = '(\\' + character + '{' + size + '})' + regexp;
			}

			if (index > 1)
				replacement =
					args.thousandsSeparator + '$' + index + replacement;
			else replacement = '$' + index + replacement;
		});

		return value.replace(new RegExp(regexp), replacement);
	}

	function numberToText(value: string) {
		const completer = Completer().get();
		let result = emptyOrInvalid();

		value = replaceSeparator(value, args.decimalSeparator);

		if (!isNaN(Number(value))) {
			if (isFloat(Number(value))) {
				const number = value.split('.'),
					hundreds = number[0];

				let decimals = number[1];

				decimals = Completer().add(
					decimals || '',
					completer,
					args.fractionDigits
				);

				result = '' + hundreds + decimals;
			} else {
				result = Completer().remove(value, completer);
				result = Completer().add(
					typeof result === 'string' ? result : '',
					completer,
					args.fractionDigits + result.length
				);
			}

			result = addSeparators(result);
			result = checkNumberStart(result, args.decimalSeparator);
		}

		if (args.prefix) {
			result = Prefix().add(result);
		}
		if (args.suffix) {
			result = Suffix().add(result);
		}

		return result;
	}

	function formatToNumber(value: string) {
		let result = 0;

		value = textToNumber(value);

		if (!args.fixed) {
			value = value.replace(new RegExp('_', 'g'), '');
		}

		if (!isNaN(Number(value))) {
			result = parseFloat(value);
		}

		return result;
	}

	function checkSuffix(value: string) {
		let result = '';

		const lastIndex = value.length - 1,
			lastButOneIndex = lastIndex - 1,
			currentLastSuffix = value.substring(
				lastIndex - args.suffix.length + 1,
				lastIndex + args.suffix.length
			),
			currentLastButOneSuffix = value.substring(
				lastButOneIndex - args.suffix.length + 1,
				lastButOneIndex + args.suffix.length
			);

		switch (args.suffix) {
			case currentLastSuffix:
				result = value;
				break;
			case currentLastButOneSuffix:
				const start = value.substring(0, lastButOneIndex);

				result =
					'' +
					start +
					value.substring(
						value.length + args.suffix.length + 1,
						lastButOneIndex + args.suffix.length
					) +
					'.';
				break;
			default:
				result = value.substring(0, lastIndex) + '.';
				break;
		}

		return result;
	}

	function adjustDotPosition(value: string) {
		let fractionDigits = 0,
			result = value.toString();
		result = result.replace('.', '');
		fractionDigits = result.length - args.fractionDigits;
		result =
			result.substring(0, fractionDigits) +
			'.' +
			result.substring(fractionDigits);

		return result;
	}

	function writingToNumber(value: string) {
		let result = value.toString();
		const completer = Completer().get();

		if (args.prefix) {
			result = Prefix().remove(result);
		}

		if (args.suffix) {
			result = checkSuffix(result);
			result = Suffix().remove(result);
		}

		result = extractNumber(result);

		if (result) {
			result = adjustDotPosition(result);

			result = Completer().remove(result, completer);

			result = checkNumberStart(result, '.');
		}

		return result || (args.fixed ? '0' : '');
	}

	function mask(value: string) {
		let result = '' + (writingToNumber(value) || emptyOrInvalid());

		result = replaceSeparator(result, args.decimalSeparator);

		const completer = Completer().get();

		if (!isNaN(Number(Completer().remove(result, completer)))) {
			result = replaceSeparator(result, '.');
			result = Completer().add(
				result || '',
				completer,
				args.fractionDigits
			);
			result =
				args.fractionDigits >= result.length
					? '' + completer + result
					: result;
			result = addSeparators(result);
		}

		if (args.prefix) {
			result = Prefix().add(result);
		}
		if (args.suffix) {
			result = Suffix().add(result);
		}

		return '' + result + '';
	}

	const implanter = {
		getCaretPosition: function getCaretPosition(input: HTMLInputElement) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const doc = document as any;

			let position = -1;

			if ('selectionStart' in input) {
				position = input.selectionStart as number;
			} else if (doc.selection) {
				(input as any).focus();
				const range = doc.selection.createRange();
				const length = doc.selection.createRange().text.length;
				range.moveStart('character', -(input as any).value.length);
				position = range.text.length - length;
			}
			return position;
		},

		setCaretPosition: function setCaretPosition(
			input: Input,
			index: number
		) {
			if (input.setSelectionRange) {
				input.focus();
				input.setSelectionRange(index, index);
			} else if (input.createTextRange) {
				const range = input.createTextRange();
				range.collapse(true);
				range.moveEnd('character', index);
				range.moveStart('character', index);
				range.select();
			}
		},

		indexMove: function indexMove(
			newValue: string,
			oldValue: string,
			index: number
		) {
			switch (true) {
				case oldValue.length < newValue.length:
					return index + 1;
				case oldValue.length > newValue.length:
					return index - 1;
				default:
					return index;
			}
		},

		addPropertyMask: function addPropertyMask(
			input: Input,
			args: MoneyArgs
		) {
			const _this = implanter;
			input.maskArgs = {};

			const _loop = function _loop(k: keyof MoneyArgs) {
				Object.defineProperty(input.maskArgs, k, {
					get: function get() {
						return args[k];
					},
					set: function set(value) {
						args[k] = value;
						_this.refreshMask(input);
					},
				});
			};

			for (const k in args) {
				_loop(k as keyof MoneyArgs);
			}
		},

		addMask: function addMask(input: Input) {
			const _this2 = implanter;

			input.addEventListener('input', function (e: Event) {
				const oldValue = input.value;
				const newValue = mask(oldValue);
				const oldCaretPosition = _this2.getCaretPosition(input);
				let newCaretPosition = _this2.indexMove(
					newValue,
					oldValue,
					oldCaretPosition
				);

				if (input.maskArgs.cursor === 'start') {
					newCaretPosition = 0;
				} else if (input.maskArgs.cursor === 'end') {
					newCaretPosition = newValue.length;
				}

				input.value = newValue;
				input._value = newValue;

				_this2.setCaretPosition(input, newCaretPosition);
				!(e instanceof Event) && _this2.refreshMask(input);
			});
		},

		refreshMask: function refreshMask(input: Input) {
			input.dispatchEvent(new Event('input'));
		},
	};

	function setMask(element: Input | string) {
		if (typeof document === 'undefined')
			throw 'This function only works on client side';

		const input: Input | null =
			typeof element == 'string'
				? document.querySelector(element)
				: element;
		if (!input) return;

		implanter.addPropertyMask(input, args);
		implanter.addMask(input);
		implanter.refreshMask(input);

		input.formatToNumber = function () {
			return formatToNumber(input.value);
		};

		return input;
	}

	function format(value: string) {
		return numberToText(textToNumber(value));
	}

	return {
		format,
		setMask,
	};
};
