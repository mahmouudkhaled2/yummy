import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js"

export class Ingriedients
{
    constructor(){
        this.row = document.querySelector('.ing-page .main-row')
        this.subMealsRow = document.querySelector('.ing-page .meals-row')

        this.ui = new Ui();
        document.querySelector('#ing').addEventListener('click', () => {
            $('.main-row').removeClass('d-none');
            $('.meals-row').addClass('d-none');
            this.getMealsData()
        })
    }

    async getMealsData() {
        $('.loading').removeClass('d-none')
        $('body').addClass('overflow-hidden')

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

        document.querySelectorAll('.ing').forEach(inge => {
            inge.addEventListener('click', () => {
                this.row.classList.add('d-none')
                this.subMealsRow.classList.remove('d-none')
                this.getIngredient(inge.dataset.ing)
            })
        })

        $('.loading').addClass('d-none')
        $('body').removeClass('overflow-hidden')
    }

    async getIngredient(ing) {
        $('.loading').removeClass('d-none')
        $('body').addClass('overflow-hidden')
        
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
        const api = await fetch(url)
        const response = await api.json()

        if( response.meals.length > 20) {
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