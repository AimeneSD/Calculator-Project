//1. CONFIGURATION

console.log("Working !");
const display = document.getElementById("display");
const operators = ["+","-","*","/","^","√"]
let isCalculated = false; 


//2. FONCTIONS D'AFFICHAGE
function appendToDisplay(input){//AJOUTE DES CARACTERES A CHAQUE APPUI DE BOUTON
    display.blur(); // Enlève le focus de n'importe quel élément pour nettoyer le clavier
    const lastchar = display.value.slice(-1)

    if(isCalculated){
        if(!operators.includes(input)){
            display.value="";
        }
        isCalculated=false;
    }

    if (operators.includes(input) && operators.includes(lastchar)) {//PERMET D'EVITER LES DOUBLES OPERATEURS SUR LE DISPLAY
        return; // On arrête tout, on n'ajoute pas le deuxième opérateur
    }
    display.value += input;
    

}

function ClearDisplay(){//SUPPRIME TOUT
    display.value="";
    isCalculated=false
}

function ClearLast(){//SUPPRIME LE DERNIER CARACTERE
    display.value = display.value.slice(0, -1);
    isCalculated=false
}



//3. LOGIQUE DE CALCUL
function calculate(){//CALCULE SI ET SEULEMENT SI LA SYNTAXE EST CORRECTE SINON AFFICHE "Error"
    if (display.value==="") return;

    try{
        let expression = display.value.replace(/\^/g,"**")
        expression = expression.replace(/√(\d+\.?\d*)/g, "Math.sqrt($1)");// /√(\d+\.?\d*)/g est l'écriture dite REGEX | permet de remplacer la racine carré par la fonction Math.sqrt(expression) 
        result = eval(expression);
        display.value=Number.isFinite ? result : "Error"
        isCalculated=true
    }catch(error){
        display.value = "Error";
        isCalculated=true
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

