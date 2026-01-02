// Login Dom elements
const login = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const loginName = document.querySelector('#Name');
const loginPassword = document.querySelector('#password');

// Telegram Dom elements
const telegram = document.querySelector('.telegram');

// Check login
const savedLogin = localStorage.getItem('login');

if (savedLogin) {
    login.style.display = 'none';
    telegram.style.display = 'flex';
} else {
    login.style.display = 'flex';
    telegram.style.display = 'none';
}


// Login event
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (loginName.value.trim() === '' || loginPassword.value.trim() === '') {
        loginName.style.border = '1px solid red';
        loginPassword.style.border = '1px solid red';
        return;
    }

    const loginData = {
        name: loginName.value.trim(),
        password: loginPassword.value.trim()
    };

    localStorage.setItem('login', JSON.stringify(loginData));

    // LOGIN → TELEGRAM
    login.style.display = 'none';
    telegram.style.display = 'flex';
});

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
    const joinMessage = `${userName} joined the chat`;
    socket.send(joinMessage);
};

// Chiqdi
socket.onclose = () => {
    const leaveMessage = `${userName} left the chat`;
    socket.send(leaveMessage);
};

// Xabar kelganda
socket.onmessage = (event) => {
    const data = event.data;

    const [sender, ...text] = data.split(':');
    const messageText = text.join(':').trim();

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');

    // agar o‘zing bo‘lsang
    if (sender === userName) {
        msgDiv.classList.add('my-message');
    }

    msgDiv.innerHTML = `
        <span class="name">${sender}</span>
        <p class="message-text">${messageText}</p>
        <span class="time">${new Date().toLocaleTimeString()}</span>
    `;

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
