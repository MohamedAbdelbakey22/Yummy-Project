let rowData = document.getElementById("rowData");
let innerBody = document.getElementById("innerBody");
let nameInput;
let emailInput;
let phoneInput;
let ageInput;
let passwordInput;
let repasswordInput;
let submitBtn;

let navTabWidth = $(".side-nav-menu .nav-tab").outerWidth();
$(".side-nav-menu").css({ left: -navTabWidth });

// ==== Stop Side Bar ====
function stopSideBar() {
  if ($(".side-nav-menu").css("left") == "0px") {
    $(".side-nav-menu").animate({ left: -navTabWidth }, 500);
    $("i.open-close-icon").addClass("bi-justify");
    $("i.open-close-icon").removeClass("bi-x");
    $(".links li").animate({ top: 300 }, 500);
  } else {
    $(".side-nav-menu").animate({ left: 0 }, 500);
    $("i.open-close-icon").removeClass("bi-justify");
    $("i.open-close-icon").addClass("bi-x");
    for (let i = 0; i < 5; i++) {
      $(".links li")
        .eq(i)
        .animate({ top: 0 }, (i + 5) * 150);
    }
  }
}

function stop() {
  if ($(".side-nav-menu").css("left") == "0px") {
    $(".side-nav-menu").animate({ left: -navTabWidth }, 500);
    $("i.open-close-icon").addClass("bi-justify");
    $("i.open-close-icon").removeClass("bi-x");
    $(".links li").animate({ top: 300 }, 500);
  }
}

$(".open-close-icon").click(() => {
  stopSideBar();
});

// ==== Loading Screen ====
$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css({ overflow: "visible" });
    $(".inner-loading-screen").fadeOut(500);
  });
});

// ==== Display Search By Name ====
async function searchByName(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}

