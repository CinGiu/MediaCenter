<?php
	include("settings.php");
	$utente=$_POST["user"];
	$password=$_POST["pass"];
	$req=$_POST["req"];
	/*$database="home";
	$user="root";
	$host="localhost";
	$pass="pinnatortb";
	$con = mysql_connect($host,$user,$pass);
	if (!$con)
	{
	die('Could not connect: ' . mysql_error());
	}
	mysql_select_db($database, $con);
	
	$result=mysql_query("SELECT * FROM user WHERE username='$utente' AND pass='$password'");
	$num_result=mysql_num_rows($result);

	if($num_result==0){
		echo "error";
	}else{
		
		
	}
	*/
	function isLogged(){
		$utente=$_COOKIE["CinelliHomeUN"];
		$password=$_COOKIE["CinelliHomePD"];
		return checkLogin($utente,$password);
	}
	function checkLogin($utente,$password){
		//$u="danger";
		//$p="fbe3d4672dfc3dcd3cda39780000e58f5c1098f9";
		$u=getName();
		$p=getPassword();
		if(($utente==$u)&&($password==$p))
		{
			return true;
		}
		else
			return false;
	}
	if($req=="online"){
		if(isLogged()){
			
			echo "ok";
		}
		else{
			if(checkLogin($utente,$password)){
				setcookie("CinelliHomeUN", $utente, time()+2592000, "/");
				setcookie("CinelliHomePD", $password, time()+2592000, "/");
				echo "ok";
			}
			else
				echo "no";
		}
	}
?>
