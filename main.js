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
  console.log('User say: ' + msg);
});


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
  // xhr.setRequestHeader("Authorization", `Bearer ${window.localStorage.token.token}`);

  xhr.onload = function () {
    const status = xhr.status;
    console.log('status ' + status);
    const data = xhr.responseText;
    window.localStorage.token = JSON.parse(data).token
  };

}

// $.ajaxSetup({
//   beforeSend: function (xhr)
//   {
//     xhr.setRequestHeader("Accept","application/vvv.website+json;version=1");
//     xhr.setRequestHeader("Authorization","Token token=\"FuHCLyY46\"");
//   }
// });

//==========================-=--------------------------------------======================================

// socket.on('connect', function () {
//   // брать у пользователя jwt
//   socket.emit('adduser', prompt('Как вас зовут?'));// tocken
// });

// когда POST на /log если  это Админ дать ему JWToken, тогда создается соединение
// когда POST на /log если  это Менеджер дать ему JWToken, тогда создается соединение
// когда POST на /log если  это Игрок дать ему JWToken, тогда создается соединение
// const Admins = { все админы которые в сети }
// const Managers = { все менеджеры которые в сети }
// const Players = { все игроки которые в сети }

socket.on('Player_switch_team', function () {
  // При запросе от участника на добавление, удаления с команды или переход
  // в соседнюю команду, менеджер и админ должны получать оповещение
  // Если Админ и Менеджер в сети тогда он получает уводомление JWT.user_role === ( 'Admin' || 'Manager' )
  console.log('Player_switch_team');
});

socket.on('Manager_is_reg', function () {
  // При регистрации нового менеджера, админ должен получать оповещение на подтверждение
  // POST на /registration user_role === 'Manager'
  // Если Админ в сети тогда он получает уводомление JWT.user_role === 'Admin'
  //
  // ? тогда создается соединение
  console.log('Manager_is_reg');
});

socket.on('Player_is_approved', function () {
  // ри подтверждении менеджером на добавление, удаления участника с команды
  // или его переход в соседнюю команду, участник и админ должны получать оповещение
  console.log('Player_is_approved');
});