//JS to handle cab booking process.
var xhr = createRequest();

function getData(dataSource) {
    var inputs=validateForm();
    var paramNames=["fname","lname","phone","unit","streetNumber","street","suburb","date","time"];
    var params="";
    for(var i=0;i<inputs.length;i++){//Creating parameters to pass to php.
        params+=paramNames[i]+"="+inputs[i]+"&";
    }
    params+="timestamp="+getTimestamp();

    if(xhr) {
		xhr.open('POST', dataSource, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	    xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
                var data=xhr.responseText.split(',');//Grabbing the returned data from php.
                if(data[0].indexOf("ok") !== -1){//Check if string contains the sub-string 'ok'.
                    document.getElementById("booking-form").style = "display: none";
                    document.getElementById("booking-confirmation").style="display: block"
                    document.getElementById("booking-confirmation-text").innerHTML="Thank you! Your booking"+
					"reference number is <span style='color: #ffcc00;font-size: larger;'>"+data[1]+"</span>. You will be picked up in front of your provided "+
					"address at "+data[3]+" on "+data[2]+".";
                }else{
                    document.getElementById("errorMessage").innerHTML = data[1];
                }
            }
	    }
	    xhr.send(params);
	}
} 

function validateForm(){//Validates user input.
    var inputs=[];
    var els = document.getElementsByName("input");
    document.getElementById("errorMessage").innerHTML = "";
    for (var i = 0; i < els.length; i++) {
            els[i].classList.remove("error-border");//Remove any old error(s).
    }
    
    for (var i = 0; i < els.length; i++) {
        if(!els[i].value&&els[i].id!="unit"){//If any required field(s) are empty, then return null.
            els[i].classList.add("error-border");
            document.getElementById("errorMessage").innerHTML = "Please fill out the field.";
            return null;
        }
        
        inputs.push(els[i].value);
    }
    return inputs;
}


function dateHandler(event){//Function to handle user date input, if the date is less than current date,
    //when date-input losses focus this function will fire and change date
    //if needed.
    var setDate=event.target.value.split("-");
    var date=getCurrentDate().split("-");

    //current date
    var year=parseInt(date[0]);
    var month=parseInt(date[1]);
    var day=parseInt(date[2]);

    //user set date
    var sYear=parseInt(setDate[0]);
    var sMonth=parseInt(setDate[1]);
    var sDay=parseInt(setDate[2]);

    if(sYear<year){
        document.getElementById("date").value=getCurrentDate();
    }else if(sYear==year){
        if(sMonth<month){
            document.getElementById("date").value=getCurrentDate();
        }else if(sMonth==month){
            if(sDay<day){
                document.getElementById("date").value=getCurrentDate();
            }
        }
    }
}

function getCurrentDate(){//Function to get current date form JS.
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;
    return today;

}
function getTimestamp(){//Combining date and time to create a timestamp for booking request.
    var date=document.getElementById("date").value;
    var time=document.getElementById("time").value;
    return date+" "+time+":00";
    
    
}
document.getElementById("date").value=getCurrentDate();