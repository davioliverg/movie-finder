# 🎬 Movie Finder

Aplicação web para buscar filmes e visualizar informações detalhadas — pôster, sinopse, nota, elenco, trailer e plataformas de streaming disponíveis — utilizando a API do TMDB (The Movie Database).

## 🚀 Funcionalidades

- Busca de filmes por nome (via clique ou tecla Enter)
- Exibição de múltiplos resultados em grade responsiva
- Modal com detalhes do filme:
  - Elenco principal
  - Plataformas de streaming disponíveis no Brasil (com link)
  - Trailer incorporado do YouTube
- Tratamento de erros (busca sem resultados, dados indisponíveis)
- Tema escuro inspirado em serviços de streaming

## 🛠️ Tecnologias utilizadas

- HTML5 semântico
- CSS3 (Flexbox, variáveis de cor, pseudo-classes)
- JavaScript (Vanilla JS — sem frameworks)
- API do TMDB (The Movie Database)
- Git e GitHub para controle de versão

## 📸 Demonstração

<img width="1919" height="982" alt="image" src="https://github.com/user-attachments/assets/b751d229-3d76-4e3d-b329-7db9e59b9824" />


## 💻 Como rodar o projeto localmente

1. Clone este repositório
2. Crie uma conta gratuita em [themoviedb.org](https://www.themoviedb.org/) e gere sua própria API Key
3. Crie um arquivo `config.js` na raiz do projeto com o conteúdo:
```js
   const API_KEY = "sua_chave_aqui";
```
4. Abra o arquivo `index.html` no navegador

## 🧠 Aprendizados

Este projeto foi desenvolvido como forma de praticar, na prática, conceitos fundamentais de desenvolvimento web: manipulação do DOM, consumo de APIs REST, requisições assíncronas (fetch/Promises), organização de código e boas práticas de segurança (proteção de chaves de API).

## 👤 Autor

Davi Oliveira
