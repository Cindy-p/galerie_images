<?php
	if(session_id() == "") session_start(); // Vérification de l'existance de session
	header('Content-Type: text/html; charset=utf-8');	// Encodage UTF-8 PHP
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Nicody Galerie - Connexion</title>
		<link rel="stylesheet" href="css/themes/cupertino/jquery-ui-1.10.3.custom.css">
		<link rel="stylesheet" href="css/authentification.css">
		
		<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.js"></script>
		<script type="text/javascript" src="js/authentification.js"></script>
		<script type="text/javascript" src="js/centrer.js"></script>
	
	</head>
	<body>
		<div id="selectionConnexion">
			<button id="nouvelUtilisateur" class="max_width ui-button ui-widget ui-state-default ui-corner-all" >Créer un nouveau compte</button>
			<br/><br/><br/><br/>
			<button id="ancienUtilisateur" class="max_width ui-button ui-widget ui-state-default ui-corner-all" >Connectez-vous à votre compte</button>
		</div>
		
		<div id="formulaireDialogNouveau" title="Création de votre compte">
			<p id="textNouveau"  class="validateTips">Tous les champs sont requis !</p>
			<form>
				<fieldset>
					<label for="login">Identifiant</label>
					<input type="text" name="nouveauLogin" id="nouveauLogin" class="text ui-widget-content ui-corner-all">
					<label for="email">Email</label>
					<input type="text" name="nouvelEmail" id="nouvelEmail" value="" class="text ui-widget-content ui-corner-all">
					<label for="password">Mots de passe</label>
					<input type="password" name="nouveauPassword" id="nouveauPassword" value="" class="text ui-widget-content ui-corner-all">
				</fieldset>
			</form>
		
		<div id="formulaireDialogAncien" title="Connexion à votre compte">
			<p id="textAncien" class="validateTips"></p>
			<form>
				<fieldset>
					<label for="login">Identifiant</label>
					<input type="text" name="login" id="login" class="text ui-widget-content ui-corner-all">
					<label for="password">Mots de passe</label>
					<input type="password" name="password" id="password" value="" class="text ui-widget-content ui-corner-all">
				</fieldset>
			</form>
		</div>
		
		</div>
	</body>
</html>
