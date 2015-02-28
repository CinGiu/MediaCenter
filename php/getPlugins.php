<?php
	include("query.php");
	$p = getPlugins();
	echo json_encode($p);
?>
