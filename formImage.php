<?php
	if(session_id() == "") session_start(); // Vérification de l'existance de session
	header('Content-Type: text/html; charset=utf-8');	// Encodage UTF-8 PHP
	include("include/connexion.php");
	
	$idCategorie = $_GET["idCategorie"];
	
?>
	<p id="textNouveau"  class="validateTips">Tous les champs sont requis !</p>
	<form id="formulaireImage" method="POST" action="nouvelle_image.php" enctype="multipart/form-data">
		<fieldset>
			<label for="nom">Nom</label>
			<input type="text" name="nom" id="nom" class="text ui-widget-content ui-corner-all"/>
			<br/>
			<label for="description">Description</label>
			<textarea rows="3" cols="30" name="description" id="description" class="text ui-widget-content ui-corner-all" ></textarea>
			<input type='file' name='file' id="file"/>
			<input type="hidden" name="formIdCategorie" id='formIdCategorie' value='<?php echo $idCategorie;?>'/>
		</fieldset>
	</form>