const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const decodeButton = document.getElementById('decodejwtbtn');
const clearButton = document.getElementById('clearjwtbtn');
const input = document.getElementById('tokeninput');
const result = document.getElementById('tokenresult');
const headers = document.getElementById('tokenheaders');
const alertRow = document.getElementById('alertrow');
const validateButton = document.getElementById('validatejwtbtn');
const algorithm = document.getElementById('algorithmresult');
const secretInput = document.getElementById('secretinput');
const validityResult = document.getElementById('validityresult');

const defaultResultMessage = 'Data goes here...';
const defaultHeaderMessage = 'Headers go here...';

let flag = false; // true means an alert is already present
let decodedToken = null;
let decodedHeader = null;
let token = null;

function removeAlert() {
    if (flag == true) {
        // An alert exists already and we are removing it
        alertRow.removeChild(alertRow.firstChild);
        flag = false;
    }
}

function createAlert(type, message) {
    removeAlert();
    let alert = document.createElement('div');
    alert.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert" id="ourcustomalert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    alertRow.insertBefore(alert, alertRow.firstChild);
    flag = true;
}

decodeButton.addEventListener('click', function () {
    // value works instead of innerHTML or innerText because this is a form element
    token = input.value;
    // === takes into account data type whereas == does not
    if (token === '') {
        let type = 'warning';
        let message = 'Token field cannot be empty!';
        createAlert(type, message);
    } else {
        try {
            decodedToken = jwt_decode(token);
            let decodedTokenJSON = JSON.stringify(decodedToken, null, 4);
            result.innerHTML = decodedTokenJSON;

            decodedHeader = jwt_decode(token, { header: true });
            let decodedHeaderJSON = JSON.stringify(decodedHeader, null, 4);
            headers.innerHTML = decodedHeaderJSON;
            removeAlert();
        } catch (e) {
            if (e.name === 'InvalidTokenError') {
                let type = 'danger';
                let message = 'Token entered is invalid!';
                createAlert(type, message);
                result.innerHTML = defaultResultMessage;
                headers.innerHTML = defaultHeaderMessage;
            }
            else {
                let type = 'danger';
                let message = 'An unknown error has occured! Check logs.';
                createAlert(type, message);
                console.log('Error:', e);
            }
            decodedToken = null;
            decodedHeader = null;
        }
    }
}
);

clearButton.addEventListener('click', function () {
    input.value = '';
    result.innerHTML = defaultResultMessage;
    headers.innerHTML = defaultHeaderMessage;
    removeAlert();
    decodedToken = null;
    decodedHeader = null;
});

validateButton.addEventListener('click', function () {
    let secret = secretInput.value;
    if (decodedHeader == null || decodedToken == null) {
        let type = 'warning';
        let message = 'Please decode a JWT token first!';
        createAlert(type, message);
    } else if (secret === '') {
        let type = 'warning';
        let message = 'Secret field cannot be empty!';
        createAlert(type, message);
    } else {
        removeAlert();
        algorithm.innerHTML = `<strong>${decodedHeader.alg}</strong>`;
        try {
            jwt.verify(token, secret);
            validityResult.innerHTML = '<strong style="color: green">JWT Signature is VALID</strong>';
        } catch (e) {
            switch (e.message) {
                case 'invalid signature':
                    validityResult.innerHTML = '<strong style="color: red">JWT Signature is INVALID</strong>';
                    break;
                case 'jwt expired':
                    validityResult.innerHTML = '<strong style="color: red">JWT Token is EXPIRED</strong>';
                    break;
                default:
                    validityResult.innerHTML = `<strong style="color: red>${e.message}</strong>`;
            }
        }
    }
});