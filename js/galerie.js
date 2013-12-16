$(document).ready(function(){
	
	// Réalise le "formatage" de la page 
	$("#galerie").genererGalerie();
	
	// Autocompletion et recherche
	$("#recherche").on("keyup",function(){
		console.log($(this).val());
		
	});
	
});
