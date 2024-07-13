import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js"


export class Categories
{
    constructor(){
        this.row = document.querySelector('.categories .main-row')
        this.subMealsRow = document.querySelector('.categories .meals-row')
        this.ui = new Ui();

        document.querySelector('#catg').addEventListener('click', () => {
            $('.main-row').removeClass('d-none');
            $('.meals-row').addClass('d-none');
            this.getMealsData()
        })
    }

    async getMealsData() {
        $('.loading').removeClass('d-none')
        $('body').addClass('overflow-hidden')
        
        const url = `https://www.themealdb.com/api/json/v1/1/categories.php`
        const api = await fetch(url)
        const response = await api.json()
        this.ui.displayMeals(response, this.row)

        $('.loading').addClass('d-none')
        $('body').removeClass('overflow-hidden')

        document.querySelectorAll('.category').forEach(cat => {
            cat.addEventListener('click', () => {
                this.row.classList.add('d-none')
                this.subMealsRow.classList.remove('d-none')
                this.getEachCategory(cat.dataset.category)
            })
        })
    }

    async getEachCategory(category) {
        $('.loading').removeClass('d-none')
        $('body').addClass('overflow-hidden')
        
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        const api = await fetch(url)
        const response = await api.json()
        if(response.meals.length > 20){
            response.meals.length = 20
        }
        this.ui.displaySubMeals(response, this.subMealsRow)

        document.querySelectorAll('.item').forEach(item => {
            item.addEventListener('click', () => {
                $('.details').removeClass('d-none')
                $('.details').siblings().addClass('d-none')
                new Details().getMealDetails(item.dataset.id)
            })
        })

        $('.loading').addClass('d-none')
        $('body').removeClass('overflow-hidden')
    }
}