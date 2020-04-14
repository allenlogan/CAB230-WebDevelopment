let JWT = null;



//Create homebutton function
const homeButton = document.getElementById("homeBtn");
homeButton.addEventListener("click", () => {
    if (typeof this.login === "undefined")
    {
      alert(JSON.stringify("Please login to access all content."))
      return;
    }
    if (typeof this.login != "undefined")
    {
      let appDiv = document.getElementById("app");
      appDiv.innerHTML = JSON.stringify("Welcome to the offical website of The Queensland Government");
    }
});


//Login Function
const logButton = document.getElementById("logBtn");
logButton.addEventListener("click", () => {
  fetch("https://cab230.hackhouse.sh/login", {
        method: "POST",
        body: 'email=x.xxxx%40xxx.xxx.xx&password=xxxxxx',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(response => {
            if (response.ok) {
              this.login = response.clone().json();
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = JSON.stringify("Successful login. Please login again in 24 hours.");
            JWT = result.token;
            console.log('JWT token is '+ JWT);
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
});

//Logout Function
const logoutButton = document.getElementById("logoutBtn");
logoutButton.addEventListener("click", () => {
    if (typeof this.login === "undefined")
    {
      alert(JSON.stringify("You can't logout if you are not logged in."))
      return;
    }
    if (typeof this.login != "undefined")
    {
      let appDiv = document.getElementById("app");
      appDiv.innerHTML = JSON.stringify("Logged out. Please login to access all content.");
      localStorage.clear();
      window.location.href = '';
      let JWT = null;
      return;
    }
});

//Register Function
const regButton = document.getElementById("regBtn");
regButton.addEventListener("click", () => {
  fetch("https://cab230.hackhouse.sh/register", {
    method: "POST",
    body: 'email=x.xxxx%40xxx.xxx.xx&password=xxxxxx',
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(function(response) {
      if (response.ok) {
        this.register = response.clone().json();
        return response.json();
      }
      throw new Error("Network response was not ok");
    })
    .then(function(result) {
      let appDiv = document.getElementById("app");
      alert(JSON.stringify("Registration Successful."))
      appDiv.innerHTML = JSON.stringify("Account successfully registered.");
      regButton.disabled = true;
    })
    .catch(function(error) {
      console.log("There has been a problem with your fetch operation: ",error.message);
    });
});

//Search Function
const searchButton = document.getElementById("serBtn");
searchButton.addEventListener("click", () => {
    if (typeof this.login === "undefined")
    {
      alert(JSON.stringify("Please login to access all content."))
      return;
    }
    //The parameters of the call
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;
    var search = (document.getElementById("searchValue").value);
    //The URL
    const baseUrl = "https://cab230.hackhouse.sh/search?";
    const query = 'offence=' + search;
    const url = baseUrl + query;

    fetch(encodeURI(url),getParam)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
          let appDiv = document.getElementById("app");
          appDiv.innerHTML = " ";
          var outstring = "<h2> Table Representing The Search Query.<h2>" + "<h4><table></h4>";
          outstring = outstring + "<tr>";
          outstring = outstring + "<th onclick='sortTable(0)'> <button> Council Regional Area </button> </th>";
          outstring = outstring + "<th onclick='sortTable(1)'> <button> Total Offences </button> </th>";
          outstring = outstring + "</tr>";
          for (var s in result.result)
          {
            outstring = outstring + "<tr>";
            outstring = outstring + "<td>" + result.result[s].LGA + "</td>";
            outstring = outstring + "<td>" + result.result[s].total + "</td>";
            outstring = outstring + "</tr>";
          }
          outstring = outstring + "</table>";
          appDiv.innerHTML = outstring;
        })
        .catch(function(error) {
          alert(JSON.stringify("Undefined result. Please enter an offence to see results."));
          console.log("There has been a problem with your fetch operation: ",error.message);
        });

});

//Sort table
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("app");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (90); i++) {
      shouldSwitch = false;
      var outstring = "";
      x = outstring[i].getElementsByTagName("<td>")[n];
      y = outstring[i + 1].getElementsByTagName("<td>")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

//Offences Function
const offButton = document.getElementById("offBtn");
offButton.addEventListener("click", () => {
    if (typeof this.login === "undefined")
    {
      alert(JSON.stringify("Please login to access all content."))
      return;
    }
    fetch("https://cab230.hackhouse.sh/offences")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");

        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = " ";
            var outstring = "" + "<h2>Type of Offences</h2>" + "- ";
            for (var s in result.offences)
            {
              outstring = outstring + result.offences[s] + "<br>" + " -  ";
            }
            appDiv.innerHTML = outstring;
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
});



//Age filter function
const ageButton = document.getElementById("ageFilter");
ageButton.addEventListener("click", () => {
    if (typeof this.login === "undefined")
    {
      alert(JSON.stringify("Please login to access all content."))
      return;
    }
    const param = event.target.innerHTML;
    let filter = "";
    if (param === "age") {
        filter = "age= ";
      }

    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;
    var age = (document.getElementById("ageID"));
    const baseUrl = "https://cab230.hackhouse.sh/ages";
    const query = 'age=' + age;
    const url = baseUrl + query + "&" + filter;
    fetch("https://cab230.hackhouse.sh/ages")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = " ";
            var outstring = " "  + "<h2>Ages of Convited Inmates</h2>" + "<br>"  + "-  ";
            for (var s in result.ages)
            {
              outstring = outstring + result.ages[s] + "<br>" + "-  " ;
            }
            appDiv.innerHTML = outstring;
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
});

//Area filter function
const areaButton = document.getElementById("areaFilter");
areaButton.addEventListener("click", () => {
    if (typeof this.login === "undefined")
    {
      alert(JSON.stringify("Please login to access all content."))
      return;
    }
    const param = event.target.innerHTML;
    let filter = "";
    if (param === "area") {
        filter = "area= ";
      }

    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;
    var area = (document.getElementById("areaID"));
    const baseUrl = "https://cab230.hackhouse.sh/areas";
    const query = 'area=' + area;
    const url = baseUrl + query + "&" + filter;
    fetch("https://cab230.hackhouse.sh/areas")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = " ";
            var outstring = " " + "<h2>Regional and Shire Council Areas</h2>"+ "<br>" + "- ";
            for (var s in result.area)
            {
              outstring = outstring + result.area[s] + "<br>"  + " -  " ;
            }
            appDiv.innerHTML = outstring;
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
});

//Gender filter function
const genderButton = document.getElementById("genderFilter");
genderButton.addEventListener("click", () => {
    if (typeof this.login === "undefined")
    {
      alert(JSON.stringify("Please login to access all content."))
      return;
    }
    const param = event.target.innerHTML;
    let filter = "";
    if (param === "gender") {
        filter = "gender=  ";
      }
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;
    var gender = (document.getElementById("genderID"));
    const baseUrl = "https://cab230.hackhouse.sh/genders";
    const query = 'gender=' + gender;
    const url = baseUrl + query + "&" + filter;
    fetch("https://cab230.hackhouse.sh/genders")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = " ";
            var outstring = " "  + "<h2>Gender Types</h2>" + "<br>" + "- ";
            for (var s in result.gender)
            {
              outstring = outstring + result.gender[s] + "<br>"  + "-  ";
            }
            appDiv.innerHTML = outstring;
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
});

//Year filter function
const yearButton = document.getElementById("yearFilter");
yearButton.addEventListener("click", () => {
    if (typeof this.login === "undefined")
    {
      alert(JSON.stringify("Please login to access all content."))
      return;
    }
    const param = event.target.innerHTML;
    let filter = "";
    if (param === "year") {
        filter = "year=  ";
      }
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;
    var year = (document.getElementById("yearID"));
    const baseUrl = "https://cab230.hackhouse.sh/years";
    const query = 'year=' + year;
    const url = baseUrl + query + "&" + filter;
    fetch("https://cab230.hackhouse.sh/years")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(result) {
            let appDiv = document.getElementById("app");
            appDiv.innerHTML = " ";
            var outstring = " " + "<h2>Years of Offences</h2>" + "<br>" + "-  ";
            for (var s in result.year)
            {
              outstring = outstring + result.year[s] + "<br>" + "- ";
            }
            appDiv.innerHTML = outstring;
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        });
});



//Create the dropdown button function
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

//Close the dropdown if the user clicks outside of the button
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//Create contact function
const contactButton = document.getElementById("contactBtn");
contactButton.addEventListener("click", () => {
    if (typeof this.login === "undefined")
    {
      alert(JSON.stringify("Please login to access all content."))
      return;
    }
    if (typeof this.login != "undefined")
    {
      let appDiv = document.getElementById("app");
      appDiv.innerHTML = JSON.stringify("<h3>" + "Contact us for any enquiries." + "<br>" + "<h4>"+ "Phone: 0412345678" + "<br>" + "Email: qldcrime@gov.edu.au" + "<br>" + "Facebook: QLD Criminal Offences");

    }
});
