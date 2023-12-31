<?php

    

    function alert($msg) {
        echo "<script type='text/javascript'>alert('$msg');</script>";
    }
    include("connection.php");

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $username = $_POST["username"];
        $password = $_POST["password"];

        
        $sql = "INSERT INTO user_info (username, password, current_level, max_level) VALUES ('$username', '$password', 1,1)";
        mysqli_query($conn, $sql);
        alert("Sikeres Regisztráció.");
        echo "<script type='text/javascript'>window.location.assign('../html/jatek.html');</script>";
    }
    mysqli_close($conn);
?>