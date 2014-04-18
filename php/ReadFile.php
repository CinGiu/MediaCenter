<?php
	include 'login.php';  
	$type=$_POST["type"];
	$dir    = '/var/www/FILM/'.$type;
		
	function leggi($sdir){
		$files1 = scandir($sdir);
		$jresult= array();
		$i=0;
		foreach($files1 as $aa){
			if(is_dir($aa) === true){
				//echo "dir";
				//~ $temp = leggi($aa);
				//~ $jresult=array_merge($jresult, $temp);
				//~ $i=$i+count($temp);
			}else{
				$jresult[$i]=array("href"=>$aa);
				$i++;
			}
			
		}
		return json_encode($jresult);
	}
	
	if(isLogged())	
			echo leggi($dir);
		else
			echo "permission denied";
?>
