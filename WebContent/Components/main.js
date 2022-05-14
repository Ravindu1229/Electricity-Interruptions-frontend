
$(document).ready(function() {

	$("#alertSuccess").hide();
	$("#alertError").hide();

});

function validateInterruptionForm() {
	// CODE
	if ($("#region").val().trim() == "") {
		return "Insert Region.";
	}
	if ($("#date").val().trim() == "") {
		return "Insert Date.";
	}
	if ($("#stime").val().trim() == "") {
		return "Insert Starting Time.";
	}
	if ($("#etime").val().trim() == "") {
		return "Insert Ending Time.";
	}
	if ($("#status").val().trim() == "") {
		return "Insert Status.";
	}

	return true;

}

//Save Func
function onInterruptionSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving...");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidInterruptionIDSave").val("");
	$("#formInterruptions")[0].reset();
}


// Save Btn
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------  
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------  
	var status = validateInterruptionForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------  
	var type = ($("#hidInterruptionIDSave").val() == "") ? "POST" : "PUT";

	$.ajax(
		{
			url: "InterruptionsServlet",
			type: type,
			data: $("#formInterruptions").serialize(),
			dataType: "text",
			complete: function(response, status) {
				onInterruptionSaveComplete(response.responseText, status);
			}
		});
});


// UPDATE CLICK
$(document).on("click", ".btnUpdate", function(event) {
 $("#hidInterruptionIDSave").val($(this).closest("tr").find('#hidInterruptionIDUpdate').val());
 $("#region").val($(this).closest("tr").find('td:eq(0)').text()); 
 $("#date").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#stime").val($(this).closest("tr").find('td:eq(2)').text()); 
 $("#etime").val($(this).closest("tr").find('td:eq(3)').text());
  $("#status").val($(this).closest("tr").find('td:eq(4)').text());
});


//Delete Func
$(document).on("click", ".btnRemove", function(event) 
{ 
 $.ajax( 
 { 
 url : "InterruptionsServlet", 
 type : "DELETE", 
 data : "interruptionid=" + $(this).data("interruptionid"),
 dataType : "text", 
 complete : function(response, status) 
 { 
 onInterruptionDeleteComplete(response.responseText, status); 
 } 
 }); 
});


function onInterruptionDeleteComplete(response, status) 
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully deleted."); 
 $("#alertSuccess").show(); 
 $("#divItemsGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while deleting."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while deleting.."); 
 $("#alertError").show(); 
 } 
}