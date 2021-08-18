//Create a dyanamic data table

$(document).ready(function () {
  $("#myTable").DataTable({
    searching: true
  });
    

  //model-validation using jQuery

  $.validator.addMethod("regex", function (value, element, regexp) {
    var regEx = new RegExp(regexp);

    if (regEx.test(value)) {
      return true;
    } else return false;
  });

  var $formvalidate = $("#myform1");
  if ($formvalidate.length) {
    $formvalidate.validate({
      rules: {
        fname: {
          required: true,
          regex: /[a-zA-Z]{3}/g,
          maxlength: 10,
        },
        email: {
          required: true,
          regex: /^[0-9a-zA-Z.!#$&*+=?_{|}]+@[0-9a-zA-Z]/g,
        },
        roll: {
          required: true,
          maxlength: 2,
        },
        depart: {
          required: true,
        },
      },

      messages: {
        fname: {
          required: "*Please enter the first name",
          regex: "*Please enter the valid name",
          maxlength: "*Please enter max 10 Char",
        },
        email: {
          required: "*Please enter the email",
          regex: "*Please enter the valid Email",
        },
        roll: {
          required: "*Please enter the phonenumber",
          maxlength: "*Please enter valid roll",
        },
        depart: {
          required: "Please select the Department",
        },


      },
    });
  }

  //get a data from json file

  if (localStorage.key("tabledata") == null) {
    $.get("jsondata.txt", function (data) {
      var jdata = JSON.parse(data);
      localStorage.setItem("tabledata", JSON.stringify(jdata));
    });
  } else {
    CreateTable();
  }
});

//Table_creation

function CreateTable() {
  var getjdata = localStorage.getItem("tabledata");
  var olddata = JSON.parse(getjdata);
  var tbody = $("#table_body");



  for (let i = 0; i < olddata.length; i++) {
    var temp =
      "<tr><td>" +
      olddata[i].ID +
      "</td><td>" +
      olddata[i].Name +
      "</td><td>" +
      olddata[i].Email +
      "</td><td>" +
      olddata[i].Rolln +
      "</td><td>" +
      olddata[i].Department +
      "</td><td>" +
      '<button type="button" id = "btnDelete" onclick = "deleterow(' + i + ')"class="btn btn-danger"><i class="far fa-trash-alt"></i></button>' +
      ' <button type="button" id = "btnEdit"  onclick = "editrow(' + i + ')"class="btn btn-success"><i class="fas fa-edit"></i></button>' +
      "</td></tr>";
    tbody.append(temp);
  }
  $(".odd").hide();
}

//form data store in local storage

function storedata() {
  let namen = $("#name").val();
  let emailf = $("#email").val();
  let rolls = $("#rollN").val();
  let rolla = rolls.toString();
  let select1 = $("#inputState").val();



  if (namen == '' || emailf == '' || rolla == '' || select1 == '') {

    return

  }

  else {
    let getjdata1 = localStorage.getItem("tabledata");
    let olddata1 = JSON.parse(getjdata1);

    var forid = parseInt(olddata1.length);//olddata1[olddata1.length - 1].ID);
    var new_i = forid + 1;
    var new_id = new_i.toString();

    let update = $("#update").val();
    // console.log(update);


    var detail = {
      ID: new_id,
      Name: namen,
      Email: emailf,
      Rolln: rolla,
      Department: select1,
    };

    if (update == "" || update == undefined) {
      olddata1.push(detail);

      localStorage.setItem("tabledata", JSON.stringify(olddata1));

      // alert('data saved');
      // CreateTable();
    }

    else {
      let updateid  = olddata1[update].ID

      olddata1.splice(update, 1, detail);
      
      olddata1[update].ID = updateid;
      localStorage.setItem("tabledata", JSON.stringify(olddata1));
      // CreateTable();

      $("#submit-btn").html("SUBMIT");
      $("#submit-btn").css('background-color', '#24a0ed');

    }
    CreateTable();
  }
   
}

function deleterow(i) {

  let rdelete = localStorage.getItem("tabledata");
  let rowdelete = JSON.parse(rdelete);

  // let newid = rowdelete[i].ID;
  // let updateid = newid;

  rowdelete.splice(i, 1);

  for (let j = i; j < rowdelete.length; j++) {
    rowdelete[j].ID = j + 1;
  }

  // rowdelete[i].ID = updateid;

  localStorage.setItem("tabledata", JSON.stringify(rowdelete));
  location.reload();

  if (localStorage.tabledata == '[]') {
    localStorage.removeItem('tabledata');
  }
}



//Edit_Table_Data\


function editrow(i) {

  $("#update").val(i);
  let rdelete = localStorage.getItem("tabledata");
  let rowdelete = JSON.parse(rdelete);

  $('#modalForm').modal('show');
  $("#submit-btn").html("UPDATE");
  $("#submit-btn").css('background-color', '#4F8A10');

  let detail = rowdelete[i];

  $("#name").val(detail.Name);
  $("#email").val(detail.Email);
  $("#rollN").val(detail.Rolln);
  $("#inputState").val(detail.Department);
}





