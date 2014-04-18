<?php

$RIS=exec('/var/www/php/CT.sh');
$RIS=utf8_encode($RIS);
if($RIS == "Attivo"){
	echo "Attivo";
}else{
	echo "Disattivo";};	
?>
