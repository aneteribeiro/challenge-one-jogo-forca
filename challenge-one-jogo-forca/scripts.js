var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
palavras = ["HISTORIA", "CASCAVEL", "ORACULO", "VENCEDOR", "COLAR", "VISCOSE","BABOSA", "MELANCIA", "CLUBE", "IGREJA", "BIBLIA", "HORTA"];
const menuPrincipal = document.getElementById("menu-principal");
const btnIniciarGame = document.querySelector("#iniciar");
const btnAdiciona = document.getElementById("adicionarpalavra");
const menuAdiciona = document.getElementById("adicionar-palavra");
const btnSalvarComecar = document.getElementById("salvar");
const btnCancelar = document.getElementById("cancelar");
const menuTabuleiro = document.getElementById("tabuleiro");
const desistir = document.getElementById("desistir");
const novoJogo = document.getElementById("novoJogo");
const ul = document.querySelector("ul");
const popup = document.querySelector(".popup-wrapper");
const teclado = document.querySelectorAll(".btn-letras")
let novaPalavra = document.getElementById("entrada-texto");
let mensagemFim = document.getElementById("mensagemFim");
var paginaAtual = menuPrincipal;
var palavra;
var letrasErradas = [];
var letrasCorretas = [];
var fimDeJogo = false;


pincel.strokeStyle = "#0A3871";
pincel.lineWidth = 6;
pincel.lineCap = "round";
pincel.lineJoin = "round";
desenhaLinha(10,400,310,400);
desenhaLinha(80,400,80,50);
desenhaLinha(80,50,260,50);
desenhaLinha(260,50,260,100);

for(z = 0; z < teclado.length; z++) {
    teclado[z].addEventListener('click', function(){
        let letras = document.querySelectorAll("li");
        let letra = this.value;
            if(!letrasErradas.includes(letra)){
                if(palavra.includes(letra)){
                    letrasCorretas.push(letra);
                } else {
                    letrasErradas.push(letra);
                    desenhaForca();
                }
                for(i=0;i<palavra.length;i++){
                    if(letra===palavra[i]){
                        letras[i].textContent = letra;
                    }     
                }   
            }
            mostrarLetrasErradas();
            verificaFimDeJogo();
            
    })
}

btnIniciarGame.addEventListener("click", function(){
    reiniciaCanvas();
    sorteia();
    tornarInvisivel(paginaAtual);
    removerInvisivel(menuTabuleiro);
    desenhaTraco(palavra);
    paginaAtual = menuTabuleiro;
    let letras = document.querySelectorAll("li");
    document.addEventListener("keydown", function(event,keyCode){
        let codigo = event.keyCode;
        if(validaLetra(codigo)){
            let letra = event.key.toUpperCase();
            if(!letrasErradas.includes(letra)){
                verificaLetraCorretaErrada(letra,palavra,letras,letrasCorretas,letrasErradas);   
            }
            mostrarLetrasErradas();
            verificaFimDeJogo();
    
        }
    })
    })

btnAdiciona.addEventListener("click", function(){
    tornarInvisivel(paginaAtual);
    removerInvisivel(menuAdiciona)
    paginaAtual=menuAdiciona;
    document.getElementById("entrada-texto").focus();
})

btnCancelar.addEventListener("click",function(){
    tornarInvisivel(paginaAtual);
    removerInvisivel(menuPrincipal);
    paginaAtual = menuPrincipal;
})

btnSalvarComecar.addEventListener("click", function(){
    let novaPalavra = document.getElementById("entrada-texto");
    if(novaPalavra.value.length>0){
        
        reiniciaCanvas();
        letrasErradas=[];
        acertos=[];
        ul.innerHTML=""
        adicionaPalavra();
        sorteia();
        tornarInvisivel(paginaAtual);
        removerInvisivel(menuTabuleiro);
        desenhaTraco(palavra);
        paginaAtual = menuTabuleiro;
        let letras = document.querySelectorAll("li");
        document.addEventListener("keydown", function(event,keyCode){
            let codigo = event.keyCode;
            if(validaLetra(codigo)){
                let letra = event.key.toUpperCase();
                if(!letrasErradas.includes(letra)){
                    verificaLetraCorretaErrada(letra,palavra,letras,letrasCorretas,letrasErradas);   
                }
                mostrarLetrasErradas();
                verificaFimDeJogo();                
            }
        })

    } else {
        alert("Por favor digite uma palavra válida!")
    }
    
})

