import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js"

export class Area
{
    constructor(){
        this.row = document.querySelector('.area-page .main-row')
        this.subMealsRow = document.querySelector('.area-page .meals-row')
        this.ui = new Ui();

        document.querySelector('#area').addEventListener('click', () => {
            $('.main-row').removeClass('d-none');
            $('.meals-row').addClass('d-none');
            this.getMealsData()
        })
    }

    async getMealsData() {
        $('.loading').removeClass('d-none')
        $('body').addClass('overflow-hidden')
        
        const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
        const api = await fetch(url)
        const response = await api.json()

        const data = {
            "areas": [...response.meals]
        }

        this.ui.displayMeals(data, this.row)

        document.querySelectorAll('.area').forEach(area => {
            area.addEventListener('click', () => {
                this.row.classList.add('d-none')
                this.subMealsRow.classList.remove('d-none')
                this.getEachArea(area.dataset.area)
            })
            })

        $('.loading').addClass('d-none')
        $('body').removeClass('overflow-hidden')
    }

    async getEachArea(area) {
        $('.loading').removeClass('d-none')
        $('body').addClass('overflow-hidden')
        
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
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