<?php
	if(session_id() == "") session_start(); // Vérification de l'existance de session
	header('Content-Type: text/html; charset=utf-8');	// Encodage UTF-8 PHP
	include("include/connexion.php");
	include("include/fonction.php");
	
	$idCategorie = intval(htmlspecialchars($_POST["idCategorie"]));
	$nomCategorie = htmlspecialchars($_POST["nomCategorie"]);
	
	$sql = "DELETE FROM categorie WHERE idcategorie = :idcategorie" ;
	try
	{
		// Début de la transaction
		$pdo->beginTransaction();
		$stm = $pdo->prepare($sql);
		$stm->execute(array(":idcategorie" => $idCategorie ));
	
		// Validation de la transaction
		$pdo->commit();
	
		// Formatage du nom de dossier
    	$nomCategorie = format_dossier($nomCategorie);
		if ( !rmdir(dirname(__FILE__)."/utilisateurs/".$_SESSION['utilisateur']."/".$nomCategorie)){
			$msg = "Le dossier ne s'est pas supprimé !";
		} else {
			$msg = "ok";
		}
	}
	catch(Exception $e) //en cas d'erreur
	{
		// Annulation de la transaction
		$pdo->rollback();
	
		echo 'Erreur : '.$e->getMessage().'<br />';
		echo 'N° : '.$e->getCode();
		$msg =" Il y a eu un problème lors de la suppresion en base !";
	}

  
	include("include/deconnexion.php");
	
	echo json_encode(array('msg' => $msg));
?>