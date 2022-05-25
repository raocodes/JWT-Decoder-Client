import jwt_decode from './jwt-decode.js';

const decodebutton = document.getElementById('decodejwtbtn');
const clearbutton = document.getElementById('clearjwtbtn');
const input = document.getElementById('tokeninput');
const result = document.getElementById('tokenresult');

decodebutton.addEventListener('click', function () {
	// value works instead of innerHTML or innerText because this is a form element
	let token = input.value;
	// === takes into account data type whereas == does not
	if (token === '') {
		console.log('The field is empty');
	} else {
		try {
			let decoded = jwt_decode(token);
			let myJSON = JSON.stringify(decoded, null, 4);
			console.log(myJSON);
			result.textContent = myJSON;

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
