export class Form 
{


    static isValidName(name){
        const regex = /^[a-zA-Z0-9\s]{3,}$/g
        return regex.test(name)
    }

    static isValidEmail(email){
        const regex = /^(?!.*\.\.)[a-z0-9_.]+@[a-z0-9-]+\.[a-z]{2,6}(?:\.[a-z]{2,})?$/g;
        return regex.test(email)
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