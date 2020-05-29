<?php
    //php to handle request database and returning data;
    require 'databaseConnection.php';
    $input=$_POST["input"];//Grabing variable set by through JS.

    $conn=get_db_conn();
    if($conn!=null){//Grabing data from db.
        $sql="SELECT * FROM cabRequest WHERE bookingNumber='$input'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            echo "<h7 style='margin-bottom:20px' class='input100'>Search Results</h7>";
            while($row = mysqli_fetch_assoc($result)) {
                $bookingNum=$row["bookingNumber"];
                $fName=$row["fName"];
                $lName=$row["lName"];
                $phone=$row["phone"];
                $unit=$row["unit"];
                $streetNumber=$row["streetNumber"];
                $street=$row["street"];
                $suburb=$row["suburb"];
                $status=$row["status"];
                $timestamp=$row["timestamp"];

                $time = date('h:i A', strtotime($timestamp));
                $timestamp = explode(' ', $timestamp);
                $date = date("d-m-Y", strtotime($timestamp[0]));

                $assignColour="";
                $assignBtn="";
                $btnColour="";

                if($unit!=""){
                    $unit="$unit - ";
                }
                if($status=="UNASSIGNED"){
                    $assignBtn="Assign Cab";
                    $assignColour="#ff9900";
                    $btnColour="#ffcc00";
                }else{
                    $assignBtn="Unassign Cab";
                    $assignColour="#61c800";
                    $btnColour="#808080";
                }
                //Echoing out data gotten from db, thnen grabing it from JS.
                echo "<div class='grid-wrapper border'>
                    <div class='booking-request-grid'>
                        <div class='grid-col booking-request-title input100'>Reference</div>
                        <div class='grid-col booking-request-title'>Name</div>
                        <div class='grid-col booking-request-title'>Phone</div>
                        <div class='grid-col booking-request-title'>Pickup Adress</div>
                        <div class='grid-col booking-request-title'>Date</div>
                        <div class='grid-col booking-request-title'>Time</div>
                        <div class='grid-col booking-request-title'>Status</div>
                        <div class='grid-col booking-request-title booking-request-button'></div>
                    </div>
                    <div class='booking-request-grid grid-col'>
                        <div class='booking-request-ref grid-col' >$bookingNum</div>
                        <div class='booking-request-name grid-col'>$fName $lName</div>
                        <div class='booking-request-phone grid-col'>$phone</div>
                        <div class='booking-request-address grid-col'>$unit $streetNumber, $street, $suburb</div>
                        <div class='booking-request-date grid-col'>$date</div>
                        <div class='booking-request-time grid-col'>$time</div>
                        <div class='booking-request-time grid-col' style='background-color: $assignColour; color: #fff;' id='$bookingNum-status'>$status</div>
                        <button class='grid-col booking-request-button' id='$bookingNum' type='button' onClick='assign(this.id);'>$assignBtn</button>
                    </div>
                </div>";
            }
        } else {
            echo '<div class="input100">0 Booking requests found.</div>';
        }


        mysqli_close($conn);
    }

   

?>