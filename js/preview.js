function addFilmEventListener(){
	$(".listfilm").click(function(){
		//showManagerDialog(this,'[{"runtime": ["126 min"], "rating": 6.9, "genres": ["Drama", "Romance"], "rated": "PG-13", "language": ["English"], "title": "P.S. I Love You", "filming_locations": "County Wicklow, Ireland", "poster": {"imdb": "http://ia.media-imdb.com/images/M/MV5BNTg2MDg4MjI5NV5BMl5BanBnXkFtZTcwMzQ0MDczMw@@._V1_SY317_CR0,0,214,317_.jpg", "cover": "http://imdb-poster.b0.upaiyun.com/000/431/308.jpg!cover?_upt=d74383ed1377054201"}, "imdb_url": "http://www.imdb.com/title/tt0431308/", "writers": ["Richard LaGravenese", "Steven Rogers"], "imdb_id": "tt0431308", "directors": ["Richard LaGravenese"], "rating_count": 105658, "actors": ["Hilary Swank", "Gerard Butler", "Lisa Kudrow", "Gina Gershon", "James Marsters", "Kathy Bates", "Harry Connick Jr.", "Nellie McKay", "Jeffrey Dean Morgan", "Christopher Whalen", "Dean Winters", "Anne Kent", "Brian McGrath", "Sherie Rene Scott", "Susan Blackwell"], "plot_simple": "A young widow discovers that her late husband has left her 10 messages intended to help ease her pain and start a new life.", "year": 2007, "country": ["USA"], "type": "M", "release_date": 20071221, "also_known_as": ["P.S. Volim te"]}]');
		omdbApiCall(this,$(this).text()); 
	});
}
function omdbApiCall(ele,title){
	$.ajax({
		  type: 'GET',
		  url: "http://www.omdbapi.com/?t="+title.replace(/  /g,"+").replace(/ /g,"+"),
		  success: function(data){ checkDataRecived(ele,data,fillFieldOMDB,filmNotFound,title)},
		  error: function(){filmNotFound(ele,title);}
		});
}
function imdbApiCall(ele,title){
	$.ajax({
		  type: 'GET',
		  url: "http://mymovieapi.com/?title="+title.replace(/ /g,"+")+"&type=json&plot=simple&episode=1&limit=1&yg=0&mt=none&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0",
		  success: function(data){ checkDataRecived(ele,data,fillFieldIMDB,omdbApiCall,title)},
		  error: function(){omdbApiCall(ele,title);}
		});
}
function fallimentoRemota(data){
	alert(data.status);
	alert("fail");
}

function checkDataRecived(ele,data,fillField,alternative,title){
	var js=JSON.parse(data);
	if((js.code!=404)&&(js.Response!="False")){		
		showManagerDialog(ele,js,fillField)
	}
	else{
		alternative(ele,title);
	}
}

