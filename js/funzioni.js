/**
 * Funzione per mandare ogni richiesta
 * prende: Tipo di richiesta (GET, POST), destinazione (file.php), eventuale Data da mandare
 * restituisce: il risultato del server (non trattato)
 * */
var arrayfilm = new Array();
$(document).ready(function(){  
	
	InitLogin();
	$( "#pass" ).keyup(function(key)
			{
				var n_key=key.which;
				if(n_key==13) //invio
					{
					   UndirectLogin();
					}
			});	
			
     
     $("#torrent").click(function(){
			if($(this).css("height")>"400px"){
				$(this).css("height", "400px");
			}else{
				$(this).css("height", "160%");
			};
		 });
     $("#film").click(function(){
			window.open ('Film/','_self',false);
		 });
		 
	 $( "#list_film_autoc" ).live("keyup",function(key)
		{
			var n_key=key.which;
			if(n_key==13) //invio
				{
				   SearchFilm();
				}
		});	
		
	$(".settings").live("click",function(){
		 location.href="settings.html"
		 //$("#container").load("settings.html");
	});
	$(".logout").live("click",function(){
		$.get("php/logout.php",function(data){
			if(data=="200"){
				setCookie("CinelliHomeUN", "", -1);
				setCookie("CinelliHomePD", "", -1);
				location.href="index.html"
			}else{
				alert("logout fallito");
			}
		});
	});	
	$(".home").live("click",function(){
		 $("#container").load("home.html");
	});	
}); 

function DrawChart(x){
	var info = JSON.parse(x);
	
	//SX
	var data = google.visualization.arrayToDataTable([
          ['Usage', 'Space'],
          ['Occupato', info[0].total_space - info[0].free_space],
          ['Libero', info[0].free_space],
        ]);
	  // Set chart options
	  var options = {'title':'HDD Usage',
					 'width':400,
					 'height':350};
	  var chart = new google.visualization.PieChart(document.getElementById('info_server_sx'));
	  
	  chart.draw(data, options);
	  
	  
	  
	  //DX
	  $("#info_server_dx").append("<p><b>Uptime: </b>"+info[0].uptime_D+" "+info[0].uptime_H +"</p>");
	  
	  $("#info_server_dx").append("<hr/>");
	  
	  $("#info_server_dx").append("<p><b>CPU Temp:</b> "+info[0].cpu_temp+"</p>");
	  var load_1_minute=info[0].load_1_minute.replace("load average:",""); 
	  $("#info_server_dx").append("<p><b>Load CPU last minute:</b> "+parseInt(load_1_minute*10000)/100+"%</p>");
	  $("#info_server_dx").append("<p><b>Load CPU last 5 minutes:</b> "+parseInt(info[0].load_5_minutes*10000)/100+"%</p>");
	  if((parseFloat(info[0].load_15_minutes)*100)>70){
		$("#info_server_dx").append("<p><b>Load CPU last 15 minutes:</b> <blink>"+parseInt(info[0].load_15_minutes*10000)/100+"%<blink></p>");
	  }else{
		$("#info_server_dx").append("<p><b>Load CPU last 15 minutes:</b> "+parseInt(info[0].load_15_minutes*10000)/100+"%</p>");
	  }
	  
	  $("#info_server_dx").append("<hr/>");
	  $("#info_server_dx").append("<p><b>People Connected Now:</b> "+info[0].web_connected+"</p>");
	  $("#info_server_dx").append("<p><b>Users Logged In:</b>"+info[0].users+"</p>");
	  
	  $("#info_server_dx").append("<hr/>");
	  $("#info_server_dx").append("<p><b>Total Space: </b>"+btoGB(info[0].total_space)+"</p>");
	  $("#info_server_dx").append("<p><b>Free Space: </b>"+btoGB(info[0].free_space)+"</p>");
	  $("#info_server_dx").append("<p><b>Used Space: </b>"+btoGB(info[0].total_space - info[0].free_space)+"</p>");
}


function LoadHome(){
		$("#container").load("home.html"); 
}

