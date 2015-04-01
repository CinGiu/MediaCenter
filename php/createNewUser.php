<?php

	include("query.php");
	$name=$_POST['name'];
	$email=$_POST['email'];
	$pswd=$_POST['pswd'];

	if(isLogged()){
		$id=insertUser($name,$email,$pswd);
		
		$folderName="recenti,a-z,serie,musica,book,anime";
		$folderPath="TORRENT,TORRENT,SERIE,MUSICA,BOOKS,ANIME";
		$transmissionPort="9091";
		$backgroundImage="bg.jpg";
		
		//echo $id;
		insertSetting($id,"folderName",$folderName);
		//echo "folderName<br />";
		insertSetting($id,"folderPath",$folderPath);
		//echo "folderPath<br />";
		insertSetting($id,"transmissionPort",$transmissionPort);
		//echo "transmissionPort<br />";
		insertSetting($id,"backgroundImage",$backgroundImage);
		//echo "*".$folderName." ".$folderPath." ".$transmissionPort." ".$backgroundImage;
		echo '200';
	}else{
		echo '403';
	}
?>
