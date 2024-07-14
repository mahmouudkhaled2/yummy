import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Search {
  constructor() {
    this.row = document.querySelector(".search-page .data-row");
    this.ui = new Ui();

    document.querySelectorAll(".search-input").forEach((input) => {
      input.addEventListener("input", () => {
        if (input.id === "byNameInput" && input.value != "") {
          this.getSearchData(`s=${input.value}`);
        } else if (input.id === "byFirstLetterInput") {
          this.getSearchData(`f=${input.value}`);
        }
      });
    });
  }

  async getSearchData(value) {
    $(".loading").removeClass("d-none");
    $("body").addClass("overflow-hidden");

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

    document.querySelectorAll(".item").forEach((item) => {
      item.addEventListener("click", () => {
        $(".details").removeClass("d-none");
        $(".details").siblings().addClass("d-none");
        new Details().getMealDetails(item.dataset.id);
      });
    });

    $(".loading").addClass("d-none");
    $("body").removeClass("overflow-hidden");
  }
}
