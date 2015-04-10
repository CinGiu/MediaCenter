var general_settings=[];

function getPlugins(where){
	$.get('php/getPlugins.php',function(data){
		var js=JSON.parse(data);
		for(var i=0;i<js.length;i++){
			var checked="";
			if(js[i].isActive!=null)
				checked='checked="checked"';
			$(where).append('<li><input type="checkbox" '+checked+' class="activateplugin" value="'+js[i].id+'" id="'+js[i].id+'"/> <span>'+js[i].name+'</span></li>');
		}
		$(".activateplugin").click(function(){
			var id=$(this).attr('id');
			var idPlugin=$(this).val();
			var status=$(this).is(":checked");
			$.post('php/turnPlugin.php',{"idPlugin":idPlugin,"status":status},function(data){
				if(data==200){
					//$('#'+id).attr("checked","checked");
				}
				if(data==204){
					//$('#'+id).attr("checked","false");
				}
				if(data==403){
					alert("fare il login");
				}
			});
		});
	});	
}

function getAllSettings(){
	$.get('php/getAllSettings.php',function(data){
		var js=JSON.parse(data);
		for(var i=0;i<js.length;i++){
			general_settings.push(js[i].key);
			$("#general").append('<div class="input-group input-group-lg">'+
									'<span style="background-color: #d9edf7; min-width:250px;" class="input-group-addon" >'+
										js[i].key+
									'</span>'+
									'<input type="text" id="'+js[i].key+'" class="form-control" value="'+js[i].value+'" aria-describedby="sizing-addon1">'+
								'</div>');
		}
		$("#general").append('<button type="button" onclick="saveSettings()" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> SAVE</button><hr />');
		
		$("#general").append('<div class="panel panel-default">'+
								  '<div class="panel-body basic">'+
									'<b>Password Manager</b>'+
								  '</div>'+
							'</div>'+
							'<div class="input-group input-group-lg">'+
								'<span style="background-color: #d9edf7; min-width:250px;" class="input-group-addon" >Old password</span>'+
								'<input type="password" id="oldPassword" class="form-control" value="" aria-describedby="sizing-addon1">'+
							 '</div>'+
							 '<div class="input-group input-group-lg">'+
								'<span style="background-color: #d9edf7; min-width:250px;" class="input-group-addon" >New password</span>'+
								'<input type="password" id="oldPassword" class="form-control" value="" aria-describedby="sizing-addon1">'+
							 '</div>'+
							 '<div class="input-group input-group-lg">'+
								'<span style="background-color: #d9edf7; min-width:250px;" class="input-group-addon" >Confirm New password</span>'+
								'<input type="password" id="oldPassword" class="form-control" value="" aria-describedby="sizing-addon1">'+
							 '</div>'
							);
		$("#general").append('<button type="button" onclick="changePassword()" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span> CHANGE</button><hr />');
		
	}); 

}

function saveSettings(){
	var result = {};
	for(i=0;i<general_settings.length;i++){
		var val = $("#"+general_settings[i]).val();
		result[general_settings[i]] = val;
	}
	
	$.ajax({
		type:"POST",
		data:result,
		url:"php/saveGeneralSettings.php",
		success: function(x){
				notification("Ben fatto! Salvato.", "alert-success")	
				},
	});
}

function notification(text, type){
	
		$("<div class='alert "+type+"' role='alert'><b>"+text+"</b></div>").hide().appendTo("body").slideDown(200);
		setTimeout(function(){
			$(".alert").slideUp(175);
			},2000);
		
}
