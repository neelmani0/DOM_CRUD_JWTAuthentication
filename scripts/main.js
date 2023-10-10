// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${import.meta.env.REACT_APP_JSON_SERVER_PORT
  }`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const userRegisterURL = `${baseServerURL}/register`;
const userLoginURL = `${baseServerURL}/login`;

// register
let registerUserUsername = document.getElementById("register-user-username");
let registerUserFirstname = document.getElementById("register-user-firstname");
let registerUserLastname = document.getElementById("register-user-lastname");
let registerUserEmail = document.getElementById("register-user-email");
let registerUserPassword = document.getElementById("register-user-passowrd");
let registerUserAvatar = document.getElementById("register-user-avatar");
let registerUserLevel = document.getElementById("register-user-level");
let registerUserButton = document.getElementById("register-user");

// login
let loginUserUsername = document.getElementById("login-user-username");
let loginUserPassword = document.getElementById("login-user-passowrd");
let loginUserButton = document.getElementById("login-user");

// getTodo
let getTodoButton = document.getElementById("fetch-todos");

let mainSection = document.getElementById("data-list-wrapper");
let notificationWrapper = document.getElementById("notifications-wrapper");

let userAuthToken = localStorage.getItem("localAccessToken") || null;
let userId = +localStorage.getItem("userId") || null;
const urlAllTodosOfUser = `${baseServerURL}/todos?userId=${userId}`;
const urlTodosBase = `${baseServerURL}/todos/`;

// cats
let empNameInput = document.getElementById("employee-name");
let empImgInput = document.getElementById("employee-image");
let empDeptInput = document.getElementById("employee-dept");
let empSalaryInput = document.getElementById("employee-salary");
let empCreateBtn = document.getElementById("add-employee");
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let catsData = [];

// employees
let updateEmpIdInput = document.getElementById("update-employee-id");
let updateEmpNameInput = document.getElementById("update-employee-name");
let updateEmpImageInput = document.getElementById("update-employee-image");
let updateEmpDeptInput = document.getElementById("update-employee-dept");
let updateEmpSalaryInput = document.getElementById("update-employee-salary");
let updateEmpUpdateBtn = document.getElementById("update-employee");

let updateScoreEmpId = document.getElementById("update-score-employee-id");
let updateScoreEmpSalary = document.getElementById("update-score-employee-salary");
let updateScoreEmpSalaryButton = document.getElementById("update-score-employee");

let employeesData = [];
 



//console.log(employeesData)
// ***** Event listeners ***** //
window.addEventListener("load", () => {
  fetchAndRenderEmployees();
});

sortAtoZBtn.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("high to low")

        fetch("http://127.0.0.1:9090/employees",{
          "method" : "GET",
          headers : {
            "contant-type":"application/json"
          },
        })
         .then((res)=> res.json())
         .then((data)=> employeesData=data)
         .catch((err)=> console.log(err))
        console.log(employeesData)
       let epdata = employeesData.sort((a, b) =>{(b.salary-a.salary)}
       

  // // Convert salary values to numbers for proper comparison
  // const salaryA = parseInt(a.salary);
  // const salaryB = parseInt(b.salary);

  // // Compare salaries in descending order
  // if (salaryA > salaryB) {
  //   return -1; // Return a negative value to indicate "a" should come before "b"
  // } else if (salaryA < salaryB) {
  //   return 1; // Return a positive value to indicate "b" should come before "a"
  // } else {
  //   return 0; // Salaries are equal, no change in order
  // }
);

console.log(epdata);
  })

sortZtoABtn.addEventListener("click", () => {

});

loginUserButton.addEventListener("click", async function () {
  // fetchAndRenderEmployees();
});

registerUserButton.addEventListener("click", function () {

});


empCreateBtn.addEventListener("click", (e) => {
  e.preventDefault();

let name = empNameInput.value;
let dep = empDeptInput.value;
let img = empImgInput.value;
let sal = empSalaryInput.value;
 
addEmp(name,dep,img,sal);

alert("Employee added")
// async function createData() {
//   try {
//     let res = await fetch(`"http://127.0.0.1:9090/employees"`, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//       },
      // body: JSON.stringify({
      //   "name": name,
      //   "image": img,
      //   "department": dep,
      //   "salary": sal
      // })
//     });
//     if (res.ok) {
//      const data = await res.json();
//       return data;
//     } else {
//       return `server responded with a ${res.status} error.`
//     }
//   } catch (error) {
//     return 'error';
//   }
// }
// createData();


});



updateScoreEmpSalaryButton.addEventListener("click", function (e) {
  e.preventDefault()
  
  let id=updateScoreEmpId.value;
  let sal=updateScoreEmpSalary.value;
  updateSalary(id,sal);
 console.log(id, sal);
fetchAndRenderEmployees();

});

 


updateEmpUpdateBtn.addEventListener("click", function (e) {
        e.preventDefault();

  let name =  updateEmpNameInput.value;
  let dep = updateEmpDeptInput.value;
  let img = updateEmpImageInput.value;
  let sal = updateEmpSalaryInput.value;
  let id = updateEmpIdInput.value;
  console.log(name,dep, img, sal, id);
  updateAllEmpF(name,dep, img, sal, id)
  fetchAndRenderEmployees();
 
});

 function updateAllEmpF(name,dep, img, sal, id){
   fetch(`http://127.0.0.1:9090/employees${id}`,{
    "method" : "PUT",
    "body" : JSON.stringify({
      "id": id,
      "name": name,
      "image": img,
      "department": dep,
      "salary": sal
    }),
    headers: {
      'Content-Type': 'application/json', 
    }
   })
}


