<?php

	include("query.php");
	$folderName = $_POST["folderName"];
	$folderPath = $_POST["folderPath"];
	$transmissionPort = $_POST["transmissionPort"];
	$backgroundImage = $_POST["backgroundImage"];
	updateSetting("folderName",$folderName);
	updateSetting("folderPath",$folderPath);
	updateSetting("transmissionPort",$transmissionPort);
	updateSetting("backgroundImage",$backgroundImage);
	echo "*".$folderName." ".$folderPath." ".$transmissionPort." ".$backgroundImage;
?>
