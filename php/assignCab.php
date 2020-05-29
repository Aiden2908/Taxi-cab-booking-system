<?php
    //php file to hadle assiging and unassigning booking requests.
    require 'databaseConnection.php';
    $bookingNumber= $_POST['bookingNumber'];
    $action= $_POST['action'];
    
    $conn=get_db_conn();//called from 'require' php.
    if($conn!=null){
        $sql = "UPDATE cabRequest SET status = '$action' WHERE bookingNumber='$bookingNumber';";
        if (mysqli_query($conn, $sql)) {
            if($action=="ASSIGNED"){
                echo "Unassign Cab,ASSIGNED";//Echo out the response so JS can grab it. 
            }else{
                echo "Assign Cab,UNASSIGNED";
            }
        } else {
            echo "Error";
        }
        mysqli_close($conn);
    }

?>
