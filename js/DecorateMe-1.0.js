/*
 * Un piccolo Framework per arricchire una <ul> 
 * usage: addBgStyle("film"); nel caso <ul id="film"></ul>
 * 
 * history
 * v 0.1 aggiunte funzioni principali per la ricerca del bg
 * v 0.2 aggiunte le news e la gestione cookies
 * v 0.3 aggiunto il bottone more per avere più informazioni sul <a>
 * v 0.4 migliorata la ricerca delle immagini 
 * v 0.5 trailer http://gdata.youtube.com/feeds/mobile/videos?alt=json-in-script&q=' + yourquerykeyword
 * v 0.6 aggiunta gestione modifica file e cancellazione
 * @author Daniele Baschieri
 * @version 0.6 still beta
 */
 
 
/**
 * With this method you can add a dinamic background style
 * and a lot of other features in your <ul />
 * @param ele The id of an <ul> element
 */  
function addBgStyle(ele){
		var cont=0;
		addStandardBgInfo("li");
		$("#"+ele+" li").each(function(index){
				var t=this;
				if(checkIfIsInLocalStorage($(t).find("a.listfilm").text())){
					var nomeDelFilm=$(t).find("a.listfilm").text();
					addIfIsNotInLocalStorage(t,nomeDelFilm);
					addMoreInfoOnLink(t,nomeDelFilm);
				}
				else{
					setTimeout(function(){
						//firstGoogleImg(t,$(t).find("a").text());
						var nomeDelFilm=$(t).find("a.listfilm").text();
						addIfIsNotInLocalStorage(t,nomeDelFilm);
						addMoreInfoOnLink(t,nomeDelFilm);
					},cont*500);
					cont++;
				}
			   
		});
}

/**
 * This method call che successoRemota(ele,data,query) 
 * asincroniusly.
 * The data param will be fullfill with the json object returned from
 * https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=query
 * 
 * @param ele the element witch you want add the background img
 * @query the name of the film you want search the img
 * */
