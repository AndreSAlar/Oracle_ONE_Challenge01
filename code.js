const original_message=document.querySelector("#original_message");
const encrypted_message=document.querySelector("#encrypted_message");
const btnEncript=document.querySelector(".encript");
const btnDecypt=document.querySelector(".decypt");
const btnCopy=document.querySelector(".copy");
const btnHear=document.querySelector(".hear");
const btnClean=document.querySelector(".clean");

const divOne=document.querySelector(".div1");
//const div2=document.querySelector(".div2");

function validateMessage(){ // esta funcion valida si los caracteres ingresados son validos 

    let prevErrors=divOne.querySelectorAll(".error");
    for (let fe of prevErrors){ // borrar mensajes de errores de validacion previos
        divOne.removeChild(fe);
    }

    var msg=original_message.value;
    let validLetters="abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // lista de caracteres admitiddos
    let msgError=document.createDocumentFragment();
    
    for (let letter of msg) { //recorre la cadena del mensaje, validando que contenga solo letras definidas en validLetters
        if (!validLetters.includes(letter)) { //si falso que: mensaje contiene letras validas, se crea el elemento html de parrafo de mensaje error
            let p=document.createElement("p");  //crea elemento parrafo
            p.setAttribute("class","error");  //crea la class error para el elemento html parrafo 
            p.textContent= `Error La letra ${letter} no es válida`;  // contenido de texto para el parrafo
            msgError.appendChild(p);  // agregar el p como un hijo de msgError
        }        
    }
    divOne.appendChild(msgError); // en el elemento html div nombrado como divOne cree el parrafo segun el contenido que tenga msgError
    if (msgError.children.length === 0) { // si no hay hijos en msgError... y no har error que mostrar
        return true; // no hay errores y se podrá encriptar el mensaje       
    } 
    /*if (msg.length === 0 || msg == null) {// validar si mesaje vien evacio
        return true;      
        p.textContent= `Error: no hay textooooooooooooooooooooooooo`;   
    } */  

        return false;  // existen letras no validas, no se puede encriptar mensaje
}

function encrypt(){ // funcion para encriptar
    if (!validateMessage()) return;  //si validar mensaje es falso, retornar y no ejecutar encriptar mensaje
    var messageO=original_message.value;
    var result=messageO.replaceAll("a","4").replaceAll("e","3").replaceAll("i","1").replaceAll("o","0").replaceAll("u","5");
    encrypted_message.value=result;
    encrypted_message.style.backgroundImage="none";
    document.querySelector(".actions").style.display="flex";
}

function decrypt(){ // funcion para desencriptar
    var messageE=original_message.value;
    var result=messageE.replaceAll("4","a").replaceAll("3","e").replaceAll("1","i").replaceAll("0","o").replaceAll("5","u");
    encrypted_message.value=result;
    encrypted_message.style.backgroundImage="none";
    document.querySelector(".actions").style.display="flex";
}

function copy(){ // funcion para copiar resultado
    var encrypted=encrypted_message.value;
    navigator.clipboard.writeText(encrypted);
    original_message.value="";
    original_message.focus();

}

function hear(){ // funcion para escuchar el resultado
    var encrypted=encrypted_message.value;
    let msg=new SpeechSynthesisUtterance();
    msg.text=encrypted;
    msg.lang="es-Es";
    window.speechSynthesis.speak(msg);
}

function clean(){
    var original=original_message.value;
    var encrypted=encrypted_message.value;
    original_message.value="";
    encrypted_message.value="";
    encrypted_message.style.backgroundImage="url(images/muneco.svg)";
    document.querySelector(".actions").style.display="none";
    original_message.focus();
}

btnEncript.onclick=encrypt;
btnDecypt.onclick=decrypt;
btnCopy.onclick=copy;
btnHear.onclick=hear;
btnClean.onclick=clean;



