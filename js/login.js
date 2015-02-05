function InitLogin(){
	var iscookie = getCookie('CinelliHomeUN');
	if(iscookie!=null){
		var user=getCookie('CinelliHomeUN');
		var pass=getCookie('CinelliHomePD');
		login(user, pass);
	}
}
function UndirectLogin(){
	var user=$("#username").val();
	var pass=$("#pass").val();
	pass=hex_sha1(pass);
	login(user, pass);
}
function login(user, pass){
	$.ajax({
            type:"POST",
            data:{"user":user,"pass":pass,"req":"online"},
            url:"php/login.php",
            success: function(x){
            				if(x=="ok"){
								setCookie("CinelliHomeUN", user, 30);
								setCookie("CinelliHomePD", pass, 30);
								$("#container").load("home.html",function(){
									
									//PRENDO DAI COOKIE LA PAGINA GIUSTA 
									var page=getCookie('CinelliHomePage');
									
									if(page == "undefined"){
										alert("prima volta");
										$("#radio1").attr('checked', true);
										$("#radio1").button("refresh");
										TakeFilmList("recenti");
									}else{
										var num = folderName.indexOf(page);
										num = num + 1;
										$("#radio"+num).attr('checked', true);
										$("#radio"+num).button("refresh");
										TakeFilmList("recenti");
									}
									
									fileManager("","df","",DrawChart);
									
									//google.setOnLoadCallback(DrawChart);									
								});
								
								
							}else{
								alert("hai sbagliato, riprova!");
								}
							},
        });
 }
