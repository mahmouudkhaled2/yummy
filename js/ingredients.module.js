import { Assistant } from "./assist.js";
import { Ui } from "./ui.module.js"

export class Ingriedients
{
    constructor(){
        this.ui = new Ui();
        this.api = new Assistant();
        this.row = document.querySelector('.ing-page .main-row')
        this.subMealsRow = document.querySelector('.ing-page .meals-row')
        this.api.openSection('#ing', this.row, this.subMealsRow)
        this.getMealsData()
    }

    async getMealsData() {
        this.api.showLoader()
        
        const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
        const api = await fetch(url)
        const response = await api.json()

        if( response.meals.length > 20) {
            response.meals.length = 20
        }

        const data = {
            "ingredients": [...response.meals]
        }

        this.ui.displayMeals(data, this.row)

        this.api.runSubMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`, '.ing', this.row, this.subMealsRow)

        this.api.hideLoader()
    }
}