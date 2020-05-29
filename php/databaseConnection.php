<?php
    //Handles connecting to database and returning the connection if successful.
	function get_db_conn(){
        $sql_host="localhost";
        $sql_user="";
        $sql_pass="";
        $sql_db="";
        
        $conn = mysqli_connect($sql_host,
            $sql_user,
            $sql_pass,
            $sql_db
        );
    
        //Checks if connection is successful.
        if(!$conn){
            echo "error, Connection to database failed.";
            return null;
        }
        
        $dbSelect = @mysqli_select_db($conn,$sql_db);
        if (!$dbSelect) {
            echo "error, Selecting the database failed.";
            return null;
        } else {
            return $conn;
        }
    }
?>