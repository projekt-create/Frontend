// Login Dom elements
const login = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const loginName = document.querySelector('#Name');
const loginPassword = document.querySelector('#password');

// Telegram Dom elements
const telegram = document.querySelector('.telegram');

// Check login
if(localStorage.getItem('login') !== null){
    login.style.display = 'none';
    telegram.style.display = 'flex';
}else{
    login.style.display = 'flex';
    telegram.style.display = 'none';
}

// Login event
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if(loginName.value.trim() === '' || loginPassword.value.trim() === ''){
        loginName.style.border = '1px solid red';
        loginPassword.style.border = '1px solid red';
        setTimeout(() => {
            loginName.style.border = '1px solid hsla(0, 0%, 100%, 0.00)';
            loginPassword.style.border = '1px solid hsla(0, 0%, 100%, 0.00)';
        },1000)
    }else{
        const loginData = {
            name: loginName.value.trim(),
            password: loginPassword.value.trim()
        };
        localStorage.setItem('login', JSON.stringify(loginData));
        loginName.style.border = '1px solid green';
        loginPassword.style.border = '1px solid green';

        setTimeout(() => {
            loginName.style.border = '1px solid hsla(0, 0%, 100%, 0.00)';
            loginPassword.style.border = '1px solid hsla(0, 0%, 100%, 0.00)';
            loginName.value = '';
            loginPassword.value = '';
            login.style.opacity = '1';
            login.style.transition = 'opacity 1s ease-in-out';
            setTimeout(() => {
                login.style.opacity = '0';
                login.style.transition = 'opacity 1s ease-in-out';
                setTimeout(() => {
                    login.style.display = 'none';
                },1000)
            },1000)
        },1000)
    }
});