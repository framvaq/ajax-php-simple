<?php
/**
 * Get all tasks from the db in json format 
 */
include_once ('database.php');
//Query to get all data form tasks
$query = "SELECT * FROM task";
$result = mysqli_query($connection, $query);

if (!$result) {
    die('Query falise'. mysqli_error($connection));
}
//Go trough all results and save them in an array
$json = array();
while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}
//convert array to json and print
$jsonstring = json_encode($json);

echo $jsonstring;




