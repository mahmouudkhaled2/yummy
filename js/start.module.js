import { Ui } from "./ui.module.js"
import { Search } from "./search.module.js"
import { Categories } from "./categories.module.js"
import { Area } from "./area.module.js"
import { Ingriedients } from "./ingredients.module.js"
import { Form } from "./form.module.js"
import { Details } from "./details.module.js"




export class Start {
    constructor () {
        this.homeData = document.querySelector('.home .row')
        this.ui = new Ui()
        this.search = new Search()
        this.categories = new Categories()
        this.area = new Area()
        this.ingriedients = new Ingriedients()
        this.form = new Form()
        this.details = new Details()
        this.getMealsData()
    }

    async getMealsData() {
        $('.loading').removeClass('d-none')
        $('body').addClass('overflow-hidden')

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
        const api = await fetch(url)
        const response = await api.json()
        this.ui.displayMeals(response, this.homeData)

        document.querySelectorAll('.item').forEach(item => {
            item.addEventListener('click', () => {
                $('.details').removeClass('d-none')
                $('.details').siblings().addClass('d-none')
                this.details.getMealDetails(item.dataset.id)
            })
        })

        $('.loading').addClass('d-none')
        $('body').removeClass('overflow-hidden')
        $('section').fadeIn()
    }
}