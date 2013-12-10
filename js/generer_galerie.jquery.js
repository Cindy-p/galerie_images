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

			var popup = function(lienImg) {
				// On supprime la pop-up si elle existait déjà
				// if ($("#popup").length)
				// 	$("#popup").remove();

				// On crée la pop-up
				$("#corps").append('<div id="popup"><img src="' + lienImg + '"/></div>');

				// Positionnement de la pop-up dans la page
				$("#popup").css("top", Math.max(0, (($(window).height() - $("#popup").outerHeight()) / 2) + 
	                                            $(window).scrollTop()) + "px");
			    $("#popup").css("left", Math.max(0, (($(window).width() - $("#popup").outerWidth()) / 2) + 
			                                    $(window).scrollLeft()) + "px");

			    // Taille de l'image (de la pop-up)
			    $("#popup img").css("width", $(window).width()*0.5);

			    /*if ($("#popup img").width() > $(window).width()) {
					
					$("#popup img").css("width", $(window).width()*0.75);
					if ($("#popup img").height() > $(window).height()) {
						$("#popup img").css("height", $(window).height()*0.75);
					}
				}*/
			}

			// Affichage de l'image en grande taille
			$("img").click(function() {
				popup($(this).attr("src"));

				// On définit les liens des images suivantes et précédentes
				if ($(this).parent().get(0) == $(".conteneurImage").get(0))
					var imgPrec = "";
				else
					var imgPrec = $(this).parent().prev().find("img").attr("src");

				if ($(this).parent().get(0) == $(".conteneurImage").last().get(0))
					var imgSuiv = "";
				else
					var imgSuiv = $(this).parent().next().find("img").attr("src");

				if (imgPrec != "")
					$("#popup").append('<span id="imgPrec"> < </span>');

				if (imgSuiv != "")
					$("#popup").append('<span id="imgSuiv"> > </span>');

				$("#imgPrec").click(function() {
					popup(imgPrec);
				});
				
				$("#imgPrec").click(function() {
					// popup(imgSuiv);
				});


				// Affichage de la pop-up avec effet de fondu
				$("#popup").fadeIn("fast");
				// $("body").append('<div id="fade"></div>');
				// $("#fade").show();
			});

			// $("#fade").click(function() {
			// 	console.log("test");
			// 	$("#popup, #fade").fadeOut("fast");
			// });
		});
	};
})(jQuery);