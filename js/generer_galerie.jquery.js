(function($) {
	$.fn.genererGalerie = function(parametres) {
		
		return this.each(function() {
			var divConteneurImage = $("#galerie img").parent();
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

			// Affichage de l'image en grande taille
			$("img").click(function() {
				if ($(this).parent().get(0) == $(".conteneurImage").get(0)) {
					var imgPrec = "";
				}
				else {
					var imgPrec = $(this).parent().prev().find("img");
				}

				if () {

				}
				else {
					
				}

				
				var imgSuiv = $(this).parent().next().find("img");

				// console.log(imgPrec);

				$("#corps").append('<div id="popup"><img src="' + $(this).attr("src") + '"/></div>');
				
				console.log(imgPrec);
				console.log(imgSuiv);

				if (imgPrec != "") {
					$("#popup").append('<span id="imgPrec"> < </span>');
				}

				if (imgSuiv != null) {
					$("#popup").append('<span id="imgSuiv"> > </span>');
				}
				
				

				$("body").append('<div id="fade"></div>');

				// console.log($("#popup").outerHeight());
				// console.log($("#popup").outerWidth());

				$("#popup").css("top", Math.max(0, (($(window).height() - $("#popup").outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
			    $("#popup").css("left", Math.max(0, (($(window).width() - $("#popup").outerWidth()) / 2) + 
			                                                $(window).scrollLeft()) + "px");

			    $("#popup img").css("width", $(window).width()*0.75);

				if ($("#popup img").width() > $(window).width()) {
					
					$("#popup img").css("width", $(window).width()*0.75);
					if ($("#popup img").height() > $(window).height()) {
						$("#popup img").css("height", $(window).height()*0.75);
					}
				}

				
				$("#popup").fadeIn("fast");
				/*$("#fade").show();*/

				// $('body').append('<div id="fade"></div>');
			});

			$("#fade").click(function() {
				$("#popup, #fade").fadeOut("fast");
			});
		});
	};
})(jQuery);