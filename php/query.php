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
		$name=$_COOKIE["CinelliHomeUN"];
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
		$name=$_COOKIE["CinelliHomeUN"];
		$pswd=$_COOKIE["CinelliHomePD"];
		if(login($name,$pswd)){
			return true;
		}else{
			return false;
		}	
	}
	
	function getPlugins(){
		$database=connect();
		$idUser=getId();
		$res=$database->select("plugin",
			[			
				"plugin.id",
				"plugin.name",
				"plugin.developer",
				"plugin.folder"
		],[
		]);
		foreach($res as &$plugin){
			$t=$database->select("activeplugin",
				[
					"id"
				],
				[
					"AND"=>[
						"idPlugin"=>$plugin['id'],
						"IdUser"=>$idUser
					]
				]);
			$plugin['isActive']=$t[0]['id'];
		}
		return $res;
	}
	function insertPlugin($name,$developer,$folder){
		$database=connect();
		$res=$database->insert("plugin",[		
			"name"=>$name,
			"developer"=>$developer,
			"folder"=>$folder
		]);
		return $res;
	}
	function turnOnPlugin($idPlugin){
		$database=connect();
		$idUser=getId();
		$res=$database->insert("activeplugin",[
			"idUser"=>$idUser,
			"idPlugin"=>$idPlugin
		]);
		return $res;
	}
	function turnOffPlugin($idPlugin){
		$database=connect();
		$idUser=getId();
		$res=$database->delete("activeplugin",[		
				"AND" => [
					"idUser"=>$idUser,
					"idPlugin"=>$idPlugin
				]
		]);
		return $res;
	}
?>
