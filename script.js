const nameInput = document.getElementById('name');
const link = document.getElementById('link');
const iframe = document.querySelector('.iframe');
const btn = document.querySelector('.add');
const Container = document.querySelector('.container');
const Org = document.querySelector('.orga');
const fullScreenBtn = document.querySelector('.max')
const addOne = document.querySelector('.addone')

// Função para carregar as divs salvas no LocalStorage ao iniciar a página
window.onload = () => {
    const savedDivs = JSON.parse(localStorage.getItem('divs')) || [];
    savedDivs.forEach(item => {
        createDiv(item.name, item.link);
    });
};

addOne.addEventListener('click',() => {
    document.querySelector('.create').classList.add('show')
})

// Função para adicionar uma nova div e salvar no LocalStorage
function handleAdd() {
    const name = nameInput.value;
    const url = link.value;

    // Adicionar nova div
    createDiv(name, url);

    // Salvar a nova div no LocalStorage
    let savedDivs = JSON.parse(localStorage.getItem('divs')) || [];
    savedDivs.push({ name, link: url });
    localStorage.setItem('divs', JSON.stringify(savedDivs));
}

// Função para criar uma div com o nome e link fornecidos
function createDiv(name, link) {
    let div = document.createElement('div');
    div.classList.add('box');
    
    // Adiciona o nome como texto dentro da div
    let nameDiv = document.createElement('div');
    nameDiv.textContent = name;
    div.appendChild(nameDiv);
    
    let divInside = document.createElement('div');
    divInside.classList.add('divinside');

    // Botão "View" para visualizar o link no iframe
    let view = document.createElement('button');
    view.classList.add('view');
    view.textContent = 'View';
    view.addEventListener('click', (e) => {
        const storedLink = e.target.closest('.box').getAttribute('data-link'); // Recupera o link armazenado
        iframe.src = storedLink; // Atualiza o iframe com o link recuperado
    });

    // Botão "Delete" para excluir a div
    let del = document.createElement('button');
    del.textContent = 'X';
    del.classList.add('del');
    del.addEventListener('click', (e) => {
        const mainDiv = e.target.closest('.box');
        mainDiv.remove();

        // Remove do LocalStorage
        let savedDivs = JSON.parse(localStorage.getItem('divs')) || [];
        savedDivs = savedDivs.filter(item => item.name !== name); // Remove a div do array no LocalStorage
        localStorage.setItem('divs', JSON.stringify(savedDivs)); // Atualiza o LocalStorage
    });

    divInside.appendChild(view);
    divInside.appendChild(del);
    div.appendChild(divInside);
    div.setAttribute('data-link', link); // Armazena o link na div

    Org.appendChild(div); // Adiciona a div dentro da div "orga"
}

fullScreenBtn.addEventListener('click', () => {
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen(); // Deixa o iframe em tela cheia
    } else if (iframe.mozRequestFullScreen) { // Suporte para Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Suporte para Chrome, Safari e Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // Suporte para IE/Edge
        iframe.msRequestFullscreen();
    }  else {
        console.log('Fullscreen API not supported.');
    }
});


// Evento para o botão de adicionar
btn.addEventListener('click', handleAdd);
document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.create').classList.remove('show')
})
