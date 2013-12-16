<?php 
    $page = array( "titre" => "Nicody Galerie - Accueil");
    include("include/header.php");
    include("include/connexion.php");
    include("include/fonction.php");

 ?>
		<div id="corps">
			<div id="galerie">
			<?php
			
				// Création des catégories
				$sql = "SELECT * FROM categorie WHERE idutilisateur = :idutilisateur ";
				$stm = $pdo->prepare($sql);
				$stm->execute(array(":idutilisateur" => $_SESSION['idutilisateur']));
				
				if( $stm->rowCount() == 0 ){
					
					echo "METS LE MESSAGE QUI TE PLAIT !";
					
				} else {

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
						echo "<div class='".$categorie['nom']."'>";

						// Récupération des images
						$sql = "SELECT * FROM image WHERE idcategorie = :idcategorie";
						$stmImage = $pdo->prepare($sql);
						$stmImage->execute(array(":idcategorie" => $categorie["idcategorie"]));
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
												<li>test</li>
												<li>test</li>
												<li>test</li>
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
<?php
	 include ("include/footer.php");
?>