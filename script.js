// Vincula classes e id's do html a uma variável do js

var divInputs = document.getElementById("palavras"),
    jaUsadas = document.querySelector(".letrasUsadas"),
    vidas = document.getElementById("vidas");



// Todas as opções de palavras que podem ser adivinhadas 

const aliens = [
    "ACELERADO", "ALIENX", "AQUÁTICO", "ARTRÓPODE",
    "ATOMICO", "BALA DE CANHÃO", "BESTA", "CHAMA",
    "CIPÓ SELVAGEM", "CROMÁTICO", "DIAMANTE", "ECO ECO",
    "ENORMOSSAURO", "FEEDBACK", "FOGO FÁTUO", "FRIAGEM",
    "GIGANTE", "GOSMA", "INSECTÓIDE", "MACACO ARANHA",
    "QUATRO BRAÇOS", "XLR8", "ARRAIA À JATO", "MASSA CINZENTA",
    "BILAU GIGANTE", "ULTRA T", "SHOCKSQUATCH", "GRAVATTACK",
    "TARTAGIRA", "ARMATU", "NRG", "FANTASMÁTICO"
];


// Transforma a string em array

var palavraEscolhida = "".split(" ");


// Escolhe aleatóriamente a palavra da vez

function sorteiaPalavra(array) {
    var posiçãoAleatória = Math.floor(Math.random() * array.length);
    palavraEscolhida += array[posiçãoAleatória];
}


// Gera os inputs na página de acordo com a quantidade de letras que há na palavra, se a posição do array(anteriormente string) for igual a " " ele deixa em branco

function criaInputs(palavraSorteada) {
    for (i = 0; i < palavraSorteada.length; i++) {
        if (palavraSorteada[i] != " ") {
            var input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.classList.add("inputLetras");
            input.classList.add("a" + i);
            // console.log(input);

            divInputs.appendChild(input);
        } else {
            var input = document.createElement("input");
            input.type = "text";

            input.classList.add("espaco");

            divInputs.appendChild(input);
        }
    }
    
}


// Guarda as letras acertadas para comparar com a palavra escolhida

var verificaSeGanhou = [];


// Armazena as letras ja usadas em um array

var guardaLetras = [];


// Vincula o input de tentativa de letra à tecla "Enter" do teclado 

var letraTentativa = document.getElementById("inputLetra");


// Função para capturar a letra digitada no input da página quando apertado a tecla "Enter"

letraTentativa.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        var letraDigitada = letraTentativa.value.trim().toUpperCase();
        if (guardaLetras.includes(letraDigitada)) {
            event.preventDefault();
            letraTentativa.setCustomValidity('Essa letra ja foi usada, tente outra!');
        } else {
            letraTentativa.setCustomValidity('');
            if (letraDigitada !== "") {
                guardaLetras.push(letraDigitada);
                verificaLetra(letraDigitada);
                letrasUsadas(letraDigitada)
                letraTentativa.value = "";
                // console.log(guardaLetras);
            }
        }
    }
})


// Guarda as letras ja usadas

function letrasUsadas(letra) {
    jaUsadas.innerHTML += letra + " - ";
}


// Verifica se a letra usada tem na palavra sorteada

function verificaLetra(letra) {
    if (palavraEscolhida.includes(letra)) {
        for (i = 0; i < palavraEscolhida.length; i++) {
            var inputLetra = document.querySelector(".a" + i);
            
            if (letra === palavraEscolhida[i]) {
                inputLetra.value += palavraEscolhida[i];
                verificaSeGanhou.push(letra);
                // console.log(verificaSeGanhou);
                if (palavraEscolhida.length == verificaSeGanhou.length){
                    alert("Parabéns!! Você ganhou")
                    recarregaPagina();
                }
            }
        }
    } else {
        vidas.value--;
        if (vidas.value == 0) {
            alert("Você perdeu");
            recarregaPagina();
        }
    }
}




// Reseta a págida depois de ganhar ou perder o jogo

function recarregaPagina() {
    const tempoAtraso = 500;
    
    setTimeout(function () {
        location.reload();
    }, tempoAtraso);
}



sorteiaPalavra(aliens);


console.log(palavraEscolhida);


criaInputs(palavraEscolhida);
