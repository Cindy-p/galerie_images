(function($) {
	$.fn.genererGalerie = function(parametres) {
		
		return this.each(function() {
			var divConteneurImage = $("img").parent();
			divConteneurImage.addClass('conteneurImage');

			$("#galerie>div").css("display", "inline");

			// On définit un id à la liste des catégories et des images
			$("#galerie ul").attr("id", "categories");
			// $("#categories").next().attr('id', 'listeImages');

			// On ajoute la catégorie qui affichera toutes les images
			$("#categories").prepend('<li>Tous</li>');

			// Affichage des images en fonction des catégories
			$("#categories li").each(function(index) {
				$(this).click(function() {
					$(".conteneurImage").hide();
					var nomCategorie = $(this).text().toLowerCase().replace(/[èéêë]/g, "e");
					if (nomCategorie != "tous") {
						$(".conteneurImage").each(function() {
							if ($(this).parent().attr("class") == nomCategorie) {
								$(this).fadeIn("slow");
							}
						});
					}
					else {
						$(".conteneurImage").fadeIn("slow");
					}
				});
			});

			// Création des miniatures
			$("img").addClass('miniature');
		});
	};
})(jQuery);