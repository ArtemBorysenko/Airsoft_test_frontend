document.getElementById('your-id').addEventListener('click', async function () {
  let data = {
    'username' : document.getElementById('username').value,
    'password' : document.getElementById('password').value
  };

 let accessToken = await sendData("http://localhost:3000/login", data);


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

  socket.on('1', function (role) {
    console.log('YOUR ROLE: ' + role);
  });

  socket.on('Manager_is_reg', function (msg) {
    console.log('Message for Admin: Manager is registered' + msg);

    let div = document.createElement('DIV');
    let b = document.createElement( 'B');
    b.textContent = token.username;
    let text = document.createTextNode(token.role);
    div.appendChild(b);
    div.appendChild(text);
    $('.chat').append('<li>Message for Admin: Manager is registered</li>');
  });

  socket.on('Player_is_approved', function (msg) {
    console.log('Message for Admin and Player: Player is approved' + msg);

    let div = document.createElement('DIV');
    let b = document.createElement( 'B');
    b.textContent = token.username;
    let text = document.createTextNode(token.role);
    div.appendChild(b);
    div.appendChild(text);
    $('.chat').append('<li>Message for Admin and Player: Player is approved</li>');
  });

  socket.on('Player_switch_team', function (msg) {
    console.log('Message for Admin and Manager: Player want switch team' + msg);

    let div = document.createElement('DIV');
    let b = document.createElement( 'B');
    b.textContent = token.username;
    let text = document.createTextNode(token.role);
    div.appendChild(b);
    div.appendChild(text);
    $('.chat').append('<li>Message for Admin and Manager: Player want switch team</li>');
  });

  socket.on('Player_is_deleted', function (msg) {
    console.log('Message for Admin and Player: Player is deleted with team' + msg);

    let div = document.createElement('DIV');
    let b = document.createElement( 'B');
    b.textContent = token.username;
    let text = document.createTextNode(token.role);
    div.appendChild(b);
    div.appendChild(text);
    $('.chat').append('<li>Message for Admin and Player: Player is deleted with team</li>');
  });

//------------------=============================================------------------
//TODO: fix console.log debug

  socket.on('connect', function () {
    socket.emit('adduser', window.localStorage.token);
  });

socket.on('updateName', function (token) {
  console.log('updateName: ', token);

  let div = document.createElement('DIV');
  let b = document.createElement( 'B');
  b.textContent = token.username;
  let text = document.createTextNode(token.role);
  div.appendChild(b);
  div.appendChild(text);
  $('.username').text(`NAME: ${token.username} ROLE: ${token.role}`);
});

  socket.on('updateUsers', function (users) {
    console.log('updateusers: ', users);

    $('.online').empty();
    for (let i in users) {
        $('.online').append(`<li class="users__item">${users[i].name} ${users[i].role}</li>`);
    }
  });

});

async function sendData(url, data) {

  const xhr = new XMLHttpRequest();

  xhr.open("POST", url);

  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(JSON.stringify(data));


  console.log(JSON.stringify(data));
  //xhr.setRequestHeader("Authorization", `Bearer ${window.localStorage.token.token}`);

  xhr.onload = async function () {
    const status = xhr.status;
    console.log('status ' + status);
    const data = xhr.responseText;
    window.localStorage.token = JSON.parse(data).token;
    document.getElementById('token').innerText = data;
    //document.getElementById('token').innerText = `token: ${JSON.parse(data).token}`;
  };
}
