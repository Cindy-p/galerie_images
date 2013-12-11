var tips = "";

$(document).ready(function(){


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
    
    // Suppression d'un catégorie
    $(".supprimerCategorie").on("click",function(){
    	if(confirm("Voulez-vous réellement supprimer une catégorie ?\n(L'intégralité des images de son contenu sera supprimé)")){
    		var idCategorie = ($(this).attr("id").split("supprimerCategorie-"))[1];
    		var nomCategorie = $("#nomCategorie-"+idCategorie).html();
    		$.ajax({
	            type: "GET",
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