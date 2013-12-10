$(document).ready(function(){
	
	// Réalise le "formatage" de la page 
	$("#galerie").genererGalerie();
	
/*********************************************************************************/
/*	PARTIE ADMINISTRATION	*/
/*********************************************************************************/
	
	
	// Création de la liste de catégories
	$( "#listCategorie" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "#listCategorie li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
  
    // Création d'une nouvelle catégorie
    $("a[href=#nouvelleCategorie]").on("click",function(){
    	$.ajax({
            type: "POST",
            url: "nouvelle_categorie.php",
            async : false,
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
                   $(location).reload();
               }
            }
        });
    });
    
	
});
