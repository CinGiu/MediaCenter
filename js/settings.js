/*Questo file ha il compito di parametrizzare la maggior parte degli aspetti
 * di questo meraviglioso progetto al fine di semplificare la vita degli utonti
 * */

var hostName="JARVIS"
var tranmissionPort;
var folderName;
var folderPath;

$(document).ready(function(){ 
	
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
					break;
				case "backgroundImage":
					$("body").css("background-image",'url("'+s.value+'")');
					break;
			}
		}
	});
	
});

