<?php
	if(session_id() == "") session_start(); // Vérification de l'existance de session
	header('Content-Type: text/html; charset=utf-8');	// Encodage UTF-8 PHP
	include("include/connexion.php");
	
	$sql = "INSERT INTO categorie (nom,idutilisateur) VALUES ('Nouvelle Categorie','".$_SESSION['idutilisateur']."')";
	try
	{
		// Début de la transaction
		$pdo->beginTransaction();
		$pdo->query($sql);
	
		// Validation de la transaction
		$pdo->commit();
	
		mkdir(dirname(__FILE__)."/utilisateurs/".$_SESSION['utilisateur']."/Nouvelle Categorie",0700);
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
	
	include("include/deconnexion.php");
	
	echo json_encode(array('msg' => $msg));
?>