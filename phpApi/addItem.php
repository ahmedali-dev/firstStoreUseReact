<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
//header("Content-type: application/json; charset=utf-8");
require('./databaseModel/Database.php');
$database = new Database();
/*
$value1 =$database->insert("insert into items(name, price,count, image, image_slide) values (:name, :price,:count,:image,:image_slide)", 
	['name'=> 'iphone 13 pro max', 'price'=> 20000, 'count' => 3, 'image' => 'no image', 'image_slide' => 'no image slide'])
	->select("select * from items")>getAll();
var_dump($value1);
 */

if ($_SERVER['REQUEST_METHOD'] == 'POST'){

$name = @$_POST['name'];
$price = @$_POST['price'];
$count = @$_POST['count'];
$image = @$_FILES['image'];
$imageSlide	= @$_FILES['imageSlide'];
$initImageSlider = "";
//print_r($image);
//echo "<br> ". $image['tmp_name'];
//echo "<pre>";
//var_dump($_REQUEST);
//echo "</pre>";





if (empty($name) || empty($price) || empty($count) || empty($image) || empty($imageSlide)) {
	echo json_encode(['msg' => "found input not have any value"]);
	exit;
}else {
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		//$database->insert("insert into items(name, price,count, image, image_slide) values (:name, :price,:count,:image,:image_slide)", 
		//	['name'=> $name, 'price'=> $price, 'count' => $count, 'image' => $image, 'image_slide' => $imageSlide]);

		//image uploade

		$extension = pathinfo($image['name'], PATHINFO_EXTENSION);
		$newImageNameMain = time() . '.' . $extension;

		move_uploaded_file($image['tmp_name'], 'image/' . $newImageNameMain);


		/*uploade image slider*/
		for($i = 0; $i < count($imageSlide['name']); $i++){
			$extension = pathinfo($imageSlide['name'][$i], PATHINFO_EXTENSION);
			$newImageName = time() . rand(999, 99999) . '.' . $extension;

			if (move_uploaded_file($imageSlide['tmp_name'][$i], 'image/' . $newImageName)){
				//echo "uploaded file $i:  " . $imageSlide['name'][$i] . "<br>";
				$initImageSlider .= "#".$newImageName;
			}
		}

		//echo $initImageSlider;
		$database->insert("insert into items(name, price,count, image, image_slide) values (:name, :price,:count,:image,:image_slide)", 
			['name'=> $name, 'price'=> $price, 'count' => $count, 'image' => $newImageNameMain, 'image_slide' => $initImageSlider]);


		echo json_encode(['msg'=>'items add sucsessfuly']);
	}
}

}else{
	echo "
<html>
<header>
	<link href='app.css' />
</header>
<body>

	<div class='form'>
		<input type='file' class='imagePath'/>	
		<input type='file' class='imageSlidePath' multiple='multiple' name='file[]'/>
		<input type='text' />
		<button class='btn'>send</button>
	</div>
	
</body>
</html>";
}


?>

