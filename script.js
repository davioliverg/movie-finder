let inputElemento = document.getElementById("searchInput");
let botao = document.getElementById("searchButton");
let main = document.getElementById("resultados");

let fecharModal = document.getElementById("fecharModal");

fecharModal.addEventListener("click", function () {
    let modal = document.getElementById("modal");
    modal.className = "modal-escondido";
});

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
                    article.addEventListener("click", function () {
                        abrirModal(filme);
                    });
                    article.style.cursor = "pointer";

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
                    sinopse.className = "sinopse";
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
function abrirModal(filme) {
    let modal = document.getElementById("modal");
    let modalTitulo = document.getElementById("modalTitulo");

    modalTitulo.textContent = filme.title;

    modal.className = "modal-visivel";

    fetch("https://api.themoviedb.org/3/movie/" + filme.id + "/credits?api_key=" + API_KEY + "&language=pt-BR")
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dadosElenco) {
            let nomesElenco = "";

            for (let i = 0; i < 5; i++) {
                let ator = dadosElenco.cast[i];
                nomesElenco = nomesElenco + ator.name + " (" + ator.character + "), ";
            }

            let modalElenco = document.getElementById("modalElenco");
            modalElenco.textContent = "Elenco: " + nomesElenco;
        });

    fetch("https://api.themoviedb.org/3/movie/" + filme.id + "/watch/providers?api_key=" + API_KEY)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dadosPlataformas) {
            let modalPlataformas = document.getElementById("modalPlataformas");
            modalPlataformas.innerHTML = "";

            if (dadosPlataformas.results.BR && dadosPlataformas.results.BR.flatrate) {
                let listaFlatrate = dadosPlataformas.results.BR.flatrate;
                let linkPagina = dadosPlataformas.results.BR.link;

                for (let i = 0; i < listaFlatrate.length; i++) {
                    let plataforma = listaFlatrate[i];

                    let link = document.createElement("a");
                    link.href = linkPagina;
                    link.target = "_blank";

                    let logo = document.createElement("img");
                    logo.src = "https://image.tmdb.org/t/p/w45" + plataforma.logo_path;
                    logo.alt = plataforma.provider_name;
                    logo.className = "logo-plataforma";

                    link.appendChild(logo);
                    modalPlataformas.appendChild(link);
                }
            } else {
                modalPlataformas.textContent = "Não disponível em plataformas de streaming no Brasil no momento.";
            }
        });
    fetch("https://api.themoviedb.org/3/movie/" + filme.id + "/videos?api_key=" + API_KEY + "&language=pt-BR")
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(dadosVideos) {
        let modalTrailer = document.getElementById("modalTrailer");
        modalTrailer.innerHTML = "";

        let trailerEncontrado = null;

        for (let i = 0; i < dadosVideos.results.length; i++) {
            if (dadosVideos.results[i].type === "Trailer") {
                trailerEncontrado = dadosVideos.results[i];
                break;
            }
        }

        if (trailerEncontrado) {
            let iframe = document.createElement("iframe");
            iframe.src = "https://www.youtube.com/embed/" + trailerEncontrado.key;
            iframe.width = "100%";
            iframe.height = "300";
            iframe.allowFullscreen = true;
            modalTrailer.appendChild(iframe);
        } else {
            modalTrailer.textContent = "Trailer não disponível.";
        }
    });
}