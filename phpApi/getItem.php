<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Content-type: application/json; charset=utf-8");
require('./databaseModel/Database.php');
$database = new Database();


$type = $_POST['type'];

if ($type == 'single') :
	$id = $_POST['id'];
	echo json_encode(['data' => $database->select("select * from items where id = ?", [$id])->getSingle()]);
elseif ($type == "all") :
	echo json_encode(['data' => $database->select("select * from items")->getAll()]);
elseif ($type == "list") :
	// echo json_encode(['data' => $database->select("select * from items where id = ?", [$id])->getSingle()]);
	$list = json_decode($_POST['list']);
	$data = [];

	foreach ($list as $id) {
		array_push($data, ['data' => $database->select("select * from items where id = ?",
		 [$id])->getSingle(), 'count'=> 1]);
	}

	echo json_encode($data);

else :
	echo json_encode(['msg' => 'type not found']);
endif;
