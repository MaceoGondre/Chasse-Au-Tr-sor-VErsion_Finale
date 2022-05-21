// Tableau qui stocke les cases spéciales
let listeSurprise = [];
// Déclaration de la variable qui définit l'élement html où sera stocké le nombre de jours
let nbrJour = document.getElementById("nbrJour");
// Variable qui comptabilise le nombre de jours
let compteur = 0;
// Tableau qui va stocker les id des case déjà coché
let caseDejaCoche = [];
// Variable qui autorise le changement de couleur d'une case si sa valeur est "true"
let boolFin = true;
// rafraîchie la page pour pouvoir rejouer
let btnRejouer = document.getElementById("btnRejouer");
btnRejouer.addEventListener("click", () => {location.reload(); return false;});
// On créé un compteur qui permet de savoir combien de malus ont été découvert
let compteurMalus = 0;
// On créé un compteur qui permet de savoir combien de bonus ont été découvert
let compteurBonus = 0;

class Surprise {
    // Déclaration des attributs
    X = 0
    Y = 0
    desc = ""
    constructor(desc) {
    // mode automatique
    this.X = Math.floor(Math.random() * 10) +1;
    this.Y = Math.floor(Math.random() * 10) +1;
    // this.X = X;
    // this.Y = Y;
    this.desc = desc;
    }
    changerClass(desc, X, Y) {
        let caseItem = document.getElementById([X]+ "-" +[Y]);
        caseItem.setAttribute('class', desc);
    }
}

function grilleCarte (x, y, emplacement) {
    let idCase = "";
    let texte = "<table>";
    for (let xx=1; xx<x+1; xx++) {
        texte += `<tr>`;
        for (let yy= 1; yy < y+1; yy++) {
            idCase = xx+"-"+yy;
            texte += `<td id="${idCase}" onclick="choix(this.id, boolFin)"></td>`;
        }
        texte += `</tr>`;
    }
    texte += `</table>`;
    document.getElementById(emplacement).innerHTML = texte;
    // On appelle la fonction placeItem pour générer le trésor, les bonus et les malus
    placeItem(1, "tresor");
    placeItem(6, "bonus");
    placeItem(10, "malus");
}
grilleCarte(10,10,"grilleJeuArcade");


function placeItem (nbrBM, type) {
    for (let nbrMB = 0; nbrMB<nbrBM; nbrMB++) {
        // Création des cases spéciales
        let caseSpe = new Surprise(type);
        listeSurprise.push(caseSpe);
        // Vérification des possibles redondances de cases spéciales
        for (let i = 0; i<listeSurprise.length-1;i++) {
            // Si les attributs X et Y de la nouvelle case spéciale sont identiques à une case spéciale existante, les valeurs des attributs sont de nouveaux tirées au sort
            while (listeSurprise[listeSurprise.length-1].X == listeSurprise[i].X && listeSurprise[listeSurprise.length-1].Y == listeSurprise[i].Y) {
                listeSurprise[listeSurprise.length-1].X = Math.floor(Math.random() * 10) +1;
                listeSurprise[listeSurprise.length-1].Y = Math.floor(Math.random() * 10) +1;
            }
        }
    }
    if (type == 'tresor') {
        autourTresor(listeSurprise[0].X, listeSurprise[0].Y);
    }
}


