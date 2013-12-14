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

			var nomCategorie = "tous";

			var divConteneurImage = $("#galerie img").parent();
			divConteneurImage.addClass("conteneurImage");

			$("#galerie>div").attr('id', 'listeImages');
			$("#listeImages>div").css("display", "inline");
			$("#listeImages>div").addClass("categorie");

			// On définit un id à la liste des catégories et des images
			$("#galerie>ul").attr("id", "categories");

			// On ajoute la catégorie qui affichera toutes les images
			$("#categories").prepend('<li>Tous</li>');

			$("#galerie .conteneurImage ul").addClass("tags");
			$("#galerie .conteneurImage span").addClass("titre");

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
						nomCategorie = $(this).text().toLowerCase().replace(/[èéêë]/g, "e");
						// Pb IE au niveau du hasClass (fonctionne avec chaine en dur)
						if (nomCategorie != "tous") {
							$(".conteneurImage").each(function() {
								if ($(this).parent().hasClass(nomCategorie)) {
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
				objet.css("top", Math.max(0, (($(window).height() - objet.outerHeight()) / 2)) + "px");
			    objet.css("left", Math.max(0, (($(window).width() - objet.outerWidth()) / 2)) + "px");
			};

			// Permet de générer la popup
			var popup = function(img) {
				// On supprime la pop-up si elle existait déjà
				if ($("#popup").length)
					$("#popup").remove();

				// On crée la pop-up
				$("#galerie").append('<div id="popup"><img src="' + img.attr("src") + '"/></div>');
				
				// Taille de l'image se situant dans la pop-up
				$("#popup img").css("width", $(window).width()*0.5);

				// En cas de dépassement des images du viewport
				/*if ($("#popup img").width() > $(window).width()) {
					$("#popup img").css("width", $(window).width()*0.75);
					if ($("#popup img").height() > $(window).height()) {
						$("#popup img").css("height", $(window).height()*0.75);
					}
				}*/

				// Lien précédent
				var divCategorie = img.parent().parent();
				if ((nomCategorie == "tous" && img.parent().get(0) == $('.conteneurImage').get(0)) ||
					(nomCategorie != "tous" && img.parent().get(0) == divCategorie.find('.conteneurImage').get(0))) {
					var imgPrec = ""; // Pas de lien précédent
				}
				else if (nomCategorie == "tous" && img.parent().get(0) == divCategorie.find('.conteneurImage').get(0) &&
						img.parent().get(0) != $('.conteneurImage').get(0)) {
					/* Si on se situe dans la catégorie "tous", que l'image est la première d'une div catégorie
					   mais pas la première de la catégorie "tous" */
					var imgPrec = divCategorie.prev().find('.conteneurImage img').last();
				}
				else {
					var imgPrec = img.parent().prev().find("img");
				}

				// Lien suivant
				if ((nomCategorie != "tous" && img.parent().get(0) == divCategorie.find('.conteneurImage').last().get(0)) ||
					(nomCategorie == "tous" && img.parent().get(0) == $('.conteneurImage').last().get(0))) {
					// Si l'image est la dernière de la catégorie sélectionnée
					var imgSuiv = ""; // Pas de lien suivant
				}
				else if (nomCategorie == "tous" && img.parent().get(0) == divCategorie.find('.conteneurImage').last().get(0) &&
						img.parent().get(0) != $('.conteneurImage').last().get(0)) {
					/* Si on se situe dans la catégorie "tous", que l'image est la dernière d'une div catégorie
					   mais pas la dernière de la catégorie "tous" */
					var imgSuiv = divCategorie.next().find('.conteneurImage img');
				}
				else {
					var imgSuiv = img.parent().next().find("img");
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
				
				$("body").append('<div id="fade"></div>').show();
				$('#fade').css({'filter' : 'alpha(opacity=30)'}).show(); // Pour IE
			});

			$("#fade").click(function() {
				console.log("click fade");
				$("#popup, #fade").fadeOut("fast");
			});
		});
	};
})(jQuery);