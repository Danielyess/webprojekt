<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eredmény tábla</title>
    <style>
        table {
            border-collapse: collapse;
            width: 50%;
            margin: 20px;
        }

        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

    <?php
    include("connection.php");

    
    $sql = "SELECT username, max_level FROM user_info ORDER BY max_level DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Display scores in a table
        echo "<table>
                <tr>
                    <th>Név</th>
                    <th>Szint</th>
                </tr>";

        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>" . $row["username"] . "</td>
                    <td>" . $row["max_level"] . "</td>
                  </tr>";
        }

        echo "</table>";
    } else {
        echo "Nincsenek még felhasználók.";
    }

    // Close the connection
    $conn->close();
    ?>

</body>
</html>