function MakeHome(){
	$.get('php/getAllSettings.php',function(data){
		var js=JSON.parse(data);
		
		for(i=0;i< js.length;i++){
			var s = js[i];
			switch(s.key){
				case "folderName":
					folderName=s.value.split(",");
					break;
				case "folderPath":
					folderPath=s.value.split(",");
					break;
				case "transmissionPort":
					tranmissionPort=s.value
					$("#info").hide();
					var t=$("#info").text();
					//var ip_server=t.substring(t.indexOf(":")+1,t.indexOf("IPv4 only Test"));					
					var ip_server= document.location.href;
					ip_server=ip_server.split('/')[2];
					$("#transmissionx").attr("src","http://"+ip_server+":"+tranmissionPort+"/transmission/web/");
					
					break;
				case "backgroundImage":
					$("body").css("background-image",'url("'+s.value+'")');
					break;
			}
		}
	
		for (var i=0; i < folderName.length; i++){
			tab = folderName[i];
			if(i == 0){
				var active="active"; 
			}else{
				var active = "";
			}
		
			$(".tab-list").append('<li role="navigation" onclick="reset_list()" class="'+active+'"><a href="#'+tab.replace("-","")+'" aria-controls="'+tab.replace("-","")+'" role="tab" data-toggle="tab">'+Title(tab)+'</a></li>');
			$(".content-list").append('<div role="tabpanel" class="tab-pane '+active+'" id="'+tab.replace("-","")+'"><ul class="list-group list-'+tab.replace("-","")+'" id="list-'+tab.replace("-","")+'"></ul></div>');
			TakeFilmList(tab.replace("-",""),folderPath[i]);
		}
		
		$.get("php/getPlugins.php",function(data){
			var js=JSON.parse(data);
			for(var i=0;i<js.length;i++){
				if(js[i].isActive!=null){
					$("#main").append('<div id="plugin'+js[i].id+'"class="panel panel-info"></div>');
					$('#plugin'+js[i].id).load(js[i].folder+"/index.html");
				}
			}
		});
	});	
}

function TakeFilmList(type,folder){

	$.ajax({
            type:"POST",
            data:{"type":type,"folder":folder},
            url:"php/ReadFile.php",
            success: function(x){
            				var film =JSON.parse(x);
            				film_parser(film, type, folder);
							},
        });
}

//~ TYPE: del tipo recenti o recenti-sub-numero per indicare a quale sotto livello si è di recenti (main_type) 
function ManageSubFolder(type, folder, level){
	var main_type = type.split("-");
	var size = (100 / (Number(level) + 2));
	main_type = main_type[0];

	if(Number(level)==0){
		$(".sub_folder_list").remove();
	}else{
		$("#list-"+main_type+"-sub-"+Number(level)).remove();
	}
	$("#"+main_type).append('<ul class="list-group sub_folder_list" id="list-'+main_type+'-sub-'+level+'"></ul>');
	$(".sub_folder_list").css("width", size-1+"%");
	$("#list-"+main_type).animate({
						width: size+"%"
					  }, 500, function() {
						TakeFilmList(main_type+"-sub-"+level,folder);
					  });
	
	var elementPosition = $('.content-list').offset();
	if($(window).scrollTop() > elementPosition.top){
		$('.sub_folder_list').css('margin-top',$(window).scrollTop() - elementPosition.top + 3);
	} 
	
}

