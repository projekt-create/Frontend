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

/* =========================
   WebSocket CHAT
========================= */

// DOM
const chatBox = document.querySelector('.chat');
const messageInput = document.querySelector('#messageInput');
const sendBtn = document.querySelector('#sendBtn');

// Login name olish
const user = JSON.parse(localStorage.getItem('login'));
const userName = user?.name || 'Guest';

// WebSocket ulanish
const socket = new WebSocket("wss://backend-ucmy.onrender.com");

// Ulandi
socket.onopen = () => {
    console.log("✅ WebSocket ulandi");
};

// Xabar kelganda
socket.onmessage = (event) => {
    const data = event.data;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');

    msgDiv.innerHTML = `
        <span class="name">${data.split(':')[0]}</span>
        <p class="message-text">${data.split(':').slice(1).join(':')}</p>
        <span class="time">${new Date().toLocaleTimeString()}</span>
    `;

    // agar o‘zi yuborgan bo‘lsa
    if (data.startsWith(userName + ":")) {
        msgDiv.classList.add('my-message');
    }

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
};

// Yuborish
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    if (messageInput.value.trim() === '') return;

    socket.send(`${userName}: ${messageInput.value}`);
    messageInput.value = '';
}
