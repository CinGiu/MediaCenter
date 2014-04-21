/**
 * This function let ajax call to fileManager.php
 * @param nome url of the file
 * @param ordine the command witch php had deal with
 * @param sometimes the second url given
 * @param callBack the function will be called with the data output callBack(data)
 * */
function fileManager(nome,ordine,param,callBack){
	$.ajax({
            type:"POST",
            data:{"command":ordine,"src":nome,"dst":param},
            url:"php/fileManager.php",
            success: function(x){
						
						callBack(x);
							},
			error: function(x){
				alert("siamo nella merda");
			}
        });
}
/**
 * this function reload the screen
 * @param x useless param xD only for joking!
 * */
function aggiornaSchermata(x){
	//document.location.reload(true);
	UpdateFilmList();
}
/**
 * This function call the ajax method fileManager with the opportune 
 * configuration to delete the element nome
 * @param nome the name of the film deleted
 * */
function eliminaFile(nome){
	fileManager(nome,"elimina","",aggiornaSchermata);
}
/**
 * This function call the ajax method fileManger with the opportune 
 * configuration to rename the file
 * @param nome the name of the film selected
 * @param dst the new name of the film selected
 * */
function rinominaFile(nome,dst){
	fileManager(nome,"mv",dst,aggiornaSchermata);
}

function checkRegexp( o, regexp, n ) {
  if ( !( regexp.test( o.val() ) ) ) {si
	o.addClass( "ui-state-error" );
	updateTips( n );
	return false;
  } else {
	return true;
  }
}
