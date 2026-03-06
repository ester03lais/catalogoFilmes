const API_KEY = "a3fda9b9d1d0aaee95df37313c16684e"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa"); 
const filmesGrid = document.getElementById("filmesGrid");
const inicio = document.getElementById("inicio");
const filmes = document.getElementById("filmes");
const series = document.getElementById("series");

async function requisicaoURL(url) {
    try { 
        filmesGrid.classList.add("fade-out")
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erro na requisição");
        }

        const data = await response.json(); 
        setTimeout(() => { 
            renderizarMidia(data.results); 
            filmesGrid.classList.remove("fade-out"); 
            filmesGrid.classList.add("fade-in"); 
            setTimeout(() => { 
                filmesGrid.classList.remove("fade-in"); 
            }, 300)
        }, 200);
        
    } catch (error) {
        console.error("Erro:", error);
        filmesGrid.innerHTML = "<p>Erro ao carregar filmes.</p>";
    }
}

function pesquisaGeral(){ 
    const informacao = campoPesquisa.value.trim(); 

    if (informacao === "") { 
        carregarTendenciaGeral();
        return;
    } 

    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(informacao)}&language=pt-BR`;

    requisicaoURL(url);
    campoPesquisa.value = "";
} 

function renderizarMidia(filmes) {
    filmesGrid.innerHTML = "";

    if (!filmes || filmes.length === 0){
        filmesGrid.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }

    filmes.forEach(filme => {

        const card = document.createElement("div");
        card.classList.add("card");

        const imagem = filme.poster_path
            ? IMAGE_URL + filme.poster_path
            : "";

            if(filme.title) {
                card.innerHTML = `
                <img class="card-img" src="${imagem}" alt="${filme.title}">
                <h3>${filme.title}</h3>
                <p><strong>Nota:</strong> ${filme.vote_average}</p>
                <p><strong>Lançamento:</strong> ${filme.release_date}</p>
                <p>${filme.overview}</p>
                `;
                
            }else{
                card.innerHTML = `
                <img class="card-img" src="${imagem}" alt="${filme.title}">
                <h3>${filme.name}</h3>
                <p><strong>Nota:</strong> ${filme.vote_average}</p>
                <p><strong>Lançamento:</strong> ${filme.release_date}</p>
                <p>${filme.overview}</p>
                `;
            } 
            // ATENÇÃO AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

            card.addEventListener("click", () => { 
                // VERIFICAR COM A PROFESSORA, POIS CONSERTOU MAS FOI COM BASE NO GPF
                // window.location.href = `pages/detalhe.html?id=${filme.id}&type=${filme.media_type}`;
                // ESSE CODIGO ACIMA É O QUE JA ESTAVA NO CODIGO E ESTAVA GERANDO ERRO
                window.location.href = `pages/detalhe.html?id=${filme.id}&type=${filme.title ? "movie" : "tv"}`;
                // ESSE CODIGO ACIMA PRECISA VERIFICAR COM A PROFESSORA, POIS FOI O GPT QUE REPORTOU QUE FALTAVA INFORMAÇÃO. PRIMEIRO REPORTAR O ERRO E VER SE É SO NO NOSSO, SE TEM RESOLUÇÃO
            });


        filmesGrid.appendChild(card);
    });
} 
 
function carregarTendenciaGeral(){ 
    const url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=pt-BR`; 
    requisicaoURL(url);
}

function buscaFilme(){ 
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`; 
    requisicaoURL(url);
}

function buscaSerie(){ 
    const url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=pt-BR`; 
    requisicaoURL(url);
}

document.addEventListener("DOMContentLoaded", carregarTendenciaGeral);

botaoPesquisa.addEventListener("click", pesquisaGeral);

campoPesquisa.addEventListener("keydown", function (event) { 
    if (event.key === "Enter") {
        pesquisaGeral(); 
    }    
});
document.addEventListener("DOMContentLoaded", carregarTendenciaGeral); 
inicio.addEventListener("click", carregarTendenciaGeral); 
filmes.addEventListener("click", buscaFilme); 
series.addEventListener("click", buscaSerie);

window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
}); 
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
    if (tipo === "filme") {
        buscaFilme();
    }else if (tipo === "serie") {
        buscaSerie();
    }else {
        carregarTendenciaGeral();
    }
})

const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo");
 
async function carregarGeneros(tipo = "movie") {
  const response = await fetch(`${BASE_URL}/genre/${tipo}/list?api_key=${API_KEY}&language=pt-BR`);
  
  const data = await response.json();
  
  const select = document.getElementById("filtroGenero");
  select.innerHTML = '<option value="">Todos</option>';
  
  data.genres.forEach(genero => {
    const option = document.createElement("option");
    option.value = genero.id;
    option.textContent = genero.name;
    select.appendChild(option);
  });
}

function filtrarPorGenero() {
  const generoId = document.getElementById("filtroGenero").value;

  if (!generoId) {
    carregarTendenciaGeral();
    return;
  }

  let endpoint = "movie";
  if (tipo === "serie") {
    endpoint = "tv";
  }

  const url = `${BASE_URL}/discover/${endpoint}?api_key=${API_KEY}&with_genres=${generoId}&language=pt-BR`;
  requisicaoURL(url);
}

document.addEventListener("DOMContentLoaded", () => {

    // ATENÇÃO AQUIIIIIIIIIIIIIIIIIIIIIII
    // carregarGeneros();
    // O CODIGO ACIMA É QUE JA ESTAVA AQUI, POREM GERANDO ERRO
    carregarGeneros(tipo === "serie" ? "tv" : "movie");
    // O CODIGO ACIMA FOI UMA ADICÇÃO QUE GPT DISSE QUE FALTAVA, PRECISAMOS VERIFICAR COM A PROFESSORA

    document.getElementById("filtroGenero").addEventListener("change", filtrarPorGenero);
    carregarAnos();

});
