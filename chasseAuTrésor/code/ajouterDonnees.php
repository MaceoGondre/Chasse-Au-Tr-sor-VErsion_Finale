<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ajouter Donnees</title>
</head>
<body onload="javascript:history.back()">

    <?php
        try {

            $pdo = new PDO("mysql:host=localhost;dbname=chasseautresor;charset=utf8","root","root");

            $pseudo = $_POST['pseudo'];
            $score = $_POST['score'];
            $date = $_POST['date'];

            if ($pseudo!="" || $score="" || $date!="") {
                $reqI = "insert into tabscores (pseudo, score, dateJour) values ('$pseudo','$score','$date');";
                $pdo->query($reqI);
                echo ("données ajoutées !"); 
            } else {
                echo ("echec.");
            }


        } catch (Exception $e) {
            die ("Erreur fatale : ".$exception->getMessage());
        }

        // header ("Location:testTableau.php");
        // exit();

    ?>
    
</body>
</html>