<?php
    function alert($msg) {
        echo "<script type='text/javascript'>alert('$msg');</script>";
    }
    include("connection.php");

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $start = $_POST["start"];
        $goal = $_POST["goal"];
        $steps = $_POST["steps"];
        $appendbutton1 = $_POST["appendbutton1"];
        $appendbutton2 = $_POST["appendbutton2"];
        $appendbutton3 = $_POST["appendbutton3"];
        $appendbutton4 = $_POST["appendbutton4"];
        $funkbutton1 = $_POST["funkbutton1"];
        $funkbutton2 = $_POST["funkbutton2"];
        $funkbutton3 = $_POST["funkbutton3"];
        $funkbutton4 = $_POST["funkbutton4"];
        $reverse = $_POST["reverse"];
        $plusMinus = $_POST["plusMinus"];
        $sum = $_POST["sum"];
        $backspace = $_POST["backspace"];

        
        $sql = "INSERT INTO levels (steps, goal, append_buttons, numFunc_buttons, other_buttons, start) VALUES ('$steps', '$goal', '$appendbutton1,$appendbutton2,$appendbutton3,$appendbutton4', '$funkbutton1,$funkbutton2,$funkbutton3,$funkbutton4', '$reverse,$plusMinus,$sum,$backspace', '$start')";
        mysqli_query($conn, $sql);
        alert("Pálya elkészítve.");
        echo "<script type='text/javascript'>window.location.assign('../html/levelMake.html');</script>";
    }
    mysqli_close($conn);
?>