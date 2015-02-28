<?php
	include("query.php");
	$p = getAllSettings();
	echo json_encode($p);
?>
