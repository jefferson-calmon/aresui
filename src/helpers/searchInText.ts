export function searchInText(search: string | number, string: string | number) {
	const string1 = string.toString().toLowerCase();
	const string2 = search.toString().toLowerCase();

	return string1.search(string2) >= 0;
}
