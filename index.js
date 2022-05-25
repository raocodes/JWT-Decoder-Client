const decodebutton = document.getElementById('decodejwtbtn');
const clearbutton = document.getElementById('clearjwtbtn');
const input = document.getElementById('tokeninput');
const result = document.getElementById('tokenresult');
const headers = document.getElementById('tokenheaders');

// TODO: Get rid of console logs and use better alerts
decodebutton.addEventListener('click', function () {
	// value works instead of innerHTML or innerText because this is a form element
	let token = input.value;
	// === takes into account data type whereas == does not
	if (token === '') {
		console.log('The field is empty');
	} else {
		try {
			// eslint-disable-next-line no-undef
			let decoded = jwt_decode(token);
			let decodedJSON = JSON.stringify(decoded, null, 4);
			result.textContent = decodedJSON;

			// eslint-disable-next-line no-undef
			var decodedHeader = jwt_decode(token, { header: true });
			let decodedHeaderJSON = JSON.stringify(decodedHeader, null, 4);
			headers.textContent = decodedHeaderJSON;
		} catch (e) {
			if (e.name === 'InvalidTokenError') {
				console.log('The token is invalid!');
				console.log('Error:', e);
			}
			else {
				console.log('Another error has occured', e);
				console.log('Error:', e);
			}
		}
	}
}
);

clearbutton.addEventListener('click', function () {
	input.value = '';
	result.textContent = 'Output goes here...';
});
