document.addEventListener ("DOMContentLoaded", function () {
    const inicio = document.getElementById("inicio");
    const filmes = document.getElementById("filmes");
    const series = document.getElementById("series");
    inicio.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = window.location.pathname.includes("/pages/")
            ? "../index.html"
            : "./index.html";
    });

    filmes.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = window.location.pathname.includes("/pages/")
            ? "../index.html?tipo=filme"
            : "./index.html?tipo=filme";
    });

    series.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = window.location.pathname.includes("/pages/")
            ? "../index.html?tipo=serie"
            : "./index.html?tipo=serie";
    });
    
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
    const type = params.get("type");

    inicio.classList.remove("ativo");
    filmes.classList.remove("ativo");
    series.classList.remove("ativo");

    if (tipo === "filme" || type === "movie") {
        filmes.classList.add("ativo");
    } else if (tipo === "serie" || type === "tv") {
        series.classList.add("ativo");
    } else {
        inicio.classList.add("ativo");
    }

    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "claro") {
        document.body.classList.add("tema-claro");
    }

    const botaoTema = document.getElementById("botaoTema"); 
    botaoTema.addEventListener("click", () => { 
        document.body.classList.toggle("tema-claro");
        const temaAtual = document.body.classList.contains("tema-claro")
            ? "claro"
            : "escuro";
            localStorage.setItem("tema", temaAtual);
    });
});

