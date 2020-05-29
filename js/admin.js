//JS to handle Admin actions.
var xhr = createRequest();

function searchBookingRequest(dataSource){//Handles searching booking refernce number and displaying it.
    var serachInput=document.getElementById("search-booking");
    serachInput.classList.remove("error-border");//Removing old errors.
    serachInput.classList.add("border");

    if(!serachInput.value){
        serachInput.classList.remove("border");
        serachInput.classList.add("error-border");
        return;
    }
    var params="input="+serachInput.value;
    if(xhr) {
		xhr.open('POST', dataSource, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	    xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
                var showSearch=document.getElementById("show-search");
                showSearch.innerHTML=xhr.responseText;
            }
        }
	    xhr.send(params);
	}
}

function assign(refNumber){//Handles assigning and unassigning booking requests.
    dataSource="php/assignCab.php";
    var button=document.getElementById(refNumber);
    var action="";
    if(button.innerText=="Assign Cab"){
        action="ASSIGNED";
    }else{
        action="UNASSIGNED";
    }
    
    var params="bookingNumber="+refNumber+"&action="+action;
    if(xhr) {
		xhr.open('POST', dataSource, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	    xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
                var response=xhr.responseText.split(",")[0];//Changing some styles and text depending on the response from db.
                var status=document.getElementById(refNumber+"-status");
                if(response=="Unassign Cab"){
                    button.innerText=xhr.responseText.split(",")[0];
                    status.innerHTML=xhr.responseText.split(",")[1];
                    status.style="background-color: #61c800; color: #fff;";
                }else{
                    button.innerText=xhr.responseText.split(",")[0];
                    status.innerHTML=xhr.responseText.split(",")[1];
                    status.style="background-color: #ff9900; color: #fff;";
                    button.style="style='color: #ffcc00;";
                }
                showAllBookingRequestsWithinTwoHours();

            }
        }
	    xhr.send(params);
	}
}
function showAllBookingRequestsWithinTwoHours(){//Handles showing all the booking requests wthin the next two hours.
    dataSource="php/showBookingRequests.php";
    var targetDIV=document.getElementById("allBookingRequestWithinTwoHours");
    var params="";
    if(xhr) {
		xhr.open('POST', dataSource, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	    xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				targetDIV.innerHTML = xhr.responseText;
            }
	    }
	    xhr.send(params);
	}
}
    
showAllBookingRequestsWithinTwoHours();