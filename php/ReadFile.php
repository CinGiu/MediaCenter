<?php
	include 'login.php';  
	$type=$_POST["type"];
	$folder=$_POST["folder"];
	
		
	function az($sdir){
		$files1 = scandir($sdir);
		$jresult= array();
		$i=0;
		foreach($files1 as $aa){
			if($aa != "." && $aa != ".."){
				$jresult[$i]=array("href"=>$aa);
				$i++;	
			}	
		}
		return json_encode($jresult);
	}
	
	
	function cmp($a, $b){
		return strcmp($b["filetime"], $a["filetime"]);
	}
	function recenti($dir){
		$files = scandir($dir);
		$jresult= array();
		$i=0;
		foreach ($files as $node) {
			if($node != "." && $node != ".."){
				$jresult[$i] = array("filetime"=>filemtime($dir.$node), "href"=>$node);
				$i++;
			}
		}
		usort($jresult, "cmp");
		$jresult = array_slice($jresult, 0, 15);
		return json_encode($jresult);
	}
	
	
	if(isLogged()){
		if($type == "recenti"){
			$dir = "/media/FILM/FILM/$folder/";
			echo recenti($dir);
		}else{
			$dir = "/media/FILM/FILM/$folder/";
			echo az($dir);
		}
	}else{
		echo "permission denied";
	}
?>
