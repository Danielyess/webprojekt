<?php

function alert($msg) {
    echo "<script type='text/javascript'>alert('$msg');</script>";
}

include("connection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $newMaxLevel = $_POST["max_level"];
    
    $username = $conn->real_escape_string($username);
    $password = $conn->real_escape_string($password);


    $sql = "SELECT * FROM user_info WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $sql = "SELECT username, current_level, max_level FROM user_info WHERE username = '$username' AND password = '$password'";
        $result2 = $conn->query($sql);

        if($row = $result2->fetch_assoc()) {
            $user_details = $row;
        }

        echo json_encode($user_details);
        $sql = "UPDATE user_info SET max_level = '$newMaxLevel' WHERE username = '$username' AND password = '$password'";

    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
        alert("Sikeres mentés: $username-ként.");
        echo "<script type='text/javascript'>window.location.assign('../html/jatek.html');</script>";
    } else {
        echo "Error updating record: " . $conn->error;
    }
    } 
    else {
        alert("Rossz felhasználónév vagy jelszó.");
	echo "<script type='text/javascript'>window.location.assign('../html/login.html');</script>";

    }
}

$conn->close();
?>




