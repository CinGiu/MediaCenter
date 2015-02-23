<?php
	require  'medoo.min.php';
	function connect(){
		$database = new medoo([
			'database_type' => 'sqlite',
			'database_file' => '../database/test.db'
		]);
		return $database;
	}
	
	function getId(){
		$name=$_COOKIE["name"];
		return getIdFromUser($name)[0]['id'];
	}
	function getIdFromUser($name){
		$database=connect();
		$datas=$database->select("user",[
			"id"
		],[
			"name[=]"=>$name
		]);
		return $datas;
	}
	function insertUser($name,$email,$pswd){
		$database=connect();
		//echo 'this is db '.$database.'<br />';
		$res=$database->insert("user",[
		
			"name"=>$name,
			"email"=>$email,
			"pswd"=>$pswd
		]);
		return $res;
	}
	
	function getUser($id){
		$database=connect();
		$res=$database->select("user",[
			"id",
			"name",
			"email"
		],[
			"id[=]"=>$id
		]);
		return $res;
	}
	function login($name,$pswd){
		$database=connect();
		$result=$database->has("user",[
			"AND" => [
				"name" => $name,
				"pswd" => $pswd
			]
		]);
		return $result;
	}
	function isLogged(){		
		$name=$_COOKIE["name"];
		$pswd=$_COOKIE["pswd"];
		if(login($name,$pswd)){
			return true;
		}else{
			return false;
		}	
	}
?>
