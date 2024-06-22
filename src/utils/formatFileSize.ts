export function formatFileSize(fileSizeInBytes: number): string {
	if (fileSizeInBytes < 1024) {
		return fileSizeInBytes + 'B';
	} else if (fileSizeInBytes < 1024 * 1024) {
		const fileSizeInKB = fileSizeInBytes / 1024;
		return fileSizeInKB.toFixed(1) + 'KB';
	} else if (fileSizeInBytes < 1024 * 1024 * 1024) {
		const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
		return fileSizeInMB.toFixed(1) + 'MB';
	} else {
		const fileSizeInGB = fileSizeInBytes / (1024 * 1024 * 1024);
		return fileSizeInGB.toFixed(1) + 'GB';
	}
}
