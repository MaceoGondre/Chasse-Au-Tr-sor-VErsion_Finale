<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styleScores.css">
    <title>Scores</title>
</head>
<body>
    <?php    
    try {

        $pdo = new PDO("mysql:host=localhost;dbname=chasseautresor;charset=utf8","root","root");

        $req = "select * from tabScores Order By score Limit 10";
        $stmt = $pdo->query($req);
        $lesScores = $stmt->fetchAll();



    } catch (Exception $e) {
        $_SESSION ["error"]="Houston, on a un problème : " . $e->getMessage ();
    }
    ?>

<div id="popupFinP" class="overlayFinP">
    <div class="popupFinP">
        <h2>Tableau des Scores</h2>
        <br>
        <div id="tabScores" name="tabScores" class="tabScores">
            <table id="tableS">
                <thead>
                    <tr>
                        <th id="thS">Numéro de la partie</th>
                        <th id="thS">Joueur</th>
                        <th id="thS">Score</th>
                        <th id="thS">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($lesScores as $unScore) { ?>
                        <tr>
                            <td id="tdS"><?php echo($unScore["id"]) ?></td>
                            <td id="tdS"><?php echo($unScore["pseudo"]) ?></td>
                            <td id="tdS"><?php echo($unScore["score"]) ?></td>
                            <td id="tdS"><?php echo($unScore["dateJour"]) ?></td>
                        </tr>
                    <?php    }?>
                </tbody>
            </table>
        </div>
        <br>
        <input type="button" id="btnRetourJeu" value="Retour" onclick="javascript:history.back()">
    </div>
</div>


</body>
</html>