<?php
	$ip=$_GET["ip"];
	
	$fp = fopen('index.html', 'w');
	fwrite($fp, '<html>');
	fwrite($fp, '<head>');
	fwrite($fp, '<script type="text/javascript"  src="../js/jQuery.js"></script>');
	fwrite($fp, '</head>');
	fwrite($fp, '<body>');
	fwrite($fp, '<script>');
	fwrite($fp, 'window.location.replace("http://');
	fwrite($fp, $ip);
	fwrite($fp, '");');
	fwrite($fp, '</script>');
	fwrite($fp, '</body>');
	fwrite($fp, '</html>');
	fclose($fp);
?>
