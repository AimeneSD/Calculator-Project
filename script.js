//1. CONFIGURATION

console.log("Working !");
const display = document.getElementById("display");
const operators = ["+","-","*","/"]

//2. FONCTIONS D'AFFICHAGE
function appendToDisplay(input){//AJOUTE DES CARACTERES A CHAQUE APPUI DE BOUTON
    display.blur(); // Enlève le focus de n'importe quel élément pour nettoyer le clavier
    
    const lastchar = display.value.slice(-1)
    if (operators.includes(input) && operators.includes(lastchar)) {
        return; // On arrête tout, on n'ajoute pas le deuxième opérateur
    }
    display.value = display.value + input;
    

}

function ClearDisplay(){//SUPPRIME TOUT
    display.value="";
}

function ClearLast(){//SUPPRIME LE DERNIER CARACTERE
    display.value = display.value.slice(0, -1);
}

//3. LOGIQUE DE CALCUL
function calculate(){//CALCULE SI ET SEULEMENT SI LA SYNTAXE EST CORRECTE SINON AFFICHE "Error"
    if (display.value==="") return;

    try{
        const result= eval(display.value);
        display.value=Number.isFinite ? result : "Error"
    }catch(error){
        display.value = "Error";
    }
}

//4. ECOUTEURS D'ÉVENEMENTS

window.addEventListener("keydown", (event) => {
    const key = event.key;

    // Empêche le comportement par défaut (comme cliquer sur le bouton focus par le navigateur)
    if (key === "Enter") {
        event.preventDefault(); // <--- TRÈS IMPORTANT
        calculate();

    } else if (/^[0-9]$/.test(key) || operators.includes(key)) { // Le ^ signifie "commence par" et le $ signifie "finit par"
        // Optionnel : preventDefault ici aussi pour éviter les doubles saisies 
        // si un bouton est focus
        event.preventDefault(); 
        appendToDisplay(key);
    } else if (key === "Backspace") {
        event.preventDefault();
        ClearLast();
    } else if (key === "Escape") {
        event.preventDefault();
        ClearDisplay();
    }
});

