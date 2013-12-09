(function($) {
	$.fn.genererGalerie = function(parametres) {
		
		return this.each(function() {
			var divConteneurImage = $("img").parent();
			divConteneurImage.addClass('conteneurImage');

			$("#galerie>div").css("display", "inline");

			// On définit un id à la liste des catégories et des images
			$("#galerie>ul").attr("id", "categories");

			$("#galerie .conteneurImage ul").addClass("tags");
			$("#galerie .conteneurImage span").addClass("titre");

			// On ajoute la catégorie qui affichera toutes les images
			$("#categories").prepend('<li>Tous</li>');

			// Affichage des images en fonction des catégories
			var precedCategorie = $("#categories li").first();
			precedCategorie.addClass("select");
			$("#categories li").each(function() {
				$(this).click(function() {
					var selectCategorie = $(this);
					selectCategorie.addClass("select");
					if (selectCategorie.text() != precedCategorie.text()) {
						precedCategorie.removeClass("select");
						precedCategorie = selectCategorie;
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
					}
				});
			});

			// Création des miniatures
			$("img").addClass('miniature');

			// Description qui s'affiche au survol de la souris
			$(".conteneurImage p").addClass("description");

			$(".conteneurImage img").each(function() {
				var description = $(this).siblings("div").children(".description");
				$(this).mouseenter(function() {
					description.fadeIn("fast");
				});

				$(this).mouseleave(function() {
					description.fadeOut("fast");
				});

				$(this).mousemove(function(event) {
					description.css("left", event.pageX);
					description.css("top", event.pageY);
					description.show();
				});
			});
		});
	};
})(jQuery);