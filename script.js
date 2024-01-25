'use strict';

window.addEventListener('load', initPage)

function initPage() {
    // Gömma #registerForm och #contentContainer.
    document.querySelector('#registerForm').classList.add('d-none');
    document.querySelector('#contentContainer').classList.add('d-none');

    //Lägga till lyssnare på knapparna i formuläret och agera utifrån användarens knapptryck.
    let loginBtn = document.querySelector('#loginBtn');
    loginBtn.addEventListener('click', () => {
        event.preventDefault();
        validateLogin()
    });

    let regBtn = document.querySelector('#regBtn');
    regBtn.addEventListener('click', (event) => {
        event.preventDefault();
        changeToRegister(event)
    });

}

function validateLogin(event) {
    // event.preventDefault();
    //Utföra formulärvalidering för att logga in.
    try {
        let username = document.querySelector('#username');
        let password = document.querySelector('#password');
        let errorMsg = document.querySelector('#errorMsg');
        if (!users.some(user => user.username === username.value)) {
            throw {
                'msg': 'Användaren hittades inte i databasen!'
            };
        } else if (!users.some(user => user.password === password.value)) {
            throw {
                'msg': 'fel angivet lösenord!'
            };
        } else {
            console.log('success!')
            errorMsg.innerHTML = '';
            initContent()
        }
    } catch (error) {
        console.log(error);
        errorMsg.innerHTML = error.msg;
    }
}

function changeToRegister(event) {
    // event.preventDefault();
    let errorMsg = document.querySelector('#errorMsg');
    errorMsg.innerHTML = '';
    document.querySelector('#loginForm').classList.add('d-none');
    document.querySelector('#registerForm').classList.remove('d-none');
    document.querySelector('#regBtnTwo');
    document.querySelector('#regBtnTwo').addEventListener('click', validateRegistration);
}


function validateRegistration(event) {
    event.preventDefault();
    //Utföra formulärvalidering för att registrera en ny användare.
    // För att registrera sig behöver användaren:
    // Ange ett användarnamn som är minst 6 tecken långt.
    // Ange ett lösenord som är minst 8 tecken långt (bonusuppgift: lösenordet skall både innehålla stora och små bokstäver, samt minst en siffra).
    // Ange samma lösenord två gånger.

    try {
        let username = document.querySelector('#uName').value;
        let password = document.querySelector('#pWord').value;
        let passwordAgain = document.querySelector('#pWordAgain').value;
        let errorMsg = document.querySelector('#errorMsg');
        let passwordRegex = /^(?=.*[a-ö])(?=.*[A-Ö])(?=.*\d).{8,}$/;

        if (username.length < 6 || username.length > 20) {
            throw {
                'nodeRef': document.querySelector('#uName'),
                'msg': 'Användarnamnet måste vara mellan 6 och 20 tecken långt.'
            };
        } else if (password.length < 8) {
            throw {
                'nodeRef': document.querySelector('#pWord'),
                'msg': 'Lösenordet måste vara minst 8 tecken långt.'
            };
        } else if (!passwordRegex.test(password)) {
            throw {
                'nodeRef': document.querySelector('#pWord'),
                'msg': 'Lösenordet måste både innehålla stora och små bokstäver samt minst en siffra.'
            };
        } else if (password !== passwordAgain) {
            throw {
                'nodeRef': document.querySelector('#pWordAgain'),
                'msg': 'Lösenordet matchar inte.'
            }
        } else {
            console.log('success!')
            errorMsg.innerHTML = '';
            initContent()
        }
    } catch (error) {
        error.nodeRef.focus();
        console.log(error);
        errorMsg.textContent = error.msg;
    }
}


function initContent() {
    document.querySelector('#loginForm').classList.add('d-none');
    document.querySelector('#registerForm').classList.add('d-none');
    document.querySelector('#contentContainer').classList.remove('d-none');
}

function logOut() {

}