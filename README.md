# 🍿 Sabor Pipoca — Catálogo de Filmes e Séries

Projeto de catálogo de **filmes e séries** desenvolvido com **HTML, CSS e JavaScript**, consumindo dados da API do **TMDB (The Movie Database)**.

O sistema permite visualizar títulos populares, pesquisar filmes ou séries, filtrar por gênero e acessar uma página de detalhes com informações como data de lançamento, nota e descrição.

---

## 🚀 Funcionalidades

- 🔎 Pesquisa de filmes e séries  
- 🎬 Exibição de títulos populares  
- 🎭 Filtro por gênero  
- 📄 Página de detalhes com informações completas  
- ⭐ Exibição de nota, data e descrição  
- 🌗 Alternância entre modo claro e escuro  
- 🎨 Interface estilizada com CSS

---

## 🖥️ Tecnologias utilizadas

- HTML5  
- CSS3  
- JavaScript  
- API do TMDB

---

## 🔗 API utilizada

Este projeto utiliza dados da API:

**The Movie Database (TMDB)**  
https://www.themoviedb.org/

Documentação da API:  
https://developer.themoviedb.org/

## Configuração da API

Este projeto utiliza a API do **TMDB (The Movie Database)** para buscar informações de filmes e séries.

Por motivos de segurança, a chave da API não está incluída neste repositório.

Para executar o projeto corretamente, siga os passos abaixo:

1. Acesse o site do TMDB:  
   https://www.themoviedb.org/

2. Crie uma conta gratuita ou faça login.

3. Vá em **Settings → API**.

4. Solicite uma chave de API (API Key).

5. Após receber sua chave, abra o arquivo main.js e detalhe.js do projeto.

6. Localize a seguinte linha no código:

```javascript
const API_KEY = "SUA_CHAVE_AQUI";
```

7. Substitua "SUA_CHAVE_AQUI" pela sua chave da API do TMDB.

Exemplo:

const API_KEY = "123456789abcdef";

Após isso, o projeto funcionará normalmente.

## Estrutura do projeto

```

catalogo/
│
├── assets/
│   ├── icone/
│   └── imagem/
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── global.js
│   └── detalhe.js
│
├── pages/
│   └── detalhe.html
│
└── index.html
```
