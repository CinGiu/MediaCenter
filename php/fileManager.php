<?php
	include "login.php";
	function eliminaFiles($dirname){
		if(file_exists($dirname) && is_file($dirname)) {
			unlink($dirname);
		}elseif(is_dir($dirname)){
			$handle = opendir($dirname);
			while (false !== ($file = readdir($handle))) { 
				if(is_file($dirname."/".$file)){
					
					unlink($dirname."/".$file);
				}
			}
			$handle = closedir($handle);
			rmdir($dirname);
		}
	}
	function moveFiles($dirsrc,$dirdst){
		//$cmd = 'mv "$dirsrc" "$dirdst"'; 
		//exec($cmd, $output, $return_val); 
		$return_val=rename("../".$dirsrc, "../".$dirdst);
		if ($return_val) { 
			echo "success"; 
		} else { 
			echo "failed"; 
		}
	}
	function serverInfo(){
		 $jresult = array();
		 $freespace = disk_free_space("/var/www/FILM");
         $total_space = disk_total_space("/var/www/FILM");
         $percentage_free = $freespace ? round($freespace / $total_space, 2) * 100 : 0;
         $uptime_result = exec("uptime");
         list($uptime_D,$uptime_H, $users, $load_1_minute,$load_5_minutes,$load_15_minutes) = split('[,]', $uptime_result);
         if($load_15_minutes == NULL ){
			 list($uptime_H, $users, $load_1_minute,$load_5_minutes,$load_15_minutes) = split('[,]', $uptime_result);
			 $uptime_D = "0 Days";
		 }
		 $cpu_temp = exec('cat /sys/class/thermal/thermal_zone0/temp');
		 $cpu_temp = round($cpu_temp/1000,1);
		 
		 $web_connected=exec("netstat -plan|grep :80|awk {'print $5'}|cut -d: -f 1|sort|uniq -c|sort -nk 1|tail -1|awk '{print $1}'");
         //riempio l'array json
         $jresult[0]=array("total_space"=>$total_space,
							"free_space"=>$freespace,
							"percentage_free"=>$percentage_free,
							"uptime_H"=>$uptime_H,
							"uptime_D"=>$uptime_D,							
							"users"=>$users,
							"cpu_temp"=>$cpu_temp,
							"web_connected"=>$web_connected,
							"load_1_minute"=>floor($load_1_minute*100)/100, 
							"load_5_minutes"=>floor($load_5_minutes*100)/100,
							"load_15_minutes"=>floor($load_15_minutes*100)/100;
         $jresult= json_encode($jresult);
		 echo $jresult;
		 
	}
	if(isLogged()){
		$command=$_POST["command"];
		if(strcmp($command,"elimina")==0){
			$dir=$_POST["src"];
			eliminaFiles("../".$dir);
			echo "200";
		}
		else
		if(strcmp($command,"mv")==0){
			$src=$_POST["src"];
			$dst=$_POST["dst"];
			moveFiles($src,$dst);
			echo "200";
		}
		else
		if(strcmp($command,"df")==0){

			serverInfo();
		}
	}
	else
		echo 403;
?>
