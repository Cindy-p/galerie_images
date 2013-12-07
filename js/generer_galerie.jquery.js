(function($) {
	$.fn.genererGalerie = function(parametres) {
		
		return this.each(function() {
			var divConteneurImage = $("img").parent();

			$("#galerie ul").attr("id", "categories");
			$("#categories").prepend('<li>Tous</li>');

			$("#categories li").each(function(index) {
				console.log("index : " + index + ", text : " + $(this).text());
			});

			$("img").addClass('miniature');
			divConteneurImage.addClass('conteneurImage');
		});

	};
})(jQuery);