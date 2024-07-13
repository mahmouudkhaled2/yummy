import { Ui } from "./ui.module.js";

export class Details 
{
    constructor () {
        this.row = document.querySelector('.details .row')
        this.ui = new Ui
    }

    async getMealDetails(id) {
        $('.loading').removeClass('d-none')
        $('body').addClass('overflow-hidden')

        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        const api = await fetch(url)
        const response = await api.json()

        this.ui.displayDetails(response, this.row,)

        $('.loading').addClass('d-none')
        $('body').removeClass('overflow-hidden')
    }
}