<?php 
	if(session_id() == "") session_start(); // Vérification de l'existance de session
	if (!isset($_SESSION["utilisateur"])) header("Location: authentification.php"); // Redirection si l'utilisateur ne s'est pas identifié
	header('Content-Type: text/html; charset=utf-8');	// Encodage UTF-8 PHP

?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8"/>
		<title>Nicody Galerie - Accueil</title>
		<?php include("include/header.php"); ?>
		<link rel="stylesheet" href="css/style.css"/>
		
		<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="js/generer_galerie.jquery.js"></script>
		<script type="text/javascript" src="js/galerie.js"></script>
	</head>
	<body>
		<div id="entete">
			<div id="nomSite">
				<a href="index.php">Nicody Galerie</a>
			</div>
			<ul id="navigation">
				<li>
					<a href="index.php">Accueil</a>
				</li>
				<li>
					<a href="#">Galerie</a>
				</li>
				<li>
					<a href="#">Administration</a>
				</li>
				<li>
					<form action="" id="recherche">
						<input type="text" placeholder="Recherche..."/>
					</form>
				</li>
			</ul>
		</div>
		<div id="corps">
			<div id="galerie">
				<ul>
					<li>Noël</li>
					<li>Chats</li>
				</ul>
				<div class="noel">
					<div>
						<img src="img/utilisateur1/noel/noel1.jpg" alt=""/>
						<div>
							<span>Noël 1</span>
							<p>Description 1</p>
						</div>
					</div>
					<div>
						<img src="img/utilisateur1/noel/noel2.jpg" alt=""/>
						<div>
							<span>Noël 2</span>
							<p>Description 2</p>
						</div>
					</div>
					<div>
						<img src="img/utilisateur1/noel/noel3.jpg" alt=""/>
						<div>
							<span>Noël 3</span>
							<p>Description 3</p>
						</div>
					</div>
				</div>
				<div class="chats">
					<div>
						<img src="img/utilisateur1/chats/chat1.jpg" alt=""/>
						<div>
							<span>Chat 1</span>
							<p>Description 1</p>
						</div>
					</div>
					<div>
						<img src="img/utilisateur1/chats/chat2.jpg" alt=""/>
						<div>
							<span>Chat 2</span>
							<p>Description 2</p>
						</div>
					</div>
					<div>
						<img src="img/utilisateur1/chats/chat3.jpg" alt=""/>
						<div>
							<span>Chat 3</span>
							<p>Description 3</p>
						</div>
					</div>
				</div>				
			</div>
		</div>
	</body>
</html>