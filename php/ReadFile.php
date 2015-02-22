<?php
	include 'login.php';  
	$type=$_POST["type"];
	$folder=$_POST["folder"];
	
		
	function az($dir){
		$files = scandir($dir);
		$jresult= array();
		$i=0;
		foreach ($files as $node) {
			if($node != "." && $node != ".."){
				$complete_path = $dir.$node;
				if(is_dir($complete_path)){ 
					$isdir = true;
				}else{
					$isdir = false;
				}
				$jresult[$i]=array("href"=>$node,"isdir"=>$isdir);
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
				$complete_path = $dir.$node;
				if(is_dir($complete_path)){ 
					$isdir = true;
				}else{
					$isdir = false;
				}
				$jresult[$i] = array("filetime"=>filemtime($dir.$node), "href"=>$node,"isdir"=>$isdir);
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