function filmNotFound(ele,title){
	var js="";
	showManagerDialog(ele,js,fillFieldVoid);
}
function fillFieldIMDB(ele,js) {
	try{
		$("#copertina").attr("src","php/cross.php?url="+js[0].poster.imdb);
	}catch(e){
		firstGoogleImgFast(ele,$(ele).text());
	}
	try{
	$("#title").text(js[0].title);
	}catch(e){}
	try{
	$("#year").text(js[0].year);
	}catch(e){}
	try{
	$("#rating").text(js[0].rating);
	}catch(e){}
	try{
	$("#runtime").text(js[0].runtime);
	}catch(e){}
	try{
	$("#genres").text(js[0].genres);
	$("#genres").text($("#genres").text().replace(/,/g,", "));
	}catch(e){}
	try{
	$("#directors").text(js[0].directors);
	$("#directors").text($("#directors").text().replace(/,/g,", "));
	}catch(e){}
	try{
	$("#writers").text(js[0].writers);
	$("#writers").text($("#writers").text().replace(/,/g,", "));
	}catch(e){}
	try{
	$("#actors").val(js[0].actors);
	}catch(e){}
	try{
	$("#plot").val(js[0].plot_simple);
	}catch(e){}
}
function fillFieldVoid(ele,js){
	$("#copertina").attr("src","");
	firstGoogleImgFast(ele,$(ele).text());
	$("#title").text($(ele).text());
	$("#year").text("--");
	$("#rating").text("--");
	$("#runtime").text("--");
	$("#genres").text("--");
	$("#directors").text("--");
	$("#writers").text("--");
	$("#actors").val("--");
	$("#plot").val("--");
}
function fillFieldOMDB(ele,js) {
	try{
		$("#copertina").attr("src","php/cross.php?url="+js.Poster);
	}catch(e){
		firstGoogleImgFast(ele,$(ele).text());
	}
	try{
	$("#title").text(js.Title);
	}catch(e){}
	try{
	$("#year").text(js.Year);
	}catch(e){}
	try{
	$("#rating").text(js.imdbRating);
	}catch(e){}
	try{
	$("#runtime").text(js.Runtime);
	}catch(e){}
	try{
	$("#genres").text(js.Genre);
	$("#genres").text($("#genres").text().replace(/,/g,", "));
	}catch(e){}
	try{
	$("#directors").text(js.Director);
	$("#directors").text($("#directors").text().replace(/,/g,", "));
	}catch(e){}
	try{
	$("#writers").text(js.Writer);
	$("#writers").text($("#writers").text().replace(/,/g,", "));
	}catch(e){}
	try{
	$("#actors").val(js.Actors);
	}catch(e){}
	try{
	$("#plot").val(js.Plot);
	}catch(e){}
}
function addToolsEffect(ele,js){
	$("#cerca").attr("href",'http://www.google.it/search?q='+encodeURI($(ele).text()));
	$("#youtube").attr("href",'http://www.youtube.com/results?search_query='+encodeURI($(ele).text()+" trailer"));
	$("#facebook").attr("onclick",'return fbs_click(\'http://www.google.it/search?q='+encodeURI($(ele).text())+'\')');
	$("#twitter").attr("href",'https://twitter.com/share?text='+encodeURI("Sto guardando questo bel film "+$(ele).text()));
	$("#rinomina").attr("onclick",'showRinominaDialogA(\''+$(ele).find("a").attr("href")+'\')');
	$("#sposta").attr("onclick",'showMoveDialogA(\''+$(ele).find("a").attr("href")+'\')');
	$("#elimina").attr("onclick",'showEliminaDialogA(\''+$(ele).find("a").attr("href")+'\')');
	
}
/*
 *  <label id="title">Nome</label><br />
	<label id="year">Anno</label><br />
	<label id="rating">Voto</label><br />
	<label id="runtime">Durata</label><br />
	<label id="genres">Genere</label><br />
	<label id="directors">Regista</label><br />
	<label id="writers">Sceneggiatore</label><br />
	<label id="actors">Attori</label><br />
* */
function showManagerDialog(ele,js,fillField){
	
	$("#inputDialog").attr("title","Anteprima Film");	
	fillField(ele,js);
	addToolsEffect(ele,js);	
	$( "#inputDialog" ).css("display","visible");
	$( "#inputDialog" ).dialog({
      autoOpen: false,
      modal: true,
      width: 700,
      buttons: {
        "Watch Movie": function() {
			location.href=""+$(ele).find("a").attr("href");
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
      }
    });
	$( "#inputDialog" ).dialog( "open" );
	
	
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
function firstGoogleImgFast(ele,query){
		https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=Google
		$.ajax({
				  type: 'GET',
				  url: "php/cross.php",
				  data: {"url":"https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+encodeURI(query)},
				  success: function(data){ scegliImmagine(ele,data,query)},
				  error: fallimentoRemota
				});
}
function scegliImmagine(ele,data,query){
	var js=JSON.parse(data);
	var p=js.responseData;
	url=js.responseData.results[0].unescapedUrl;
	$("#copertina").attr("src",url);
}

/**
 * This function let people delete film in the <ul>
 * @param nome the url source of the film will be deleted
 * */
function showEliminaDialogA(nome){
	$( "#inputDialog" ).dialog( "close" );
	$("#editDialog").attr("title","Remove this file");
	$("#editDialog").append('<p>Are you sure! You want permanently delete : '+nome.substring(nome.lastIndexOf("/")+1,nome.length)+'</p>');
	$( "#editDialog" ).dialog({
      autoOpen: false,
      height: 300,
      width: 500,
      modal: true,
      buttons: {
        "Delete": function() {
			eliminaFile(nome);
            $( this ).dialog( "close" );
            $("#editDialog").html("");
        },
        Cancel: function() {
          $( this ).dialog( "close" );
          $("#editDialog").html("");
        }
      },
      close: function() {
      }
    });
	$( "#editDialog" ).dialog( "open" );
}

/**
 * This method show a dialog witch let people rename a film
 * @param nome the full url of the film wich can be renamed.
 * */
function showRinominaDialogA(nome){
	$( "#inputDialog" ).dialog( "close" );
	var pnome=nome.substring(nome.lastIndexOf("/")+1,nome.length);
	var path=nome.substring(0,nome.lastIndexOf("/")+1);
	$("#editDialog").attr("title","Rename a file");
	$("#editDialog").append('<p>The file chosen is '+pnome+'</p><form>'+
'  <fieldset>'+
'    <label for="name">Name</label>'+
'    <input type="text" name="name" id="NewName"  class="text ui-widget-content ui-corner-all" style="width:100%;"value="'+pnome+'" />'+
'  </fieldset>'+
'  </form>');
	$( "#editDialog" ).dialog({
      autoOpen: false,
      height: 300,
      width: 500,
      modal: true,
      buttons: {
        "Rename a File": function() {
		  var name = $( "#NewName" );
          var bValid = true;
  
          //bValid = bValid && checkRegexp( name, /^[a-zAZ \/.]([0-9a-zAZ \/._])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
 
          if ( bValid ) {
				alert("Rinomino il file "+nome+" in " + $(name).val());
				
				rinominaFile(nome,path+$(name).val());
            $( this ).dialog( "close" );
            $("#editDialog").html("");
          }
        },
        Cancel: function() {
          $( this ).dialog( "close" );
          $("#editDialog").html("");
        }
      },
      close: function() {
      }
    });
	$( "#editDialog" ).dialog( "open" );
}

function showMoveDialogA(nome){
	$( "#inputDialog" ).dialog( "close" );
	var pnome=nome.substring(nome.lastIndexOf("/")+1,nome.length);
	var path=nome.substring(0,nome.lastIndexOf("/")+1);
	
	// /FILM/TORRENT/Doctor%20Who%202005%20Season%201-5
	
	var pfolder=path.substring(path.substring(0,path.length-1).lastIndexOf("/")+1,path.length-1);
	var folder=path.substring(0,path.indexOf(pfolder));
	$("#editDialog").attr("title","Move a file");
	$("#editDialog").append('<p>The file chosen is '+pnome+'</p><p>In the folder '+pfolder+' </p><p>In the bottom folder '+folder+'</p><form>'+
'  <fieldset>'+
'    <select id="cartella">'+
	'    <option>AVI</option>'+
	'    <option>MKV</option>'+
	'    <option>SERIE</option>'+
	'    <option>TORRENT</option>'+
' 	 </select>'+
'  </fieldset>'+
'  </form>');
	$( "#editDialog" ).dialog({
      autoOpen: false,
      height: 400,
      width: 500,
      modal: true,
      buttons: {
        "Move a File": function() {
			var cartella = $('#cartella').find(":selected").text();
			rinominaFile(nome,folder+cartella+"/"+pnome);
            $( this ).dialog( "close" );
            $("#editDialog").html("");
        },
        Cancel: function() {
          $( this ).dialog( "close" );
          $("#editDialog").html("");
        }
      },
      close: function() {
      }
    });
	$( "#editDialog" ).dialog( "open" );
}
/**
 * This function let people share content on facebook
 * */
function fbs_click(u) {
	//u=location.href;
	t=document.title;
	window.open('http://www.facebook.com/sharer.php?u=' +
		 encodeURIComponent(u) +
		 '&t=' +
		 encodeURIComponent(t),
		 ' sharer', 'toolbar=0, status=0, width=626, height=436');
	return false;
}
