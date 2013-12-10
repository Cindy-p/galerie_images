<?php
$page = array("titre" => "Nicody Galerie - Administration");
include("include/header.php");

include("include/connexion.php");
?>

<div id="listCategorie">
	<ul>
		<?php 
			$sql = "SELECT * FROM categorie WHERE idutilisateur = ".$_SESSION['idutilisateur'];
			$stm = $pdo->query($sql);
			while( $categorie = $stm->fetch(PDO::FETCH_ASSOC) ){
				echo "<li><a href='#categorie-".$categorie["idcategorie"]."'>".$categorie["nom"]."</a></li>";
			}
		?>
		<li><a href="#nouvelleCategorie">Nouvelle Catégorie</a></li>
	</ul>
	<?php 
		$sql = "SELECT * FROM categorie as c LEFT JOIN image as i ON c.idcategorie = i.idcategorie WHERE c.idutilisateur = ".$_SESSION['idutilisateur']."  ";
		$stm = $pdo->query($sql);
		while( $categorie = $stm->fetch(PDO::FETCH_ASSOC) ){
			echo "" ;
		}
	?>
	<div id="nouvelleCategorie">
		<form>
			<label for="login">Identifiant</label>
			<input type="text" name="nouveauLogin" id="nouveauLogin" class="text ui-widget-content ui-corner-all">		
		</form>
	</div>
</div>



<?php
include("include/footer.php");
include("include/deconnexion.php");
?>