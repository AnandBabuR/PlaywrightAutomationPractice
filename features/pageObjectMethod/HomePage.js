const {expect} = require('@playwright/test');
class HomePage{

    constructor(page){
        this.page = page;
        this.baseURL = process.env.BASE_URL;
        this.signIn = ".login";
    }

    async gotoURL(){
       await  this.page.goto(this.baseURL);
    }

    async clickSignIn(){
        await this.page.click(this.signIn) 
    }
}

module.exports = {HomePage};