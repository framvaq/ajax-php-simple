<?php
/**
 * Database connection
 */
    $connection = mysqli_connect(
        'localhost',
        'sa',
        'sa',
        'tasks-app'
    );

    /*//Debug
    if ($connection) {
        echo "Database is connected";
    } else {
        echo mysql_error($connection);
    }*/
?>