<?php
	if(session_id() == "") session_start(); // Vérification de l'existance de session
	header('Content-Type: text/html; charset=utf-8');	// Encodage UTF-8 PHP
	include("include/connexion.php");
	include("include/fonction.php");
	
	$nomCategorie = $_POST["nomCategorie"];
	$pattern_nomCategorie = '/^[a-zA-Z0-9 áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*$/';
 
    if( preg_match($pattern_nomCategorie,$nomCategorie) ){
    	// Protection contre les erreurs
    	$nomCategorie = htmlspecialchars($nomCategorie);
		
		$sql = "INSERT INTO categorie (nom,idutilisateur) VALUES ('".$nomCategorie."','".$_SESSION['idutilisateur']."')";
		try
		{
			// Début de la transaction
			$pdo->beginTransaction();
			$pdo->query($sql);
		
			// Validation de la transaction
			$pdo->commit();
		
			// Formatage du nom de dossier
    		$nomCategorie = format_dossier($nomCategorie);
			mkdir(dirname(__FILE__)."/utilisateurs/".$_SESSION['utilisateur']."/".$nomCategorie,0700);
			$msg = "ok";
		}
		catch(Exception $e) //en cas d'erreur
		{
			// Annulation de la transaction
			$pdo->rollback();
		
			echo 'Erreur : '.$e->getMessage().'<br />';
			echo 'N° : '.$e->getCode();
			$msg =" Il y a eu un problème lors de l'insertion en base !";
		}

    } else {
    	$msg =" Le format ne correspond pas aux exigences des administrateurs   !";
    }

	include("include/deconnexion.php");
	
	echo json_encode(array('msg' => $msg));
?>