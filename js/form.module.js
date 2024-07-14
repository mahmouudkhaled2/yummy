export class Form 
{
    static isValidName(name){
        const regex = /^[a-zA-Z0-9\s]{3,}$/g
        // this.alertInfo(regex, name, '#nameAlert')
        $('#nameAlert').addClass('d-none')

        if(regex.test(name)) {
            $('#nameAlert').addClass('d-none')
            return true
        }
        else if (name === ''){
            $('#nameAlert').addClass('d-none')
            return false
        }
        else {
            $('#nameAlert').removeClass('d-none')
            return false
        }
    }

    static isValidEmail(email){
        const regex = /^(?!.*\.\.)[a-z0-9_.]+@[a-z0-9-]+\.[a-z]{2,6}(?:\.[a-z]{2,})?$/g;
        if(regex.test(email)) {
            $('#emailAlert').addClass('d-none')
            return true
        }
        else if (email === ''){
            $('#emailAlert').addClass('d-none')
            return false
        }
        else {
            $('#emailAlert').removeClass('d-none')
            return false
        }
    }

    static isValidPhone(phone){
        const regex = /^\+?[0-9]{8,16}$/g;
        return regex.test(phone)
    }

    static isValidAge(age){
        if (age > 10) {
            return true
        }
    }

    static isValidPassword(password){
        const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/g;
        return regex.test(password)
    }

}