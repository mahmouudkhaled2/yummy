import { Assistant} from "./assist.js";

export class Categories
{
    constructor(){
        this.api = new Assistant();
        this.row = document.querySelector('.categories .main-row')
        this.subMealsRow = document.querySelector('.categories .meals-row')
        this.catsUrl = `https://www.themealdb.com/api/json/v1/1/categories.php`
        this.subURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=`
        this.api.openSection('#catg',  this.row, this.subMealsRow, this.catsUrl, this.subURL)
    }
}