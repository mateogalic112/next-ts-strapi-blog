/**
 * Get difference between passed date and now.
 *
 * @param {date} date
 * @return {number} 1 | 2 | 3
 */
export const getDaysDiff = (date: Date | undefined): number => {
	if (!date) return 0;
	const today = new Date();
	const parsedDate = new Date(date);
	const diffTime = Math.abs(today.getTime() - parsedDate.getTime());
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
