import { Ui } from "./ui.module.js";
import { Assistant } from "./assist.js"

export class Search {

  constructor() {
    this.ui = new Ui();
    this.api = new Assistant()
    this.row = document.querySelector(".search-page .data-row");

    document.querySelectorAll(".search-input").forEach((input) => {
      input.addEventListener("input", () => {
        if (input.id === "byNameInput" && input.value !== '') {
          this.getSearchData(`s=${input.value}`);
        } 
        else if (input.id === "byFirstLetterInput" && input.value !== '') {
          this.getSearchData(`f=${input.value}`);
        }
      });
    });
  }

  async getSearchData(value) {

    this.api.showLoader()

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?${value}`;
    const api = await fetch(url);
    const response = await api.json();
    if (response.meals && response.meals.length > 20) {
      response.meals.length = 20;
    }
    if (response.meals != null){
      this.ui.displayMeals(response, this.row)
    }else {
      this.row.innerHTML = ``
    }
    
    this.api.runDetails('.item')

    this.api.hideLoader()
  }
}
