<?php
	include "query.php";
	
	$status=$_POST['status'];
	$idPlugin=$_POST['idPlugin'];
	
	if(isLogged()){
		if($status=="true"){
			turnOnPlugin($idPlugin);
			echo 200;
		}else{
			turnOffPlugin($idPlugin);
			echo 204;
		}
	}else{
		echo 403;
	}
?>
