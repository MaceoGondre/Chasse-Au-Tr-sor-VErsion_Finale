<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styleTest.css">
    <title>L'île maudite</title>
</head>
<body onload="popupChangePseudo()">
    <form id="formScores" method="post" action="ajouterDonnees.php" hidden>
        <input type="text" name="pseudo" id="pseudo" value="" hidden />
        <input type="text" name="score" id="score" value="" hidden />
        <input type="text" name="date" id="date" value="" hidden />
    </form>


<div id="grilleJeuArcade" class="grilleJeuArcade">

</div>
<div id="InfosArcade" class="InfosArcade">
<p id="Pseudo">noob</p>
<p>Jour : <span id="nbrJour">0</span></p>
<p id="compteurBonus">Bonus : 0/6</p>
<p id="compteurMalus">Malus : 0/10</p>
<p id="messageAuJoueur"></p>
<div class="inpoutI">
    <input type="button" id="btnRejouer" class="btnRejouer" value="Rejouer">
    <input type="button" id="btnRegles" class="btnRegles" value="Règles" onclick="popupRegles()">
    <input type="button" id="ChangePseudo" class="ChangePseudo" value="Changer de Pseudo" onclick="popupChangePseudo()">
</div>
Dernier Bonus/Malus : <span id="commCaseSpé"></span>
</div>


<div id="popupFinP" class="overlayFinP">
    <div class="popupFinP">
        <h2>FÉLICITATION !</h2>
        <a href="javascript:cache_popup()" class="cross">&times;</a>
        <p id="messageF"></p>
        <br>
        <p>Voir les <a href="Scores.php"><input type="button" id="btnScores" class="btnScores" value="Scores"></a></p>
    </div>
</div>

<div id="popupRegles" class="overlayRegles">
    <div class="popupRegles">
        <h2>Règles du jeu</h2>
        <a href="javascript:cache_popup()" class="cross">&times;</a>
        <p id="messageR">Les règles sont simples...</p>
    </div>
</div>

<div id="popupChangePseudo" class="overlayChangePseudo">
    <div class="popupChangePseudo">
        <h2>Pseudo</h2>
        <a href="javascript:cache_popup()" class="cross">&times;</a>
        <p id="messageCP">Si vous ne saisissez aucun pseudo et que vous fermez ce pop-up, <button id="easterEgg" onclick="easterEgg()">'noob'</button> vous sera attribué par défaut.
            Veuillez saisir un pseudo : 
            <br><br>
            <input type="text" name="NewPseudo" id="NewPseudo" required>
            <input type="button" id="ValiderPseudo" name="ValiderPseudo" value="Valider" onclick="ChangerPseudo(NewPseudo.value)">
        </p>
    </div>
</div>

    <script src="scriptTest.js"></script>
</body>
</html>