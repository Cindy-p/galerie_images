(function($) {
	$.fn.genererGalerie = function(parametres) {
		
		return this.each(function() {
			function precharger(listeImages) {
			    $(listeImages).each(function() {
					$('<img/>')[0].src = this;
					/*console.log($('<img/>')[0].src);*/
			    });
			}

			precharger([
				'img/utilisateur1/noel/noel1.jpg',
				'img/utilisateur1/noel/noel2.jpg',
				'img/utilisateur1/noel/noel3.jpg',
				'img/utilisateur1/chats/chat1.jpg',
				'img/utilisateur1/chats/chat2.jpg',
				'img/utilisateur1/chats/chat3.jpg'
			]);

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

			var centrer = function(objet) {
				objet.css("top", Math.max(0, (($(window).height() - objet.outerHeight()) / 2) + $(window).scrollTop()) + "px");
			    objet.css("left", Math.max(0, (($(window).width() - objet.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
			};

			// Permet de générer la popup
			var popup = function(img) {
				// On supprime la pop-up si elle existait déjà
				if ($("#popup").length)
					$("#popup").remove();

				// On crée la pop-up
				$("#corps").append('<div id="popup"><img src="' + img.attr("src") + '"/></div>');
				
				// Taille de l'image se situant dans la pop-up
				$("#popup img").css("width", $(window).width()*0.5);

				// En cas de dépassement des images du viewport
				/*if ($("#popup img").width() > $(window).width()) {
					$("#popup img").css("width", $(window).width()*0.75);
					if ($("#popup img").height() > $(window).height()) {
						$("#popup img").css("height", $(window).height()*0.75);
					}
				}*/

				// On définit les liens des images suivantes et précédentes
				if (img.parent().get(0) == $(".conteneurImage").get(0)) // Première image (de la catégorie > à faire)
					var imgPrec = ""; // Pas de lien précédent
				else {
					var imgPrec = img.parent().prev().find("img");
				}
					

				if (img.parent().get(0) == $(".conteneurImage").last().get(0)) // Dernière image (de la catégorie > à faire)
					var imgSuiv = ""; // Pas de lien suivant
				else {
					var imgSuiv = img.parent().next().find("img");

					console.log(jQuery.isEmptyObject(imgSuiv));
					console.log(imgSuiv);

					if (jQuery.isEmptyObject(imgSuiv))
						console.log("ok");
				}

				// On associe ces liens aux symboles permettant la navigation
				if (imgPrec != "")
					$("#popup").append('<span id="imgPrec"> < </span>');

				if (imgSuiv != "")
					$("#popup").append('<span id="imgSuiv"> > </span>');

				// Passage à l'image précédente ou suivante
				$("#imgPrec").click(function() {
					popup(imgPrec);
				});
				
				$("#imgSuiv").click(function() {
					popup(imgSuiv);
				});

				// Positionnement de la pop-up dans la page et affichage
				centrer($("#popup"));
				$("#popup").fadeIn("fast");
			};

			$("#galerie img").click(function() {
				popup($(this));
				
				// $("body").append('<div id="fade"></div>');
				// $("#fade").show();
			});

			// $("#fade").click(function() {
			// 	console.log("click fade");
			// 	$("#popup, #fade").fadeOut("fast");
			// });
		});
	};
})(jQuery);