console.log("Working !");
const display = document.getElementById("display");
const operator = ["+","-","*","/"]

function appendToDisplay(input){//AJOUTE DES CARACTERES A CHAQUE APPUI DE BOUTON
    display.blur(); // Enlève le focus de n'importe quel élément pour nettoyer le clavier
    
    const lastchar = display.value.slice(-1)
    display.value = display.value + input;

}

function ClearLast(){//SUPPRIME LE DERNIER CARACTERE
    display.value = display.value.slice(0, -1);
}

function ClearDisplay(){//SUPPRIME TOUT
    display.value="";
}

function calculate(){//CALCULE SI ET SEULEMENT SI LA SYNTAXE EST CORRECTE SINON AFFICHE "Error"
    try{
    display.value = eval(display.value);
    }catch(error){
        display.value = "Error";
    }
}

window.addEventListener("keydown", (event) => {
    const key = event.key;

    // Empêche le comportement par défaut (comme cliquer sur le bouton focus)
    if (key === "Enter") {
        event.preventDefault(); // <--- TRÈS IMPORTANT
        calculate();

    } else if (/^[0-9]$/.test(key) || ["+", "-", "*", "/"].includes(key)) { // Le ^ signifie "commence par" et le $ signifie "finit par"
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

