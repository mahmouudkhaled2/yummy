import { Assistant } from "./assist.js";
import { Ui } from "./ui.module.js"

export class Area
{
    constructor(){
        this.ui = new Ui();
        this.api = new Assistant();
        this.row = document.querySelector('.area-page .main-row')
        this.subMealsRow = document.querySelector('.area-page .meals-row')
        this.mainURL = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
        this.subURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`
        this.api.openSection('#area', this.row, this.subMealsRow)
        this.getMealsData()
    }

    async getMealsData() {
        this.api.showLoader()
        
        const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
        const api = await fetch(url)
        const response = await api.json()

        const data = {
            "areas": [...response.meals]
        }

        this.ui.displayMeals(data, this.row)

        this.api.runSubMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=`, '.area', this.row, this.subMealsRow)

            this.api.hideLoader()
    }
}