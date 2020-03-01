<?php
/*//Para enviar
echo 'holamundo con ajax';
*/
/*Ahora recibe el username y muestra el mensaje */
if (isset ($_POST)) {
    echo "received: ".$_POST['username'];
}