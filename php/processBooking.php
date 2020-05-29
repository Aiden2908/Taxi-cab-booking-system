<?php
    //php file to handle processing booking request.
    require 'databaseConnection.php';

	$fname = $_POST['fname'];//Grabing POST variable set by through JS.
	$lname = $_POST['lname'];
	$phone = $_POST['phone'];
	$unit = $_POST['unit'];
	$streetNumber = $_POST['streetNumber'];
	$street = $_POST['street'];
	$suburb = $_POST['suburb'];
	$date = $_POST['date'];
    $time = $_POST['time'];
    $timestamp = $_POST['timestamp'];
    

    $conn=get_db_conn();
    if($conn!=null){//Inserting data to db.
        $sql="INSERT INTO cabRequest(fName, lName, phone, unit, streetNumber, street, suburb, status, timestamp) 
        VALUES ('$fname','$lname ','$phone','$unit','$streetNumber','$street','$suburb','UNASSIGNED', '$timestamp')";
        $sql = "INSERT INTO cabRequest (fName, lName, phone, unit, streetNumber, street, suburb, status, timestamp) VALUES
         ('$fname','$lname ','$phone','$unit','$streetNumber','$street','$suburb','UNASSIGNED', '$timestamp')";
        if (mysqli_query($conn, $sql)) {
            //Get the last inserted ID, i.e the booking refference.
           echo "ok,$conn->insert_id,$date,$time";
        } else {
            $err= "Error: " . $sql . "<br>" . mysqli_error($conn);
            echo "error, $err";
        }
        mysqli_close($conn);
    }

?>
