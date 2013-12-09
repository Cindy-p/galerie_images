<?php
	if(session_id() == "") session_start(); // Vérification de l'existance de session
	header('Content-Type: text/html; charset=utf-8');	// Encodage UTF-8 PHP
	
	$login = html_entities($_GET["login"]);
    $password = html_entities($_GET["password"]);

    echo $_GET["login"]." ".$_GET["password"];
?>
