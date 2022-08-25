
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Content-type: application/json; charset=utf-8");
require('./databaseModel/Database.php');
$database = new Database();


$action = @$_POST['type'];
$id = @$_POST['id'];
echo "action " . $action;

if ($action =='' || $id == '') {
	echo json_encode(['msg'=> "check your request body"]);
	exit;
}

if ($action == 'delete') :
	try{
		$database->delete('delete from items where id = :id', ['id'=>$id]);
	}catch (Exception $e) {
		echo json_encode($e->getMessage());
	}
elseif ($action == 'update') :
	try{
		$data = $_POST['data'];
		if ($data == '') {
			echo json_encode(['msg' => 'no data for update']);
			exit;
		}

		$data = json_decode($data, true);
		array_push($data, $id);
		var_dump($data);
		$database->update("update items set name=?, price=?, count=?, image=?,image_slide=? where id = ?", $data);
	}catch(Exception $e) {
		echo json_encode(['msg'=> $e->getMessage()]);
	}

endif;



/**
 * name
 * price
 * count
 * image
 * image_slide
 * id
 * ['iphone', 20000, 4, 'on image', 'no image slider', 'id']
 */
