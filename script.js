const containerVideos = document.querySelector('.videos__container');

async function buscaEMostraVideos() {
    try {
        const busca = await fetch('http://localhost:3000/videos');
        const videos = await busca.json();
        videos.forEach((video) => {
            if (video.categoria === '') {
                throw new Error('Vídeo sem categoria');
            };
            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>`
        });
    } catch (e) {
        containerVideos.innerHTML = `
            <p>Houve um erro ao carregar os vídeos: ${e}</p>`;
    }
}

buscaEMostraVideos();

const barraPesquisa = document.querySelector('.pesquisar__input');

barraPesquisa.addEventListener('input', filtraPesquisa);

function filtraPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    let valorFiltro = barraPesquisa.value.toLowerCase();

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
}

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => filtraPorCategoria(nomeCategoria));
});

function filtraPorCategoria(filtro) {
    const videos = document.querySelectorAll('.videos__item');
    let valorFiltro = filtro.toLowerCase();

    videos.forEach((video) => {
        const categoria = video.querySelector('.categoria').textContent.toLowerCase();
        video.style.display = !categoria.includes(valorFiltro) && valorFiltro != 'tudo' ? 'none' : 'block';
    });
}