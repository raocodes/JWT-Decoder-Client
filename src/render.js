const jwt_decode = require('jwt-decode');

const decodebutton = document.getElementById('decodejwtbtn');
const clearbutton = document.getElementById('clearjwtbtn');
const input = document.getElementById('tokeninput');
const result = document.getElementById('tokenresult');
const headers = document.getElementById('tokenheaders');
const alertcolumn = document.getElementById('alertcolumn');

let flag = false; // true means an alert is already present

function removeAlert(){
    if(flag == true){
        // An alert exists already and we are removing it
        alertcolumn.removeChild(alertcolumn.firstChild);
        flag = false;
    }
}

function createAlert(type, message){
    removeAlert();
    let alert = document.createElement('div');
    alert.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert" id="ourcustomalert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    alertcolumn.insertBefore(alert, alertcolumn.firstChild);
    flag = true;
}

decodebutton.addEventListener('click', function () {
    // value works instead of innerHTML or innerText because this is a form element
    let token = input.value;
    // === takes into account data type whereas == does not
    if (token === '') {
        let type = 'warning';
        let message = 'Text area cannot be empty!';
        createAlert(type, message);
    } else {
        try {
            let decoded = jwt_decode(token);
            let decodedJSON = JSON.stringify(decoded, null, 4);
            result.textContent = decodedJSON;

            var decodedHeader = jwt_decode(token, { header: true });
            let decodedHeaderJSON = JSON.stringify(decodedHeader, null, 4);
            headers.textContent = decodedHeaderJSON;
            removeAlert();
        } catch (e) {
            if (e.name === 'InvalidTokenError') {
                let type = 'danger';
                let message = 'Token entered is invalid!';
                createAlert(type, message);
                result.textContent = '-';
                headers.textContent = '-';
            }
            else {
                let type = 'danger';
                let message = 'An unknown error has occured! Check logs.';
                createAlert(type, message);
                console.log('Error:', e);
            }
        }
    }
}
);

clearbutton.addEventListener('click', function () {
    input.value = '';
    result.textContent = 'Data goes here...';
    headers.textContent = 'Headers go here...';
    removeAlert();
});