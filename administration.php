<?php
$page = array(
        "titre" => "Nicody Galerie - Administration",
        "script" => array( "js/administration.js")
        );
include("include/header.php");

include("include/connexion.php");
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
		<button id="confirmNomCategorie">Valider</button>
		<p class="validateTips"></p>
	</div>
	<?php 
		$sql = "SELECT idutilisateur, c.idcategorie AS idcategorie, c.nom AS nomCategorie, idimage, description, lien FROM categorie as c LEFT JOIN image as i ON c.idcategorie = i.idcategorie WHERE c.idutilisateur = :idutilisateur";
		$stm = $pdo->prepare($sql);
		$stm->execute(array(":idutilisateur" => $_SESSION["idutilisateur"]));
		while( $categorie = $stm->fetch(PDO::FETCH_ASSOC) ){
			echo "
			<div id='categorie-".$categorie["idcategorie"]."'>
				<h2><span id='nomCategorie-".$categorie["idcategorie"]."'>".$categorie["nomCategorie"]."</span>
					<img id='supprimerCategorie-".$categorie["idcategorie"]."' src='img/croix.png' class='supprimerCategorie right petite_image curseur'/>
					<img id='editCategorie-".$categorie["idcategorie"]."' src='img/vert.png' class='editCategorie center petite_image curseur'/>
				</h2>
				<div id='formImage'></div>
				<button id='nouvelleImage' class='ui-state-default'>Nouvelle Image</button>
				<br/><br/>
				<ul class='listImage'>
					<li id='nouvelleImage' class='ui-state-default'>test</li>
 				
				";
  					//<li class='ui-state-default'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>test</li>
 				
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