novoJogo.addEventListener("click", function(){
    reiniciaCanvas();
    letrasErradas=[];
    acertos=[];
    ul.innerHTML="";
    sorteia();
    desenhaTraco(palavra);
    tornarInvisivel(popup);
    let letras = document.querySelectorAll("li");
    document.addEventListener("keydown", function(event,keyCode){
        let codigo = event.keyCode;
        if(validaLetra(codigo)){
            let letra = event.key.toUpperCase();
            if(!letrasErradas.includes(letra)){              
                verificaLetraCorretaErrada(letra,palavra,letras,letrasCorretas,letrasErradas);      
            }
            verificaFimDeJogo();
            mostrarLetrasErradas();
        }
    })
})

desistir.addEventListener("click",function(){
    letrasErradas=[];
    acertos=[];
    ul.innerHTML="";
    tornarInvisivel(paginaAtual);
    tornarInvisivel(popup);
    removerInvisivel(menuPrincipal);
    paginaAtual=menuPrincipal;
})
novaPalavra.addEventListener("keypress", function(e){
    if(!checkChar(e)){
        e.preventDefault();
    }
});
function adicionaPalavra(){
    let novaPalavra = document.getElementById("entrada-texto");
    palavras.push(novaPalavra.value.toUpperCase());
}

function checkChar(e) {
    const char = String.fromCharCode(e.keyCode);
    console.log(char);
    const pattern = '[a-zA-Z]';

    if(char.match(pattern)){
        return true;
    }
}

function desenhaTraco(palavra){
    let ul = document.getElementById("lista");
    for(i=0;i<palavra.length;i++){
       let li = document.createElement("li");
       li.textContent="___";
       ul.appendChild(li);
    }
}

function desenhaCirculo(x, y, raio) {
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2*3.14);
    pincel.stroke();
}


function desenhaForca(){
    switch (letrasErradas.length) {
        case 0:
            reiniciaCanvas();
            break;
        case 1:
            desenhaCirculo(260,132,32);
            break;
        case 2:
            desenhaLinha(260,164,260,300);
            break;
        case 3:
            desenhaLinha(260,164,225,228);
            break;
        case 4:
            desenhaLinha(260,164,295,228);
            break;
        case 5:
            desenhaLinha(260,300,225,364);
            break;
        case 6:
            desenhaLinha(260,300,295,364);
            setTimeout(function(){

                removerInvisivel(popup);
                mensagemFim.textContent=`Você perdeu, a palavra correta era ${palavra}!`
            },500)
            
            break;
        default:

            break;
    }
}
function desenhaLinha(x,y,x1,y1){
    pincel.beginPath();
    pincel.moveTo(x, y);
    pincel.lineTo(x1, y1);
    pincel.stroke();
}
function mostrarLetrasErradas(){
    let divLetraErrada = document.querySelector(".letrasErradas")
    divLetraErrada.innerHTML='<h2>Letras Erradas:</h2>';
    letrasErradas.forEach(letra=>{
        divLetraErrada.innerHTML+=letra;
    })
}
function removerInvisivel(section){
    section.classList.remove("invisivel");
}
function reiniciarJogo(){
    window.location.reload();
}
function reiniciaCanvas(){
    pincel.clearRect(0,0,350,400);
    desenhaLinha(10,400,310,400);
    desenhaLinha(80,400,80,50);
    desenhaLinha(80,50,260,50);
    desenhaLinha(260,50,260,100);
}

function sorteia(){
    let indice = Number(Math.floor(Math.random()*palavras.length));
    palavra=palavras[indice]; 
    return palavra;   
}
function tornarInvisivel(section){
    section.classList.add("invisivel");
}

function validaLetra(codigo){
    return codigo>=65 && codigo<=90;
}
function verificaFimDeJogo(){
    let mensagem = "";
     if(palavra==ul.innerText){
   
        mensagem="Parabéns, você ganhou!";
        
    }
    if(mensagem){
        setTimeout(function(){
            removerInvisivel(popup);
            mensagemFim.textContent= mensagem;
        },500) 

        
    }

}

function verificaLetraCorretaErrada(letra,palavra,letras,letrasCorretas,letrasErradas){
    if(palavra.includes(letra)){
        letrasCorretas.push(letra);
    } else {
        letrasErradas.push(letra);
        desenhaForca();
    }
    for(i=0;i<palavra.length;i++){
        if(letra==palavra[i]){
            letras[i].textContent = letra;
        }     
    }  
}

