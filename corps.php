<?php 
    include("include/connexion.php");
    include("include/fonction.php");
    
?>
<div id="corps">
	<div id="galerie">
	<?php
	
		// Recherche de l'exista,ce d'image pour cette utilisateur
		$sql = "SELECT COUNT(*) FROM categorie AS c, image AS i WHERE c.idcategorie = i.idcategorie AND c.idutilisateur = :idutilisateur";
		$stm = $pdo->prepare($sql);
		$stm->execute(array(":idutilisateur" => $_SESSION['idutilisateur']));
		$row = $stm->fetch(PDO::FETCH_ASSOC);
		if( $row["COUNT(*)"] == 0 ){
			
			echo "METS LE MESSAGE QUI TE PLAIT !";
			
		} else {
			
			// Création des catégories
			$sql = "SELECT DISTINCT(c.nom) FROM categorie AS c LEFT JOIN image AS i ON c.idcategorie = i.idcategorie WHERE i.nom IS NOT NULL AND idutilisateur = :idutilisateur ";
			$stm = $pdo->prepare($sql);
			$stm->execute(array(":idutilisateur" => $_SESSION['idutilisateur']));
		
			// Création de la liste de catégorie
			echo "<ul>";
			while( $categorie = $stm->fetch(PDO::FETCH_ASSOC) ){
				echo "<li>".$categorie["nom"]."</li>";
			}
			echo "</ul><div>";
			
			// Création des catégories 
			$sql = "SELECT * FROM categorie WHERE idutilisateur = :idutilisateur";
			$stmCategorie = $pdo->prepare($sql);
			$stmCategorie->execute(array(":idutilisateur" => $_SESSION["idutilisateur"]));
			while( $categorie = $stmCategorie->fetch(PDO::FETCH_ASSOC) ){
				echo "<div class='".strtolower(format_dossier($categorie['nom']))."'>";

				// Récupération des images
				if ( isset($_POST["recherche"])) {
					$sql = "SELECT * FROM image WHERE idcategorie = :idcategorie AND ( nom LIKE '%".$_POST['recherche']."%' OR description LIKE '%".$_POST['recherche']."%' AND lien LIKE '%".$_POST['recherche']."%'" ;
				$stmImage = $pdo->prepare($sql);
				$stmImage->execute(array(":idcategorie" => $categorie["idcategorie"]));
				} else {
					$sql = "SELECT * FROM image WHERE idcategorie = :idcategorie";
					$stmImage = $pdo->prepare($sql);
					$stmImage->execute(array(":idcategorie" => $categorie["idcategorie"]));
				}
				while( $image = $stmImage->fetch(PDO::FETCH_ASSOC) ){
					echo "	<div>
								<img src='utilisateurs/".$_SESSION['utilisateur']."/".format_dossier($categorie['nom'])."/".$image['lien']."' alt=''/>
								<div>
									<span>".$image['nom']."</span>
									<p>".$image['description']."</p>
									<ul>
										<li>sapin</li>
										<li>neige</li>
										<li>forêt</li>
									</ul>
								</div>
							</div>";
				}
				echo "</div>";
			}
			echo "</div>";
		}
							
	?>		
	</div>
</div>