function choix (CoorCaseID, boolFin) {
    if (boolFin == true) {
        // Si une case est déjà sélectionnée, la vraiable compteur ne comptabilise pas un clic suplémentaire
        if (compteur == 0) {
            compteur ++;
            caseDejaCoche.push(CoorCaseID);
        } else {
            let compteurVerif = 0;
            for (let n=0; n<caseDejaCoche.length; n++) {
                if (CoorCaseID == caseDejaCoche[n]) {
                    compteurVerif --;
                } else {
                    compteurVerif ++;
                }
            }
            if (compteurVerif == caseDejaCoche.length) {
                compteur ++;
                caseDejaCoche.push(CoorCaseID);
            } else {
                return;
            }
        }
        let caseN = document.getElementById(CoorCaseID);
        let caseSpe = new Surprise;
        for (let x=0; x<listeSurprise.length; x++) {
            if (CoorCaseID == listeSurprise[x].X +"-"+ listeSurprise[x].Y) {
                // La classe de la case spéciale change pour que le css devienne actif
                caseSpe.changerClass(listeSurprise[x].desc, listeSurprise[x].X, listeSurprise[x].Y);
                // Réajustage du compteur de jours si la case cochée est une case spéciale
                if (listeSurprise[x].desc == 'bonus') {
                    // Bonus de temps aléatoire compris entre 1 et 5
                    let bonusRandom = Math.floor(Math.random()*5)+1;
                    compteur -= bonusRandom;
                    // Information du bonus dans une balise html
                    document.getElementById("commCaseSpé").innerHTML = "- "+ bonusRandom;
                    compteurBonus ++
                    CompteurCasesSpé(compteurBonus, listeSurprise[x].desc);
                } else if (listeSurprise[x].desc == 'malus') {
                    // Malus de temps aléatoire compris entre 1 et 5
                    let malusRandom = Math.floor(Math.random()*5)+1;
                    compteur += malusRandom;
                    // Information du malus dans une balise html
                    document.getElementById("commCaseSpé").innerHTML = "+"+ malusRandom;
                    compteurMalus ++
                    CompteurCasesSpé(compteurMalus, listeSurprise[x].desc);
                }
                // Mettre fin à la partie si la case trésor est cochée
                else if (listeSurprise[x].desc == 'tresor') {
                    // On appelle la fonction qui mettra fin à la partie
                    finDePartie(compteur, document.getElementById("Pseudo").textContent);
                    // Ajouter la date du jour pour les informations de la partie
                    let d = new Date();
                    let date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
                    insert(document.getElementById("Pseudo").textContent, compteur, date);
                }
                // Affichage sur la page du nompbre de jours
                nbrJour.innerHTML = compteur;
                // Appelle la fonction qui affichera des commentaires au joueur
                messageAuJoueur(compteur);
                return;
            } else {
                // La classe de la case neutre change pour que le css devienne actif
                caseN.setAttribute('class', 'caseNeutre');
            }
        }
        // Affichage sur la page du nompbre de jours
        nbrJour.innerHTML = compteur;
        // Appelle la fonction qui affichera des commentaires au joueur
        messageAuJoueur(compteur);
    } else {
        alert("Partie terminée, appuyez sur le bouton rejouer si vous souhaitez refaire une partie");
    }
}

function messageAuJoueur (compteur) {
    let messageAuJoueur = document.getElementById("messageAuJoueur");
    if (compteur < 10) {
        messageAuJoueur.innerHTML = "Trouvons ce satané coffre !";
    } else if (compteur < 20) {
        messageAuJoueur.innerHTML = "Alors ?! Il est loin ce trésor ?";
    } else if (compteur < 30) {
        messageAuJoueur.innerHTML = "Cela fait " + compteur + " jours mousaillon. Je croyais que tu étais déterminé ?";
    } else if (compteur < 40) {
        messageAuJoueur.innerHTML = compteur + " jours !? tu n'es peut être pas un pirate si exceptionnel finalement ...";
    } else if (compteur < 50) {
        messageAuJoueur.innerHTML = compteur + " jours... Cela commence vraiment à faire long !";
    } else if (compteur < 60) {
        messageAuJoueur.innerHTML = "Par ma barbe, quelle désillusion à ton égard mousaillon...";
    } else if (compteur >= 60) {
        messageAuJoueur.innerHTML = "Woaw ! " + compteur + " jours... Tu es pour sûr le pire pirate que l'humanité n'ait jamais connu.";
    }
}

// Fonction qui place dans un formulaire les informations de la partie
function insert (pseudo, score, date) {
    // let requete = "insert into tabscores (pseudo, score, dateJour) values ("+pseudo+','+score+','+date+");";
    // document.getElementById("requete").innerHTML= requete;
    document.getElementById("pseudo").value= pseudo;
    document.getElementById("score").value= score;
    document.getElementById("date").value= date;
    document.getElementById('formScores').submit();
}

