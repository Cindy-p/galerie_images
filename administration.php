<?php 
	if(session_id() == "") session_start(); // Vérification de l'existance de session
	if (!isset($_SESSION["utilisateur"])) header("Location: authentification.php"); // Redirection si l'utilisateur ne s'est pas identifié
	header('Content-Type: text/html; charset=utf-8');	// Encodage UTF-8 PHP
		$page = array("titre" => "Nicody Galerie - Accueil");
		include("include/header.php");
?>


<?php
    include("include/footer.php");
?>