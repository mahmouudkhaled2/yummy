import { Ui } from './ui.module.js';

export class Assistant
{
    constructor(){
        this.ui = new Ui()
    }

    // Get data of main sections
    async fetchMain(url, row, subRow , subURL) {
        this.showLoader()

        const api = await fetch(url)
        const response = await api.json()

        if (response.meals && response.meals.length > 20 
            && row != document.querySelector('.home .row')) {
            response.meals.length = 20;
        }
        
        this.ui.displayMeals(response, row)

        this.runSubMeals(subURL , '.category', row , subRow)
        this.runDetails('.item')

        this.hideLoader()
    }

    // Get data inside categories or area or ingredients (Sub Data)
    async fetchSub(subURL, subRow) {
      this.showLoader()
        
        const api = await fetch(subURL)
        const response = await api.json()

        if(response.meals.length > 20){
            response.meals.length = 20
        }

        this.ui.displaySubMeals(response, subRow)

        this.runDetails('.item')

        this.hideLoader()
    }


    // Get details of every single meal
    async fetchDetails(id) {
        $('.loading').removeClass('d-none')
        $('body').addClass('overflow-hidden')

        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        const api = await fetch(url)
        const response = await api.json()

        this.ui.displayDetails(response, this.row,)

        $('.loading').addClass('d-none')
        $('body').removeClass('overflow-hidden')
    }


    // when click on a meal (item) display it details
    runDetails(items) {
        if(items) {
            document.querySelectorAll(items).forEach(item => {
            item.addEventListener('click', () => {
                $('.details').removeClass('d-none')
                $('.details').siblings().addClass('d-none')
                this.fetchDetails(item.dataset.id)
            })
        })
        }
    }

    // when click on any item inside the main section it will get & display data inside it
    runSubMeals(subURL ,items, row, subRow) {
        if (items, subRow) {
            document.querySelectorAll(items).forEach(item => {
                item.addEventListener('click', () => {
                    row.classList.add('d-none')
                    subRow.classList.remove('d-none')
                    this.fetchSub(subURL + `${item.dataset.custom}`, subRow, '.item')
                    this.runDetails('.item')
                    console.log(subURL + `${item.dataset.custom}`)
                })
            })
            }
    }

    // Show Loader while data is loading
    showLoader() {
        $(".loading").removeClass("d-none");
        $("body").addClass("overflow-hidden");    
    }

    // Hide Loader when data is completely loaded 
    hideLoader() {
        $(".loading").addClass("d-none");
        $("body").removeClass("overflow-hidden");    
    }

    // it will display the target section when you click on it from the navigation sidebar 
    openSection(id, mainSection, SubSection, apiMainURL,apiSubURL ) {
        document.querySelector(id).addEventListener('click', () => {
            mainSection.classList.remove('d-none');
            SubSection.classList.add('d-none');
            if(apiMainURL || apiSubURL) {
                this.fetchMain(apiMainURL, mainSection, SubSection, apiSubURL)
            }
        })
    }
}













        // let mealsCheck = typeof response.meals == [] && response.meals.length > 20 && row != document.querySelector('.home .row');

        // let catCheck = typeof response.categories == [] && response.categories.length > 20 && row != document.querySelector('.home .row');