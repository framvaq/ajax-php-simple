<?php
/**
 * Adds a new task to the db
 */
include('database.php');
//Only when I have a name in the form
if (isset($_POST['name'])){
    $name = $_POST['name'];
    $description = $_POST['description'];

    $query = "INSERT INTO task(name, description) VALUES ('$name', '$description')";
    $result = mysqli_query($connection, $query);
    
    if (!$result){
        die ('query failed');
    }
    echo 'task added succesfully'; 
}