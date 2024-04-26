const generateBtn = document.querySelector('form button');
const qrCodeBox = document.querySelector('.qr-code');
const qrInput = document.querySelector('form input');
const qrImage = document.querySelector('#imageCode');

generateBtn.addEventListener('click', () => {
	let qrValue = qrInput.value;

	if (!qrValue) {
		return alert('لطفا متن یا آدرسی را وارد کنید.');
	}
	generateBtn.innerHTML = 'در حال تولید QR کد';
	qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
	qrImage.addEventListener('load', () => {
		qrCodeBox.classList.remove('hidden');
		generateBtn.innerHTML = 'تولید QR کد';
	});
});
qrInput.addEventListener('keyup', () => {
	if (!qrInput.value) {
		qrCodeBox.classList.add('hidden');
	}
});
