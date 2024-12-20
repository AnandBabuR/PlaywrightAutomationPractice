const { Before, After, BeforeAll, AfterStep, Status, AfterAll, setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000 * 2)
const playwright =  require("@playwright/test");
var browser;

BeforeAll( async function() {
    browser = await playwright.chromium.launch({
        headless: false
      });
});

Before( async function() {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

AfterStep(async function({result}){
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: 'screenshot1.png'});
    }
});

AfterAll( async function (){
    console.log('Final step')
    await browser.close();
});