//"/images/avatar/avatar1.jpeg"

function fetchAndRenderEmployees() {
  fetch("http://127.0.0.1:9090/employees")
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      //console.log(data)
      employeesData = data;
       //console.log(employeesData)
      renderCardList(employeesData);
    })
}

function renderCardList(data) {
  let cardList = `
  <div class="card-list">
      ${data.map((i) => {
    return cardData(i.id, i.name, i.image, i.salary, i.department)
  }).join("")}
  </div>`
  //console.log(cardList)
  mainSection.innerHTML = cardList;
}



function cardData(id, name, img, salary, dep) {
  let card = `
   <div class="card" data-id=${id}>
   <div class="card_img">
   <img src=${img} alt="food">
   </div>
   <div class="card_body">
   <h3 class="card_item card_title">${name}</h3>
   <div class="card_item card_description">${salary}</div>
   <a href="#" data-id=${id} class="card_item card_link" >Edit</a>
   </div>
   </div>
   `
  //console.log(card)
  return card;
}

let editButtons = document.querySelectorAll(".card_item.card_link");
console.log(editButtons.length);
for (let i = 0; i < editButtons.length; i++) {
  editButtons[i].addEventListener("click", function(e) {
    e.preventDefault(); 
    console.log("Button clicked");
    
  });
}

function addEmp(name,dep,img,sal){
  // const postEmp = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json', // Set the content type to JSON
//     // You can add additional headers if needed
//   },
//   body: JSON.stringify(obj) // Convert data to JSON(object notation) format
// };

// fetch("http://127.0.0.1:9090/employees", postEmp)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json(); // Parse the response body as JSON
//   })
//   .then((responseData) => {
//     // Handle the response data here
//     console.log(responseData);
//     mainSection.innerHTML="";
//     renderCardList(responseData);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

fetch("http://127.0.0.1:9090/employees", {

method: 'POST',
  headers: {
    'Content-Type': 'application/json', 
  },
  body: JSON.stringify({
    "name": name,
    "image": img,
    "department": dep,
    "salary": sal
  })

})

}


function updateSalary(id,sal){
 
  fetch(`http://127.0.0.1:9090/employees/${id}`,{
     
       "method" : "PATCH",
       headers: {
        'Content-Type': 'application/json', 
      },
       "body" : JSON.stringify({
        "id" : id,
        "salary": sal

       }) 
  })
  alert("salaryUpdated");
}
//console.log(employeesData);
// ***** Utilities ***** //
// array of objects
// id, title, desc, linkText, linkUrl, imageUrl
// function renderCardList(cardData) {
//   let cardList = `<div class="card-list">
//   ${cardData.map((item) =>
//     getCard(item.id,item.title,item.description,
//       item.linkText,item.linkUrl,item.imageUrl)
//        ) .join("")}
//     </div>
//   `;

//   mainSection.innerHTML = cardList;

// let editLinks = document.querySelectorAll(".card__link");
// for (let editLink of editLinks) {
//   editLink.addEventListener("click", (e) => {
//     e.preventDefault();
//     let currentId = e.target.dataset.id;
//     populateEditForms(currentId);
//   });
// }
//}

// function getCard(id, title, desc, linkText, linkUrl, imageUrl) {
//   let card = `
//       <div class="card" data-id=${id} >
//         <div class="card__img">
//         <img src=${imageUrl} alt="food" />
//         </div>
//         <div class="card__body">
//           <h3 class="card__item card__title">${title}</h3>
//           <div class="card__item card__description">
//             ${desc}
//           </div>
//           <a href=${linkUrl} data-id=${id} class="card__item card__link">${linkText}</a>
//         </div>
//       </div>
//   `;
//   return card;
// }