// Fonction qui met fin à la partie en faisant apparaitre une pop-up indiquant la fin de la partie, proposant de rejouer ou de voir le tableau des scores
function finDePartie(compteur, pseudo) {
    // Ce changement de valeur n'autorise plus le joueur à cliquer sur les cases non-cochées restantes
    boolFin = false;
    // Modification du message de félicitation en fonction du du nombre de jours
    document.getElementById("messageF").innerHTML = "Et bien mousaillon, il semblerait que tu l'aies trouvé ce trésor ! Et en "+ compteur +" jours seulement. Au nom de tout les pirates de cet océan, je te félicites ! Tu vas devenir célèbre petit. Gloire à toi "+ pseudo +"!!!"
    // Affichage d'une pop up de fin de partie
    let popup = document.getElementById("popupFinP");
    popup.style.visibility = 'visible';
    popup.style.opacity = '1';
    console.log('ok');
}

// Fonction qui permet de fermer la popup de fin de partie
function cache_popup () {
    document.getElementById("popupFinP").style.visibility = 'hidden';
    document.getElementById("popupFinP").style.opacity = '0';
    document.getElementById("popupRegles").style.visibility = 'hidden';
    document.getElementById("popupRegles").style.opacity = '0';
    document.getElementById("popupChangePseudo").style.visibility = 'hidden';
    document.getElementById("popupChangePseudo").style.opacity = '0';
}

// Affichage d'une pop up pour les règles
function popupRegles () {
    let btnRegles = document.getElementById('popupRegles');
    btnRegles.style.visibility = 'visible'; 
    btnRegles.style.opacity = '1';
}

// Affichage d'une pop up afin de changer de pseudo
function popupChangePseudo () {
    let btnChangeP = document.getElementById('popupChangePseudo');
    btnChangeP.style.visibility = 'visible'; 
    btnChangeP.style.opacity = '1';
}

// Fonction qui récupère le Pseudo du joueur lorsqu'il souhaite le changer
function ChangerPseudo (PseudoJ) {
    if (PseudoJ!="") {
        let Pseudo = document.getElementById("Pseudo");
        Pseudo.innerHTML= PseudoJ;
        cache_popup();
    }
}

// Fonction qui permet d'afficher combien de cases spéciales ont été découvertes
function CompteurCasesSpé(compteur, type) {
    if (type=== 'bonus') {
        document.getElementById("compteurBonus").innerHTML=  "Bonus : "+compteur+"/6";
    } else if (type==="malus") {
        document.getElementById("compteurMalus").innerHTML=  "Malus : "+compteur+"/10";
    }
}

// Petit easter egg
function easterEgg() {
    document.getElementById("commCaseSpé").innerHTML = 'L'+listeSurprise[0].X +'-C'+ listeSurprise[0].Y;
}


//  Fonction qui permet de faire un dégradé de couleur des cases en fonction de leur proximité avec la case du trésor
function autourTresor(tresorX, tresorY) {
    // console.log(tresorX, tresorY);
    // Tableau dans lequel sera stocké les cases voisines du trésor
    let tabAutourTresor = [];
    x = tresorX;
    y = tresorY;
    let DHG = parseInt(x-1) + "-" + parseInt(y-1);
    let DHD = parseInt(x)+ '-' + parseInt(y+1);
    let DBG = parseInt(x+1) + "-" + parseInt(y-1);
    let DBD = parseInt(x+1) + "-" + parseInt(y+1);
    let D = parseInt(x) + "-" + parseInt(y+1);
    let G = parseInt(x) + "-" + parseInt(y-1);
    let B = parseInt(x+1) + "-" + parseInt(y);
    let H = parseInt(x-1) + "-" + parseInt(y);
    tabAutourTresor.push(DHG, DHD, DBG, DBD, D, G, B, H);
    // console.log(tabAutourTresor);
}
// -> cette  fonction ne fonctionne pas (pas terminée)


// Afficher le tableau des scores
// function AfficherScores () {
//     document.getElementById("tabScores").style.display = "contents";
// }
// document.getElementById("btnScores").addEventListener("click", () => {document.getElementById("tabScores").style.visibility = "visible"});