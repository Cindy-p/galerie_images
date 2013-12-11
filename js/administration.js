var tips = "";

$(document).ready(function(){

	var nom = "";
	var description = "";
	var lien = "";
	var allFields = "";
	

/***************************************Catégorie**************************************/
	
    // Création de la liste de catégories
	$( "#listCategorie" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "#listCategorie li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
  
    // Création d'une nouvelle catégorie
    $("#confirmNomCategorie").on("click",function(){ 
    	var estValide = true;
    	var nomCategorie = $("#nomCategorie");
    	tips = $(".validateTips");
    	
    	estValide = estValide && checkLength( nomCategorie, "nom de la catégorie", 1, 255 );
    	estValide = estValide && checkRegexp( nomCategorie, /^[a-zA-Z0-9 áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+$/, "Le nom de dossier peut être composé de chiffre, lettre minuscule et majuscule uniquement!" );
        
    	if ( estValide ){
    			
	    	$.ajax({
	            type: "POST",
	            url: "nouvelle_categorie.php",
	            async : false,
	            data: { nomCategorie : nomCategorie.val() },
	            dataType : "json",
	            statusCode: {
	                404: function() {
	                alert( "La page est introuvable !");
	                }
	            },
	            success: function (data){
	            	console.log(data.msg);
	                if( data.msg != "ok"){
	                	 console.log(data);
	               } else {
	            	   $(location).attr('href',"administration.php");
	               }
	            }
	        });
    	}
    });
    
    // Modification d'un catégorie
    $(".editCategorie").on("click", function(){
    	
    	var idCategorie = ($(this).attr("id").split("editCategorie-"))[1];
    	
    	// Sauvegarde du nouveau nom
    	if ( $(this).hasClass("encours")){
    		
    		var nomCategorie = $("#nomCategorie-"+idCategorie).val();
    		$.ajax({
	            type: "POST",
	            url: "modification_categorie.php",
	            async : false,
	            data: { idCategorie : idCategorie, nomCategorie: nomCategorie  },
	            dataType : "json",
	            statusCode: {
	                404: function() {
	                alert( "La page est introuvable !");
	                }
	            },
	            success: function (data){
	            	console.log(data.msg);
	                if( data.msg != "ok"){
	                	 console.log(data);
	               } else {
	            	   $("#nomCategorie-"+idCategorie).replaceWith("<span id='nomCategorie-"+idCategorie+"'>"+nomCategorie+"</span>");
	            	   $(".categorie-"+idCategorie).html(nomCategorie);
	            	   $(this).removeClass("encours");
	               }
	            }
	        });
    	
    	// Création d'un input pour la modification
    	} else {
    	
	    	$(this).addClass("encours");
	    	var nom = $("#nomCategorie-"+idCategorie).html();
	    	
	    	$("#nomCategorie-"+idCategorie).replaceWith("<input id='nomCategorie-"+idCategorie+"' type='text' value='"+nom+"'/>");
	    	
    	}
    	
    	
    });
    
    
    // Suppression d'un catégorie
    $(".supprimerCategorie").on("click",function(){
    	if(confirm("Voulez-vous réellement supprimer une catégorie ?\n(L'intégralité des images de son contenu sera supprimé)")){
    		var idCategorie = ($(this).attr("id").split("supprimerCategorie-"))[1];
    		var nomCategorie = $("#nomCategorie-"+idCategorie).html();
    		$.ajax({
	            type: "POST",
	            url: "supprimer_categorie.php",
	            async : false,
	            data: { idCategorie : idCategorie, nomCategorie: nomCategorie  },
	            dataType : "json",
	            statusCode: {
	                404: function() {
	                alert( "La page est introuvable !");
	                }
	            },
	            success: function (data){
	            	console.log(data.msg);
	                if( data.msg != "ok"){
	                	 console.log(data);
	               } else {
	            	   $(location).attr('href',"administration.php");
	               }
	            }
	        });
    	}
    });

 /***************************************Images**************************************/
    
    // La liste d'image
    $( ".listImage" ).sortable();
    $( ".listImage" ).disableSelection();
    
    
    // Création d'un nouvelle image
    $("#nouvelleImage").on("click", function(){
    	var url = "formImage.php";
    	
    	// Chargement du formulaire
    	$("#formImage").load(url);
    	
    	// Création de la dialog
		$("#formImage").dialog({
			autoOpen: false,
			height: 350,
			width: 350,
			modal: true,
			buttons: {
				"Création de votre image":{
	                text: "Création de votre image",
	                id: "creationImage",
	                click: function() {
	                    var estValide = true;
	                    allFields.removeClass( "ui-state-error" );
	                    
	                    // Test de longueur
	                    estValide = estValide && checkLength( nom, "nom", 1, 50 );
	                    estValide = estValide && checkLength( description, "description", 0, 255 );
	                    estValide = estValide && checkLength( lien, "fichier", 1, 255 );
	                    
	                    // Test de format
	                    estValide = estValide && checkRegexp( nom, /^[a-z]([0-9a-zA-Z_])+$/i, "Le nom peut être composé de chiffre, lettre minuscule et majuscule!" );
	                    estValide = estValide && checkRegexp( lien, /^([0-9a-zA-Z])+$/, "Le nom de fichier peut être composé de chiffre, lettre minuscule et majuscule" );
	                    
	                    // Tous les test valides
	                    if ( estValide ) {/*
	                        $.ajax({
	                            type: "POST",
	                            url: "nouveau_utilisateur.php",
	                            async : false,
	                            data: { login: login.val(), email: email.val(), password: password.val() },
	                            dataType : "json",
	                            statusCode: {
	                                404: function() {
	                                alert( "La page est introuvable !");
	                                }
	                            },
	                            success: function (data){
	                                if( data.msg != "ok"){
	                                    $("#textAncien").text(data.msg);
	                               } else {
	                                    $(location).attr('href',"index.php");
	                               }
	                            }
	                        });*/
	                    	// Suppression du formulaire
	                    	$(this).html();
	                        $( this ).dialog( "close" );
	                    }
	                }
				},
				Annuler: function() {
					// Suppression du formulaire
                	$(this).html();
					$( this ).dialog( "close" );
				}
			},
			Fermer: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});
		
		// Lancement de la dialog
		$("#formImage").dialog("open");
		
    });
    
});

/*********************************************************************************************************/
/*												Fonction											 */
/*********************************************************************************************************/	

	
	// Affichage d'un texte un cour instant
	function updateTips(t) {
		tips.text( t ).addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	};



	// Vérification de la longueur d'un élément
	function checkLength( o, n, min, max ) {
		if ( o.val().length > max || o.val().length < min ) {
			o.addClass( "ui-state-error" );
			updateTips( "La taille de " + n + " doit être entre " + min + " et " + max + "." );
			return false;
		} else {
			return true;
		}
	};

	// Vérification du format d'un élément
	function checkRegexp( o, regexp, n ) {
		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass( "ui-state-error" );
			updateTips( n );
			return false;
		} else {
			return true;
		}
	};