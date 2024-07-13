export class Ui {
  constructor() {}

  // Display All Meals in Main Sections
  displayMeals(data, row) {
    let myData;

    if (data.meals) {
      myData = data.meals;

      row.innerHTML = "";

      for (let i = 0; i < myData.length; i++) {
        row.innerHTML += `
                    <div data-id="${myData[i].idMeal}" class="item col-md-6 col-lg-4 col-xl-3 ">
                        <div class="meal-box cursor rounded overflow-hidden position-relative">
                            <img src="${myData[i].strMealThumb}" class="w-100" alt="">
                            <div class="overlay w-100 h-100 position-absolute d-flex align-items-center p-3">
                                <h2 class="fw-semibold">${myData[i].strMeal}</h2>
                            </div>
                        </div>
                    </div>
                `;
      }
    } else if (data.categories) {
      myData = data.categories;
      row.innerHTML = "";
      for (let i = 0; i < myData.length; i++) {
        const longDesc = myData[i].strCategoryDescription.split(" ");
        const shortDesc = longDesc.slice(0, 20).join(" ");

        row.innerHTML += `
                    <div data-id="${myData[i].idCategory}" data-category='${myData[i].strCategory}' class="category col-md-6 col-xl-3">
                        <div class="meal-box cursor rounded overflow-hidden position-relative">
                            <img src="${myData[i].strCategoryThumb}" class="w-100" alt="">
                            <div class="overlay w-100 h-100 position-absolute text-center p-3">
                                <h4 class="fw-semibold">${myData[i].strCategory}</h4>
                                <p class="cat-description">${shortDesc}</p>
                            </div>
                        </div>
                    </div>
                `;
      }
    } else if (data.areas) {
      myData = data.areas;
      row.innerHTML = "";
      for (let i = 0; i < myData.length; i++) {
        row.innerHTML += `
                    <div data-area="${myData[i].strArea}" class="area col-sm-6 col-md-4 col-lg-3">
                <div class="text-center text-white cursor">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${myData[i].strArea}</h3>
                </div>
            </div>
                `;
      }
    } else if (data.ingredients) {
      myData = data.ingredients;

      for (let i = 0; i < myData.length; i++) {
        row.innerHTML += `
                    <div data-ing='${myData[i].strIngredient}' data-id="${
          myData[i].idIngredient
        }" class="ing col-md-6 col-lg-4 col-xl-3">
                        <div class="text-center text-white cursor">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3 class="my-2">${myData[i].strIngredient}</h3>
                            <p class="text-center">
                                ${myData[i].strDescription
                                  .split(" ")
                                  .slice(0, 20)
                                  .join(" ")}
                            </p>
                        </div>
                    </div>
                    `;
      }
    }
  }

  // Display All Sub Meals
  displaySubMeals(data, row) {
    let myData = data.meals;

    row.innerHTML = "";

    for (let i = 0; i < myData.length; i++) {
      row.innerHTML += `
                    <div data-id="${myData[i].idMeal}" class="item meal col-md-6 col-lg-4 col-xl-3 ">
                        <div class="meal-box cursor rounded overflow-hidden position-relative">
                            <img src="${myData[i].strMealThumb}" class="w-100" alt="">
                            <div class="overlay w-100 h-100 position-absolute d-flex align-items-center p-3">
                                <h2 class="fw-semibold">${myData[i].strMeal}</h2>
                            </div>
                        </div>
                    </div>
                `;
    }
  }
  // Display All Details of Each Meal
  displayDetails(data, row) {
    const myDetails = data.meals;

    /* Get All recipes values and push them into array then used loop of to display all Recpies
        in dom row and repeated these steps to get and display Tags "if exist" */

    // Recipes
    const meal = myDetails[0];
    const recipesList = [];
    const keys = Object.keys(meal);

    for (let i = 1; i <= 53; i++) {
      const IngKey = `strIngredient${i}`;
      if (keys.includes(IngKey)) {
        const recpies = meal[IngKey];
        if (recpies && recpies.trim() !== "") {
          recipesList.push(recpies.trim());
        }
      }
    }

    let recipesRow = ``;
    for (const recpies of recipesList) {
      recipesRow += `
                <span class="span-rec px-2 py-1 bg-body text-dark rounded">${recpies}</span>
            `;
    }

    // Tags
    let tagsList = [];
    let tagsRow = ``;
    if (meal.strTags != null) {
      tagsList = meal.strTags.split(",");
      for (const tag of tagsList) {
        tagsRow += `<span class="span-rec px-2 py-1 bg-body text-dark rounded">${tag}</span>`;
      }
    }

    // Details Dom Row
    const setDataAtElements = function () {
      document.querySelector('.instrctions-title').innerHTML = `Instructions`
      document.querySelector('.area-title').innerHTML = `Area :`
      document.querySelector('.cat-title').innerHTML = `Category :`
      document.querySelector('.recipes-heading').innerHTML = `Recipes :`
      document.querySelector('.tags-heading').innerHTML = `Tags :`
      document.querySelector('.meal-img').setAttribute('src', `${myDetails[0].strMealThumb}`)
      document.querySelector('.meal-name').innerHTML = `${myDetails[0].strMeal}`
      document.querySelector('.instructions').innerHTML = `${myDetails[0].strInstructions}`
      document.querySelector('.meal-area').innerHTML = `${myDetails[0].strArea}`
      document.querySelector('.meal-category').innerHTML = `${myDetails[0].strCategory}`
      document.querySelector('.recipes-box').innerHTML = `${recipesRow}`
      document.querySelector('.tags-box').innerHTML = `${tagsRow}`
      document.querySelector('.meal-btns').innerHTML = `
                                                    <button class="btn btn-success">
                                                      <a href="${myDetails[0].strSource}" target="_blank" class="text-white">Source</a>
                                                    </button>

                                                    <button class="btn btn-danger">
                                                      <a href="${myDetails[0].strYoutube}" target="_blank" class="text-white">Youtube</a>
                                                    </button>
      `
    }  
    
    setDataAtElements()
    
    /* Another Way To Display Details */

    // row.innerHTML = `
    //     <div class="col-md-4">
    //         <div class="image">
    //           <img src="${myDetails[0].strMealThumb}" alt="meal image" class="w-100 rounded">
    //           <h2 class="mt-2 text-white">${myDetails[0].strMeal}</h2>
    //         </div>
    //       </div>

    //       <div class="col-md-8">
    //         <div class="meal-details pt-4 pt-md-0 text-white">
    //           <h3 class="fs-2">Instructions</h3>
    //           <p>
    //           ${myDetails[0].strInstructions}
    //           </p>
    //           <h3 class="fw-bold">Area : <span class="fw-medium text-warning">${myDetails[0].strArea}</span></h3>
    //           <h3 class="fw-bold">Category : <span class="fw-medium text-warning">${myDetails[0].strCategory}</span></h3>

    //           <div class="recipes my-4">
    //             <h3 class="recipes mb-3">Recipes :</h3>
    //             <div class='d-flex flex-wrap gap-2 '>
    //             ${recipesRow}
    //             </div>
    //           </div>
              
    //           <div class="tags mb-4">
    //             <h3 class="mb-3">Tags :</h3>
    //             <div class='d-flex flex-wrap gap-2 '>
    //             ${tagsRow}
    //             </div>
    //           </div>

    //           <button class="btn btn-success">
    //             <a href="${myDetails[0].strSource}" class="text-white">Source</a>
    //           </button>

    //           <button class="btn btn-danger">
    //             <a href="${myDetails[0].strYoutube}" class="text-white">Youtube</a>
    //           </button>
    //         </div>
    //       </div>
    //     `;
  }
}
