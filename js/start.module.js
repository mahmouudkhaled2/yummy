import { Ui } from "./ui.module.js"
import { Search } from "./search.module.js"
import { Categories } from "./categories.module.js"
import { Area } from "./area.module.js"
import { Ingriedients } from "./ingredients.module.js"
import { Form } from "./form.module.js"
import { Assistant } from "./assist.js"

export class Start {
    constructor () {
        this.ui = new Ui()
        this.search = new Search()
        this.categories = new Categories()
        this.area = new Area()
        this.ingriedients = new Ingriedients()
        this.form = new Form()
        this.api = new Assistant()
        this.row = document.querySelector('.home .row')
        this.url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        this.api.fetchMain(this.url, this.row)
    }
}