// ==== Display Search By First letter ====
async function searchByFirstLetter(term) {
  $(".inner-loading-screen").fadeIn(300);
  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

// ==== Display Search By Name ====
function displaySearchByName() {
  let searchByName = `
  <div class="col-md-6">
                    <input onkeyup="searchByName(this.value)" type="search" class="form-control bg-transparent text-white cursor-pointer" placeholder="Search By Name">
                </div>
                <div class="col-md-6">
                    <input onkeyup="searchByFirstLetter(this.value)" type="search" class="form-control bg-transparent text-white cursor-pointer" maxlength="1"
                        placeholder="Search By First Letter">
                </div>`;
  rowData.innerHTML = searchByName;
  innerBody.innerHTML = "";
}

$(".links li:nth-of-type(1)").click(() => {
  displaySearchByName();
  stopSideBar();
});

// ==== Display Meals ====
function displayMeals(meal) {
  let mealsContainer = ``;
  for (let i = 0; i < meal.length; i++) {
    mealsContainer += `
    <div class="col-lg-3 col-md-4 col-sm-6">
                    <div onclick="getMealsDetails('${meal[i].idMeal}')" class="meal rounded-2 position-relative overflow-hidden cursor-pointer">
                        <img class="w-100" src="${meal[i].strMealThumb}">
                        <div class="meal-layer text-black d-flex align-items-center">
                            <h3 class='p-2'>${meal[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`;
  }
  innerBody.innerHTML = mealsContainer;
}

// ==== Get Categories ====
async function getCategories() {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategory(response.categories);
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeOut(300);
}

$(".links li:nth-of-type(2)").click(() => {
  getCategories();
  stopSideBar();
});

// ==== Display Categories ====
function displayCategory(category) {
  let categoriesContainer = ``;
  for (let i = 0; i < category.length; i++) {
    categoriesContainer += `
    <div class="col-lg-3 col-md-4 col-sm-6">
                    <div onclick='getCategoriesMeals("${
                      category[i].strCategory
                    }")' class="meal rounded-2 position-relative overflow-hidden cursor-pointer">
                        <img class="w-100" src="${
                          category[i].strCategoryThumb
                        }">
                        <div class="meal-layer text-black text-center">
                            <h3 class='p-2'>${category[i].strCategory}</h3>
                            <p>${category[i].strCategoryDescription
                              .split(" ")
                              .slice(0, 20)
                              .join(" ")}</p>
                        </div>
                    </div>
                </div>`;
  }
  innerBody.innerHTML = categoriesContainer;
}

// ==== Get Area ====
async function getArea() {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeOut(300);
}

$(".links li:nth-of-type(3)").click(() => {
  getArea();
  stopSideBar();
});

// ==== Display Area ====
function displayArea(area) {
  let areaContainer = ``;
  for (let i = 0; i < area.length; i++) {
    areaContainer += `
    <div class="col-lg-3 col-md-4 col-sm-6">
                    <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3 class='p-2'>${area[i].strArea}</h3>
                    </div>
                </div>`;
  }
  innerBody.innerHTML = areaContainer;
}

// ==== Get Ingredients ====
async function getIngredients() {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredient(response.meals.slice(0, 20));
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeOut(300);
}

$(".links li:nth-of-type(4)").click(() => {
  getIngredients();
  stopSideBar();
});

// ==== Display Ingredients ====
function displayIngredient(ingredient) {
  let ingredientContainer = ``;
  for (let i = 0; i < ingredient.length; i++) {
    ingredientContainer += `
    <div class="col-lg-3 col-md-4 col-sm-6">
                    <div onclick="getIngredientMeals('${
                      ingredient[i].strIngredient
                    }')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 class='p-2'>${ingredient[i].strIngredient}</h3>
                    <p>${ingredient[i].strDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
                    </div>
                </div>`;
  }
  innerBody.innerHTML = ingredientContainer;
}

// ==== Get Categories Meals ====
async function getCategoriesMeals(category) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

// ==== Get Area Meals ====
async function getAreaMeals(area) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

// ==== Get Ingredients Meals ====
async function getIngredientMeals(ingredient) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

// ==== Get Meals Details ====
async function getMealsDetails(mealId) {
  stop();
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();
  displayMealsDetails(response.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}

// ==== Display Meals Details ====
function displayMealsDetails(meal) {
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `
      <li class="alert alert-info">${meal[`strMeasure${i}`]} ${
        meal[`strIngredient${i}`]
      }</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsContainer = ``;
  for (let i = 0; i < tags.length; i++) {
    tagsContainer += `
    <li class="alert alert-danger">${tags[i]}</li>`;
  }

  let mealDetails = `
  
  <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                        alt="${meal.strMeal}">
                    <h2>${meal.strMeal}</h2>
                    <div class='position-fixed bottom-0'>
                    <i onclick="window.location.reload()" class="arrowLeft bi bi-arrow-left fa-3x"></i>
                    </div>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area</span> : ${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category</span> : ${meal.strCategory}</h3>
                    <h3><span class="fw-bolder">Recipes :</span></h3>
                    <ul class="d-flex gap-2 flex-wrap">
                      ${ingredients}
                    </ul>
                    <h3><span class="fw-bolder">Tags :</span></h3>
                    <ul class="d-flex gap-2 flex-wrap">
                        ${tagsContainer}
                    </ul>
                    <a href="${meal.strSource}" class="btn btn-success" target="_blank">Source</a>
                    <a href="${meal.strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
                </div>`;
  innerBody.innerHTML = mealDetails;
}

// ==== Display Contact ====

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

// ==== Display Contact ====
function displayContact() {
  innerBody.innerHTML = `
  <div class="container w-75 min-vh-100 d-flex flex-column justify-content-center align-items-center">
                    <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div class="col">
                        <input id='nameInput' onkeyup="inputsValidation()" type="text" placeholder="Enter Your Name" class="form-control">
                        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Special characters and Numbers are not allowed
                        </div>
                    </div>
                    <div class="col">
                        <input id='emailInput' onkeyup="inputsValidation()" type="email" placeholder="Enter Your Email" class="form-control">
                        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Email not valid *example@yyy.mmm
                        </div>
                    </div>
                    <div class="col">
                        <input id='phoneInput' onkeyup="inputsValidation()" type="tel" placeholder="Enter Your Phone" class="form-control">
                        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Phone not valid
                        </div>
                    </div>
                    <div class="col">
                        <input id='ageInput' onkeyup="inputsValidation()" type="number" placeholder="Enter Your Age" class="form-control">
                        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid age
                        </div>
                    </div>
                    <div class="col">
                        <input id='passwordInput' onkeyup="inputsValidation()" type="password" placeholder="Enter Your Password" class="form-control">
                        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid password * minimum eight Characters . at least one character and one number
                        </div>
                    </div>
                    <div class="col">
                        <input id='repasswordInput' onkeyup="inputsValidation()" type="password" placeholder="Repassword" class="form-control">
                        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                          Enter valid Repassword
                        </div>
                    </div>
                    </div>
                    <button onclick='registerComplete()' id='submitBtn' disabled class="btn btn-outline-danger mt-4 px-2">Submit</button>
                </div>`;
  submitBtn = document.getElementById("submitBtn");
  nameInput = document.getElementById("nameInput");
  emailInput = document.getElementById("emailInput");
  phoneInput = document.getElementById("phoneInput");
  ageInput = document.getElementById("ageInput");
  passwordInput = document.getElementById("passwordInput");
  repasswordInput = document.getElementById("repasswordInput");

  nameInput.addEventListener("focus", () => {
    nameInputTouched = true;
  });

  emailInput.addEventListener("focus", () => {
    emailInputTouched = true;
  });

  phoneInput.addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  ageInput.addEventListener("focus", () => {
    ageInputTouched = true;
  });

  passwordInput.addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  repasswordInput.addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

$(".links li:nth-of-type(5)").click(() => {
  displayContact();
  stopSideBar();
});

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
    }
  }

  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      emailInput.classList.add("is-valid");
      emailInput.classList.remove("is-invalid");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
      emailInput.classList.remove("is-valid");
      emailInput.classList.add("is-invalid");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      phoneInput.classList.add("is-valid");
      phoneInput.classList.remove("is-invalid");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
      phoneInput.classList.remove("is-valid");
      phoneInput.classList.add("is-invalid");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      ageInput.classList.add("is-valid");
      ageInput.classList.remove("is-invalid");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
      ageInput.classList.remove("is-valid");
      ageInput.classList.add("is-invalid");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
      passwordInput.classList.add("is-valid");
      passwordInput.classList.remove("is-invalid");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
      passwordInput.classList.remove("is-valid");
      passwordInput.classList.add("is-invalid");
    }
  }

  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
      repasswordInput.classList.add("is-valid");
      repasswordInput.classList.remove("is-invalid");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
      repasswordInput.classList.remove("is-valid");
      repasswordInput.classList.add("is-invalid");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z\-]+$/.test(nameInput.value);
}

function emailValidation() {
  return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailInput.value);
}

function phoneValidation() {
  return /^(\+2)?01[0125][0-9]{8}$/.test(phoneInput.value);
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value);
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(passwordInput.value);
}

function repasswordValidation() {
  return passwordInput.value == repasswordInput.value;
}

function registerComplete() {
  $(".meals").removeClass("d-flex");
  $(".meals").addClass("d-none");
  $("#registerComplete").removeClass("d-none");
  $("#registerComplete").addClass("d-flex");
}

$("#registerComplete button").click(() => {
  $("#registerComplete").fadeOut(500, function () {
    $(".meals").fadeIn(0, function () {
      window.location.reload();
    });
  });
});

// ==== Register ====
// function register() {
//   let box = `
//   <form>
//                 <h2>Sign in</h2>
//                 <div class="inputBox">
//                     <input type="text" required>
//                     <span>Username</span>
//                     <i></i>
//                 </div>
//                 <div class="inputBox">
//                     <input type="password" required>
//                     <span>Password</span>
//                     <i></i>
//                 </div>
//                 <div class="links">
//                     <a href="#">Forget Password</a>
//                     <a href="#">Create Account</a>
//                 </div>
//                 <input type="submit" value="login">
//             </form>`;
//   document.getElementById("box").innerHTML = box;
//   innerBody.innerHTML = "";
// }
