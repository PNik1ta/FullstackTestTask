export const formatPhoneNumber = (value: string) => {
	const phoneNumber = value.replace(/\D/g, '');
	const maxDigits = 6;
	const formattedPhoneNumber = phoneNumber.slice(0, maxDigits);
	const formattedValue = formattedPhoneNumber
	  .replace(/(\d{2})(\d)/, '$1-$2')
	  .replace(/(\d{2})(\d)/, '$1-$2')
	  .replace(/(\d{2})(\d)/, '$1-$2');
	return formattedValue;
 };