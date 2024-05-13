
// validate form inputs before submiting data

function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;

    if(name == ""){
        alert("Name is required");
        return false
    }

    if(age == ""){
        alert("Age is required");
        return false;
    }
    else if (age < 1){
        alert("Age must not be zero or less then zero");
        return false;
    }

    if(address == ""){
        alert("Address is required");
        return false;
    }

    if(dob == ""){
        alert("Dob is required");
        return false;
    }

    if(email == ""){
        alert("Email is required")
        return false;
    }
    else if (!email.includes("@")){
        alert("Invaild email address");
        return false
    }

    if(number == ""){
        alert("Number is required");
        return false;
    }
    else if (number < 10){
        alert("Numbers must be in 10-digits");
        return false;
    }
    return true;

}

//Function to show data Data from local storage

function showData(){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.dob + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.number + "</td>";
        html += '<td><button onclick= "deleteData('+index+')" class="btn btn-danger">Delete</button><button onclick= "updateData('+index+')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>"           
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Loads ALL data from Local Storage when document or page loaded
document.onload = showData();

//function to add data to Local Storage

function AddData() {
   // if form is validate
    if(validateForm() == true){
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var dob = document.getElementById("dob").value;
        var email = document.getElementById("email").value;
        var number = document.getElementById("number").value;

        var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        }
        else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name : name,
            age : age,
            address : address,
            dob : dob,
            email : email,
            number: number,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("email").value = "";
        document.getElementById("number").value = "";
     
    }
}

// Function to delete Data from Loacl Storage

function deleteData(index) {
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// Function to Update/Edit data from Local Storage

function updateData(index) {
    //Sumbit button will hide and update button will show for updating for Data in Local storage.
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    var peopleList;
    if(localStorage.getItem("peopleList") == null) { 
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("dob").value = peopleList[index].dob;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("number").value = peopleList[index].number;

    document.querySelector("#update").onclick = function() {
        if (validateForm() == true){
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].dob = document.getElementById("dob").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].number = document.getElementById("number").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("dob").value = "";
            document.getElementById("email").value = "";
            document.getElementById("number").value = "";

            //Sumbit button will hide and submit button will show 

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}