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
			$("#general").append('<div class="input-group input-group-lg"> <span class="input-group-addon" id="'+js[i].key+'">'+js[i].key+'</span><input type="text" class="form-control" value="'+js[i].value+'" aria-describedby="sizing-addon1"></div>');
		}
		$("#general").append('<button type="button" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> SAVE</button>');
	});

}

function saveSettings(){
	
}
