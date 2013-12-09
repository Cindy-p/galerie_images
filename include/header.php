<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8"/>
		<title><?php echo $page["titre"]; ?></title>
		<link rel="stylesheet" href="css/style.css"/>
		<!--[if lte IE 7]>
<link rel="stylesheet" type="text/css" href="css/style_ie.css"/>
<![endif]-->
		
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
					<a href="administration.php">Administration</a>
				</li>
				<li>
					<form action="" id="recherche">
						<input type="text" placeholder="Recherche..."/>
					</form>
				</li>
			</ul>
		</div>