function firstGoogleImg(ele,query){
		https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=Google
		$.ajax({
				  type: 'GET',
				  url: "php/cross.php",
				  data: {"url":"https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+encodeURI(query)},
				  success: function(data){ successoRemota(ele,data,query)},
				  error: fallimentoRemota
				});
}
/**
 * Portion of the upper <ul> occupated by the <li> element
 */
var size_x="90%";
/**
 * Vertical portion of the <ul> occupated by the <li> element
 * */
var size_y=150;

/**
 * This function is called asincroniusly by the firstGoogleImg(ele,query)
 * side effect try to add the bg at the element ele
 * if it cant try again.
 * @param ele the element witch we want add the bg info
 * @param data the raw json object returnde from https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=Google
 * @param query the name of the film chosen
 * */
function successoRemota(ele,data,query){
		var js=JSON.parse(data);
		var p=js.responseData;
		//alert(js.responseData.results[0].unescapedUrl);
		var url="";
		try{
			url=js.responseData.results[0].unescapedUrl;
			checkIfCanBeLoad(ele,js,query,0);
			/*questo funzionava
			$(ele).css("background-image",'url("'+url+'")');
			localStorage.setItem(query,url);   */     
		}catch(e){
		}
	   //"php/cross.php?url="

}
/**
 * This function check if an element can be load, for example an url
 * @param ele the element witch we want add the bg
 * @param js the json object returned with all the img url
 * @param query the name of the film searched
 * @param tentativo the number of tries done (so the img of the js chosen)
 * */
function checkIfCanBeLoad(ele,js,query,tentativo){
	var url=js.responseData.results[tentativo].unescapedUrl;
	$(ele).css("background-image",'url("'+url+'")');;
	localStorage.setItem(query,url);
	var img = new Image();
	$(img).error(function(){
		checkIfCanBeLoad(ele,js,query,tentativo+1);
		//alert("qualcosa è andato a merda");
	}).attr("src",url);
}

/**
 * Check if something ends with the suffix
 * example "fucking".endsWith("ing");
 * */
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
/**
 * This method will be moved to css soon!
 * Add the standard background info to the element like with and size
 * @param ele the element witch we want decorate
 * */
function addStandardBgInfo(ele){
		$(ele).css("color","white");
		$(ele).css("width",size_x);
		$(ele).css("height",size_y);
		$(ele).css("background-repeat","no-repeat");
		$(ele).css("background-attachment","absolute");
		$(ele).css("background-position","0px 50%");
		$(ele).css("background-size","100% auto");
		$(ele).css("-moz-background-size","100% auto");
		$(ele).css("font-weight","bold");
		$(ele).css("font-size","2em");
		$(ele).css("padding-top","35px");
		$(ele).css("-webkit-border-radius","9px");
		$(ele).css("-moz-border-radius","9px");
		$(ele).css("border-radius","9px");
		$(ele).css("margin-top","25px");
		$(ele).css("margin-bottom","10px");
		$(ele).css("white-space","nowrap");
		$(ele).css("overflow","hidden");
		$(ele).css("text-indent","20px");
		$(ele).css("font-family","Century Gothic, sans-serif");
		
		$(ele).find("div.tool").css("padding-left","35%");
		$(ele).find("div.tool").css("margin-top",size_y/2+"px");
}

/**
 * This method will be called if the remote call fail
 * it can be very annoing so we had to change with something less
 * invasive than an allert
 * @param data returned from the ajax call
 * */
function fallimentoRemota(data){
	    //alert(data.status);
	   // alert("fail");
}

/**
 * This method add more info on a link ele
 * Add the NEWS label if this element isent loaded 3 times yet
 * Add the tools gird 
 * 
 * @param ele the element witch we want to add more info
 * @param nome the name of the element (film)
 * */
function addMoreInfoOnLink(ele,nome){
	var t=getCookie(encodeURI(nome));
	if(t>2){
		$(ele).append('<div class="news"></div>');
	}
	else
	{
		$(ele).append('<div class="news">NEWS</div>');
		$(".news").css("transform","rotate(15eg)");
		$(".news").css("-ms-transform","rotate(15deg)"); /* Internet Explorer */
		$(".news").css("-moz-transform","rotate(15deg)"); /* Firefox */
		$(".news").css("-webkit-transform","rotate(15deg)"); /* Safari and Chrome */
		$(".news").css("-o-transform","rotate(15deg)"); /* Opera */
		$(".news").css("z-index","100");
		$(".news").css("background-color","blue");
		$(".news").css("width","150px");
		$(".news").css("position","relative");
		$(".news").css("margin-left","80%");
		$(".news").css("margin-top","-50px");
		if(isNaN(t))t=0;
		else t++;
		setCookie(encodeURI(nome),t,360);
	}
	


	$(ele).find("div.tool").append('<a href="http://www.google.it/search?q='+encodeURI(nome)+'" class="bmore"><img src="css/DecorateMeImg/search.png" /></a>');	
	$(ele).find("div.tool").append('<a onClick="searchForTrailer(\''+nome+'\')" href=#" class="bmore"><img src="css/DecorateMeImg/youtube.png" /></a>');
	$(ele).find("div.tool").append('<a href="http://www.facebook.com/share.php?u=http://www.google.it/search?q='+encodeURI(nome)+'" onclick="return fbs_click()" target="_blank" class="bmore"><img src="css/DecorateMeImg/facebook.png" /></a>');
	$(ele).find("div.tool").append('<a href="https://twitter.com/share?text='+encodeURI("Sto guardando questo bel film "+nome)+'" class="bmore"><img src="css/DecorateMeImg/twitter.png" /></a>');
	$(ele).find("div.tool").append('<a onClick="showRinominaDialog(\''+$(ele).find("span.listfilm").attr("href")+'\')" href=#" class="bmore"><img src="css/DecorateMeImg/modifica.png" /></a>');
	$(ele).find("div.tool").append('<a onClick="showEliminaDialog(\''+$(ele).find("span.listfilm").attr("href")+'\')" href=#" class="bmore"><img src="css/DecorateMeImg/elimina.png" /></a>');
	$(ele).find("div.tool").hide();
	$(ele).live("click",function(){
		$(this).find("div.tool").toggle();
	});
}

/**
 * This method check if the film "nomeDelFilm" is in the localStorage
 * @param ele element selected
 * @param nomeDelFilm
 * @return boolean true if yes false if not
 * */
function checkIfIsInLocalStorage(ele,nomeDelFilm){
	if(typeof(Storage)!=="undefined"){
	   //localStorage.setItem(nomeDelFilm,"");	
		if ( localStorage.getItem(nomeDelFilm)) {
			return true;
		}
	}
	return false;
}

/**
 * This method add at the loacalStorage if the NomeDelFilm is not present yet.
 * 
 * @param ele the element 
 * @param nomeDelFilm the name of the film will be added to the local storage (the url will be added)
 * */
function addIfIsNotInLocalStorage(ele,nomeDelFilm){
   if(typeof(Storage)!=="undefined"){
	   //localStorage.setItem(nomeDelFilm,"");	
		if ( localStorage.getItem(nomeDelFilm)) {
			//è già presente in memoria
			var url = localStorage.getItem(nomeDelFilm);
			$(ele).css("background-image",'url("'+url+'")');      
		}
		else{
			//bisogna caricarla e memorizzarla
			firstGoogleImg(ele,nomeDelFilm);			
		}
	   
	}
	else{
		//Inutile memorizzare e caricare le immagini se non funziona il webStorage
   }
}

/**
 * This function search asincroiniously in youtube for a trailer of the movies
 * it call the function successoTrailer(data,nomeDelFilm)
 * 
 * @param nomeDelFilm the name of the film searched
 * */
function searchForTrailer(nomeDelFilm){
	//http://gdata.youtube.com/feeds/mobile/videos?alt=json-in-script&q=' + yourquerykeyword
	$.ajax({
				  type: 'GET',
				  url: "http://gdata.youtube.com/feeds/mobile/videos?alt=json-in-script&q="+encodeURI(nomeDelFilm),
				  dataType: 'jsonp',
				  //data: {"url":"},
				  success: function(data){ successoTrailer(data,nomeDelFilm)},
				  error: fallimentoRemota
				});
}

/**
 * This function append to the body a div with the id trailer
 * insed of this id he add an iframe with the url of the trailer of the film
 * "nomeDelFilm"
 * @param nomeDelFilm the name of the film searched for the trailer
 * @data the json with a lot of url of the trailer
 * */
function successoTrailer(data,nomeDelFilm){
	//alert(data);
	//var js=JSON.parse(data);
	//data.feed.entry[0].media$group.media$thumbnail[0].url
	var url=data.feed.entry[0].link[0].href.split("&")[0];
	var url=url.split("v=")[1];
	//alert(url);
	$("body").append("<div id=trailer ><button onClick=\"chiudiTrailer()\">chiudi</button><iframe src=\"http://www.youtube.com/embed/"+url+"\"></iframe></div>");
	$("#trailer").css("position","fixed");
	$("#trailer").css("width","640px");
	$("#trailer").css("height","480px");
	$("#trailer").css("z-index","1000");
	$("#trailer").css("top","100px");
	$("#trailer").css("left","200px");
}

/**
 * This function is called by the trailer preview screen 
 * let it be closed.
 * */
function chiudiTrailer(){
	$("#trailer").hide();
	$("#trailer").html("");
	$("#trailer").attr("id","");
}


/**
 * This function let people delete film in the <ul>
 * @param nome the url source of the film will be deleted
 * */
function showEliminaDialog(nome){
	$("#inputDialog").attr("title","Remove this file");
	$("#inputDialog").append('<p>Are you sure! You want permanently delete : '+nome+'</p>');
	$( "#inputDialog" ).dialog({
      autoOpen: false,
      height: 300,
      width: 400,
      modal: true,
      buttons: {
        "Delete": function() {
			eliminaFile(nome);
            $( this ).dialog( "close" );
            $("#inputDialog").html("");
        },
        Cancel: function() {
          $( this ).dialog( "close" );
          $("#inputDialog").html("");
        }
      },
      close: function() {
      }
    });
	$( "#inputDialog" ).dialog( "open" );
}
/**
 * This method show a dialog witch let people rename a film
 * @param nome the full url of the film wich can be renamed.
 * */
function showRinominaDialog(nome){
	$("#inputDialog").attr("title","Muove or Rename a file");
	$("#inputDialog").append('<p>You can set an absolute path to move the file.</p><p>The file chosen is '+nome+'</p><form>'+
'  <fieldset>'+
'    <label for="name">Name</label>'+
'    <input type="text" name="name" id="NewName"  class="text ui-widget-content ui-corner-all" style="width:100%;"value="'+nome+'" />'+
'  </fieldset>'+
'  </form>');
	$( "#inputDialog" ).dialog({
      autoOpen: false,
      height: 300,
      width: 400,
      modal: true,
      buttons: {
        "Move or Rename a File": function() {
		  var name = $( "#NewName" );
          var bValid = true;
  
          //bValid = bValid && checkRegexp( name, /^[a-zAZ \/.]([0-9a-zAZ \/._])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
 
          if ( bValid ) {
				alert("Rinomino il file "+nome+" in " + $(name).val());
				rinominaFile(nome,$(name).val());
            $( this ).dialog( "close" );
            $("#inputDialog").html("");
          }
        },
        Cancel: function() {
          $( this ).dialog( "close" );
          $("#inputDialog").html("");
        }
      },
      close: function() {
      }
    });
	$( "#inputDialog" ).dialog( "open" );
}



