<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="com.Interruptions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Interruptions Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.4.1.min.js"></script>
<script src="Components/main.js"></script>
</head>
<body>

	<div class="container">
		<div class="card">
			<div class="card-header bg-info text-light d-flex align-items-center">
				<h1>Interruptions Management</h1>
			</div>
			<div class="card-body">
				<form id="formInterruptions" name="formInterruptions" method="post" action="Interruptions.jsp">
					Region: <input id="region" name="region" type="text"
						class="form-control form-control-sm"> <br> Date: <input
						id="date" name="date" type="date"
						class="form-control form-control-sm"> <br> Starting Time : <input
						id="stime" name="stime" type="text"
						class="form-control form-control-sm"><br> End Time :
					<input id="etime" name="etime" type="text"
						class="form-control form-control-sm"> <br> Status :
					<input id="status" name="status" type="text"
						class="form-control form-control-sm"> <br>
					<div class="text-right">
						<input id="btnSave" name="btnSave" type="button" value="SAVE"
							class="btn btn-primary"> <input type="hidden"
							id="hidInterruptionIDSave" name="hidInterruptionIDSave" value="">
					</div>
				</form>
				<div id="alertSuccess" class="alert alert-success" style="margin-top: 15px"></div>
				<div id="alertError" class="alert alert-danger" style="margin-top: 15px"></div>
				<div id="divItemsGrid" class="table-responsive">
					<%
						Interruptions interruptionsObj = new Interruptions();
								out.print(interruptionsObj.readInterruptions());
					%>
				</div>
			</div>

		</div>
	</div>
</body>
</html>