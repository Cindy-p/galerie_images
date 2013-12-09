<?php 
	if(session_id() == "") session_start(); // Vérification de l'existance de session
	if (!isset($_SESSION["utilisateur"])) header("Location: authentification.php"); // Redirection si l'utilisateur ne s'est pas identifié
	header('Content-Type: text/html; charset=utf-8');	// Encodage UTF-8 PHP
		$page = array("titre" => "Nicody Galerie - Accueil");
		include("include/header.php");
?>
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
<?php

    include ("include/footer.php");
?>