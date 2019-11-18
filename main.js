document.getElementById('your-id').addEventListener('click', function () {
  let data = {
    'username' : document.getElementById('username').value,
    'password' : document.getElementById('password').value
  };

  sendData("http://localhost:3000/login", data)
});

function sendData(url, data) {

  const xhr = new XMLHttpRequest();

  xhr.open("POST", url);

  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(JSON.stringify(data));


  console.log(JSON.stringify(data));
  //xhr.setRequestHeader("Authorization", `Bearer ${window.localStorage.token.token}`);

  xhr.onload = function () {
    const status = xhr.status;
    console.log('status ' + status);
    const data = xhr.responseText;
    window.localStorage.token = JSON.parse(data).token;
    document.getElementById('token').innerText = data;
    //document.getElementById('token').innerText = `token: ${JSON.parse(data).token}`;
  };
}

//--------------------------------------================================================-------------------------------------

// создаем соединение
const socket = io();

window.socket = socket;

socket.on('message', () => {

  let text = '';

  const result = document.getElementById('subscribe');
  const messageElem = document.createElement('div');
  messageElem.textContent = text;
  result.appendChild(messageElem);
});

socket.on('1', function (msg) {
  console.log('YOUR ROLE: ' + msg);
});


socket.on('connect', function () {
  console.log(socket)
 // socket.emit('adduser', window.localStorage.token);
});

socket.on('Manager_is_reg', function (msg) {
  console.log('Message for Admin: Manager is registered' + msg);
});

socket.on('Player_is_approved', function (msg) {
  console.log('Message for Admin and Player: Player is approved' + msg);
});

socket.on('Player_switch_team', function (msg) {
  console.log('Message for Admin and Manager: Player want switch team' + msg);
});

socket.on('Player_is_deleted', function (msg) {
  console.log('Message for Admin and Player: Player is deleted with team' + msg);
});

//------------------=============================================------------------
//TODO: fix console.log debug

socket.on('updatechat', function (data) {
  console.log('updatechat: ', data);
  // добавляем сообщение в чат
  let div = document.createElement('DIV');
  let b = document.createElement('B');
  b.textContent = data.name;
  let text = document.createTextNode(data.msg);
  div.appendChild(b);
  div.appendChild(text);
  $('.chat').prepend(div);
});