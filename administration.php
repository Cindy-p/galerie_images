<?php
$page = array(
        "titre" => "Nicody Galerie - Administration",
        "script" => array( "js/administration.js", "js/jquery.form.js")
        );
include("include/header.php");

include("include/connexion.php");

	if ( isset($_POST["idCategorie"])){
		$idCategorie = $_POST["idCategorie"];
		echo "<input id='currentCategorie' type='hidden' value='".$idCategorie."'/>";
	} else {
		echo "<input id='currentCategorie' type='hidden'/>";
	}

?>

<div id="listCategorie">
	<ul>
		<li><a href="#nouvelleCategorie">Nouvelle Catégorie</a></li>
		<?php 
			$sql = "SELECT * FROM categorie WHERE idutilisateur = :idutilisateur ";
			$stm = $pdo->prepare($sql);
			$stm->execute(array(":idutilisateur" => $_SESSION['idutilisateur']));
			while( $categorie = $stm->fetch(PDO::FETCH_ASSOC) ){
				echo "<li><a href='#categorie-".$categorie["idcategorie"]."' class='categorie-".$categorie["idcategorie"]."'>".$categorie["nom"]."</a></li>";
			}
		?>
	</ul>
	<div id="nouvelleCategorie">
		<label for="nomCategorie">Nom de la Catégorie</label>
		<input type="text" name="nomCategorie" id="nomCategorie" class="text ui-widget-content ui-corner-all">		
		<button id="confirmNomCategorie" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">Valider</button>
		<p class="validateTips"></p>
	</div>
	<?php 
		// Récupération des catégories
		$sql = "SELECT idutilisateur, c.idcategorie AS idcategorie, c.nom AS nomCategorie, idimage, description, lien FROM categorie as c LEFT JOIN image as i ON c.idcategorie = i.idcategorie WHERE c.idutilisateur = :idutilisateur";
		$stmCategorie = $pdo->prepare($sql);
		$stmCategorie->execute(array(":idutilisateur" => $_SESSION["idutilisateur"]));
		while( $categorie = $stmCategorie->fetch(PDO::FETCH_ASSOC) ){
			echo "
			<div id='categorie-".$categorie["idcategorie"]."'>
				<h2><span id='nomCategorie-".$categorie["idcategorie"]."'>".$categorie["nomCategorie"]."</span>
					<img id='supprimerCategorie-".$categorie["idcategorie"]."' src='img/croix.png' class='supprimerCategorie right petite_image curseur'/>
					<img id='editCategorie-".$categorie["idcategorie"]."' src='img/vert.png' class='editCategorie center petite_image curseur'/>
				</h2>
				<div id='formImage'></div>
					<button id='nouvelleImage' class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only'>Nouvelle Image</button>
					<br/><br/>
					<ul class='listImage'>
				";
					// Récupération des images
					$sql = "SELECT idimage, nom FROM image WHERE idcategorie = :idcategorie";
					$stmImage = $pdo->prepare($sql);
					$stmImage->execute(array(":idcategorie" => $categorie["idcategorie"]));
					while( $image = $stmImage->fetch(PDO::FETCH_ASSOC) ){
	  					echo "<li id='idImage-".$image["idimage"]."' class='ui-state-default'>
	  							<span class='ui-icon ui-icon-arrowthick-2-n-s'></span><span class='editImage'>".$image["nom"]."</span>
	  							<img id='supprimerImage-".$image["idimage"]."' src='img/croix.png' class='supprimerImage right petite_image curseur'/>
	  						</li>";
					}
  				echo "</ul>
			</div>
			" ;
		}
	?>
</div>



<?php
include("include/footer.php");
include("include/deconnexion.php");
?>