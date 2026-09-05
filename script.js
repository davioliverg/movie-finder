let inputElemento = document.getElementById("searchInput");
let botao = document.getElementById("searchButton");
let main = document.getElementById("resultados");

function buscarFilme() {
    let textoDigitado = inputElemento.value;

    fetch("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + textoDigitado + "&language=pt-BR")
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            main.innerHTML = "";

            if (dados.results.length === 0) {
                let mensagem = document.createElement("p");
                mensagem.textContent = "Nenhum filme encontrado. Tente outra busca.";
                main.appendChild(mensagem);
            } else {

                for (let i = 0; i < dados.results.length; i++) {
                    let filme = dados.results[i];

                    let article = document.createElement("article");

                    let img = document.createElement("img");
                    img.src = "https://image.tmdb.org/t/p/w200" + filme.poster_path;
                    img.alt = "poster do filme " + filme.title;
                    img.className = "poster";

                    let divInfo = document.createElement("div");

                    let titulo = document.createElement("h2");
                    titulo.textContent = filme.title;
                    divInfo.appendChild(titulo);

                    let sinopse = document.createElement("p");
                    sinopse.textContent = filme.overview;
                    divInfo.appendChild(sinopse);

                    let nota = document.createElement("p");
                    nota.textContent = "Nota: " + filme.vote_average;
                    divInfo.appendChild(nota);

                    let ano = document.createElement("p");
                    ano.textContent = "Ano: " + filme.release_date;
                    divInfo.appendChild(ano);

                    article.appendChild(img);
                    article.appendChild(divInfo);
                    main.appendChild(article);
                }
            }
            });
}

botao.addEventListener("click", function () {
    buscarFilme();
});

inputElemento.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        buscarFilme();
    }
});