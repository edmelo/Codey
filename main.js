let view = document.getElementById('view-button');
let close = document.getElementById('close-button');
let codey = document.getElementById('codey');

let open = function() {
  codey.style.display = 'block';
  close.style.display = 'block';
};

let hide = function() {
  codey.style.display = 'none';
  close.style.display = 'none';
};

view.addEventListener('click', open);
close.addEventListener('click', hide);

// Escreva seu código aqui
function textChange(){
  view.innerHTML = 'Olá, Mundo!';
}

function textReturn(){
  view.innerHTML = 'Visualizar';
}

view.addEventListener('click', textChange);
close.addEventListener('click', textReturn);