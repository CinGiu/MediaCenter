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
