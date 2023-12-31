// Vincula classes e id's do html a uma variável do js

var divInputs = document.getElementById("palavras"),
    jaUsadas = document.querySelector(".letrasUsadas"),
    vidas = document.getElementById("vidas"),
    ganhou = document.getElementById("ganhou"),
    perdeu = document.getElementById("perdeu"),
    audioGanhou = document.getElementById("audioGanhou"),
    audioPerdeu = document.getElementById("audioPerdeu"),
    audioFundo = document.getElementById("audioFundo");


// Todas as opções de palavras que podem ser adivinhadas 

const aliens = [
    "ACELERADO", "ALIEN X", "AQUATICO", "ARTROPODE", "ATOMICO", 
    "BALA DE CANHAO", "BESTA", "CHAMA", "CIPO SELVAGEM", "CROMATICO", 
    "DIAMANTE", "ECO ECO", "ENORMOSSAURO", "FEEDBACK", "FOGO FATUO", 
    "FRIAGEM", "GIGANTE", "GOSMA", "INSECTOIDE", "MACACO ARANHA",
    "QUATRO BRACOS", "XLR8", "ARRAIA A JATO", "MASSA CINZENTA", "BILAU GIGANTE",
    "ULTRA T", "SHOCKSQUATCH", "GRAVATTACK", "TARTAGIRA", "ARMATU", 
    "NRG", "FANTASMATICO", "LOBISBEN", "BENMUMIA", "BEN VICTOR", 
    "GLUTAO", "CLONE", "MEGA OLHOS", "CHOCANTE", "IGUANA ARTICA", 
    "CUSPIDOR", "ESTRELA POLAR", "RATH", "NANOMECH", "AMEAÇA AQUATICA", 
    "ANFIBIO", "CONTRA TEMPO", "CHAMALIEN", "DIABRETE", "BESOURO", 
    "BLOXX", "ESCARABOLA", "CRASHHOPPER", "COCOROCOIDE", "WALKATRUTA", 
    "PESKY DUST", "BIGOTOIDE", "ESPANTOIDE", "ASTRODACTILO", "O PIOR", 
    "VOMPIRO", "PODRAO", "BULLFRAG"
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
                letrasUsadas(letraDigitada);

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
    let cont = 0;

    if (palavraEscolhida.includes(letra)) {
        for (i = 0; i < palavraEscolhida.length; i++) {
            var inputLetra = document.querySelector(".a" + i);

            if (palavraEscolhida[i] == " ") {
                cont++
                console.log(cont);
            }
            
            if (letra === palavraEscolhida[i]) {
                inputLetra.value += palavraEscolhida[i];
                verificaSeGanhou.push(letra);
                
                // console.log(verificaSeGanhou);
                // console.log(palavraEscolhida);

                if (palavraEscolhida.length - cont == verificaSeGanhou.length) {
                    ganhou.style.display = "";
                    audioFundo.pause();
                    audioGanhou.play();
                }
            }
        }
    } else {
        vidas.value--;
        if (vidas.value == 4) {
            pernaEsquerda = document.getElementById("pernaEsquerda");
            pernaEsquerda.removeAttribute("hidden");
        } else if (vidas.value == 3) {
            pernaDireita = document.getElementById("pernaDireita");
            pernaDireita.removeAttribute("hidden");
        } else if (vidas.value == 2) {
            troncoDireito = document.getElementById("troncoDireito");
            troncoDireito.removeAttribute("hidden");
        } else if (vidas.value == 1) {
            troncoEsquerdo = document.getElementById("troncoEsquerdo");
            troncoEsquerdo.removeAttribute("hidden");
        } else if (vidas.value == 0) {
            perdeu.style.display = "";
            audioFundo.pause();
            audioPerdeu.play();
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


audioFundo.play();


sorteiaPalavra(aliens);


console.log(palavraEscolhida);


criaInputs(palavraEscolhida);