function reset_list(){
	$(".sub_folder_list").remove();
	$(".list-group").css("width","100%");
}
function film_parser(film,type, folder){
	var arrayfilm = [];
	var splittedtype = type.split("-");
	if(splittedtype[1] == "sub"){
		var level = Number(splittedtype[2]) + 1;
	}else{
		var level = 0;
	}
	
	for(i=0;i< film.length;i++){
		var titolo = film[i].href;
		titolo=generateTitle(titolo);
		var titleID = generateTitleID(titolo);
		var link = film[i].href.replace(/'/gi,"&#39;");
		var href = "/FILM/"+folder+"/"+link;
		
		
		if(film[i].isdir){
			var icon = '<span onclick="ManageSubFolder(\''+type+'\',\''+folder+"/"+link+'\',\''+level+'\')" class="glyphicon glyphicon-chevron-right cliccable" style="float:right" aria-hidden="true"></span>';
		}else{
			var estension = href.split(".");
			estension = estension[estension.length-1];
			var icon = '<span style="float:right" ><b>'+estension.toUpperCase();+'</b></span>';
			
		}
		
		
		$("#list-"+type).append("<li class='list-group-item list-group-item-info lista'><a id='"+titleID+"' href='"+href+"'><b>"+titolo+"</b></a>"+icon+"</li>");
		arrayfilm.push(titolo);
	}
	
	// Inserisco array della lista film az in AUTOCOMPLETE
	if(type == "az"){
		$("#list_film_autoc").autocomplete({
				source: arrayfilm
			});
	}
	
}
function generateTitle(titolo){
	titolo=titolo.replace(/\./g,' ');
    titolo=titolo.replace(/\[([^\[])*\]/g,"");
    titolo=titolo.replace(/\(([^\[])*\)/g,"");
    titolo=titolo.replace(/BDrip/gi,"");
    titolo=titolo.replace(/BluRay/gi,"");
    titolo=titolo.replace(/DIVX/gi,"");
    titolo=titolo.replace(/MIRCrew/gi,"");
    titolo=titolo.replace(/HDTV/gi,"");
    titolo=titolo.replace(/HDTS/gi,"");
    titolo=titolo.replace(/CAM/g,"");
    titolo=titolo.replace(/2013DTS/g,"");
    titolo=titolo.replace(/ -LIFE/g,"");
    titolo=titolo.replace(/Dual/g,"");
    titolo=titolo.replace(/DUAL/g,"");
    titolo=titolo.replace(/ LD /gi,"");
    titolo=titolo.replace(/XviD/gi,"");
    titolo=titolo.replace(/BmA/gi,"");
    titolo=titolo.replace(/OAV/g,"");
    titolo=titolo.replace(/x264/gi,"");
    titolo=titolo.replace(/1080p/gi,"");
    titolo=titolo.replace(/subeng/gi,"");
    titolo=titolo.replace(/itasub/gi,"");
    titolo=titolo.replace(/720p/gi,"");
    titolo=titolo.replace(/480p/gi,"");
    titolo=titolo.replace(/.avi/gi,"");
    titolo=titolo.replace(/.mkv/gi,"");
    titolo=titolo.replace(/multisub/gi,"");
    titolo=titolo.replace(/Complete/gi,"");
    titolo=titolo.replace(/ Eng /gi,"");
    titolo=titolo.replace(/ eng /gi,"");
    titolo=titolo.replace(/Eng/g,"");
    titolo=titolo.replace(/ Fra /gi,"");
    titolo=titolo.replace(/ Ita /gi,"");
    titolo=titolo.replace(/Ita-/gi,"");
    titolo=titolo.replace(/ Ger /gi,"");
    titolo=titolo.replace(/ Spa /gi,"");
    titolo=titolo.replace(/ Hun /gi,"");
    titolo=titolo.replace(/ Rus /gi,"");
    titolo=titolo.replace(/ Cz /gi,"");
    titolo=titolo.replace(/ iTALiAN /g,"");
    titolo=titolo.replace(/DVDRip/gi,"");
    titolo=titolo.replace(/BrRip/gi,"");
    titolo=titolo.replace(/MD/gi,"");
    titolo=titolo.replace(/XviD-/gi,"");
    titolo=titolo.replace(/-Republic/gi,"");
    titolo=titolo.replace(/Twice/gi,"");
    titolo=titolo.replace(/iDN_CreW/gi,"");
    titolo=titolo.replace(/TeaM/gi,"");
    titolo=titolo.replace(/LiAN/gi,"");
    titolo=titolo.replace(/TSR/gi,"");
    titolo=titolo.replace(/iDN_CreW/gi,"");
    titolo=titolo.replace(/SiLENT/gi,"");
    titolo=titolo.replace(/TrTd/gi,"");
    titolo=titolo.replace(/TRL/gi,"");
    titolo=titolo.replace(/AC3/gi,"");
    titolo=titolo.replace(/ACC/g,"");
    titolo=titolo.replace(/AAC/g,"");
    titolo=titolo.replace(/_/g,"");
    
   
    titolo=titolo.replace(/ (Eng|Fra|Ita|Ger|Spa|Hun|Rus|Cz)(Eng|Fra|Ita|Ger|Spa|Hun|Rus|Cz)* /gi,"");
    titolo=titolo.replace(/ (Eng|Fra|Ita|Ger|Spa|Hun|Rus|Cz)(Eng|Fra|Ita|Ger|Spa|Hun|Rus|Cz) /gi,"");
   
    return titolo;
}
function generateTitleID(titolo){
	var titleID = titolo.replace(/ /g,"");  //elimino tutti gli spazi dal titolo e uso il riusultato come ID del link
		titleID = titleID.replace(/[,\.\(\)\-\[\]]*/g,"");
	return titleID;
}

function SearchFilm(){
	var film = $( "#list_film_autoc" ).val();
	var titleID = generateTitleID(film);
	$("#Search_Result").html("");
	var success=false;
	$("body").find("#"+titleID).each(function(){
		$("#Search_Result").append('<div class="alert alert-success" role="alert"><a href="'+$("#"+titleID).attr("href")+'">'+film+'</a></div>');
		success=true;	
	});
	
	if(!success){
		$("a:regex(id, .*"+film+".*)").each(function(){
			var p=this;
			if($(p).attr("href")!=null){
				$("#Search_Result").append('<div class="alert alert-success" role="alert"><a href="'+$(p).attr("href")+'">'+$(p).text()+'</a></div>');
				success=true;
			}
		});
	}
	if(!success){
		$("#Search_Result").append("<p>Film non trovato</p>");
	}
	$("#Search_Result").show();
}
	
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
    }

/*
 *	function to convert bytes into MB,GB,TB 
 * 
 * */
function btoGB(fileSizeInBytes) {

    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};

function Title(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
