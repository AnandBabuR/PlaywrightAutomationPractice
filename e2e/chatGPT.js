const { test, expect } = require('@playwright/test');
const testData = require('./testData.json');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = '#email';
        this.passwordInput = '#passwd';
        this.loginButton = '#SubmitLogin';
        this.logoutButton = '.logout';
    }

    async login(email, password) {
        await this.page.goto('http://automationpractice.com/index.php?controller=authentication&back=my-account');
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}

class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.emailCreateInput = '#email_create';
        this.submitCreateButton = '#SubmitCreate';
    }

    async register(email) {
        await this.page.goto('http://automationpractice.com/index.php?controller=authentication&back=my-account');
        await this.page.fill(this.emailCreateInput, email);
        await this.page.click(this.submitCreateButton);
    }
}

class ProductPage {
    constructor(page) {
        this.page = page;
        this.searchBox = '#search_query_top';
        this.searchResults = '.product_list';
    }

    async searchProduct(productName) {
        await this.page.fill(this.searchBox, productName);
        await this.page.press(this.searchBox, 'Enter');
    }
}

class CartPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = 'button[name="Submit"]';
        this.cartPopup = '.layer_cart_product';
        this.cartDeleteButton = '.cart_quantity_delete';
    }

    async addToCart(productUrl) {
        await this.page.goto(productUrl);
        await this.page.click(this.addToCartButton);
    }

    async removeFromCart() {
        await this.page.goto('http://automationpractice.com/index.php?controller=order');
        await this.page.click(this.cartDeleteButton);
    }
}

test('Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.email, testData.password);
    await expect(page.locator('.logout')).toBeVisible();
});

test('User Registration', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.register(testData.newUserEmail);
    await expect(page.locator('#account-creation_form')).toBeVisible();
});

test('Search Product', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.searchProduct(testData.productName);
    await expect(page.locator('.product_list')).toBeVisible();
});

test('Add and Remove from Cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.addToCart(testData.productUrl);
    await expect(page.locator('.layer_cart_product')).toBeVisible();
    await cartPage.removeFromCart();
});

test('Validate Product Details', async ({ page }) => {
    await page.goto(testData.productUrl);
    await expect(page.locator('#product')).toBeVisible();
});

test('Logout Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.email, testData.password);
    await page.click('.logout');
    await expect(page.locator('#SubmitLogin')).toBeVisible();
});

test('Add to Wishlist', async ({ page }) => {
    await page.goto(testData.productUrl);
    await page.click('.wishlist_button');
    await expect(page.locator('.fancybox-error')).not.toBeVisible();
});

test('Validate Order History', async ({ page }) => {
    await page.goto('http://automationpractice.com/index.php?controller=history');
    await expect(page.locator('.order_list')).toBeVisible();
});

test('Apply Coupon Code', async ({ page }) => {
    await page.goto('http://automationpractice.com/index.php?controller=order');
    await page.fill('#discount_name', testData.couponCode);
    await page.click('#submitDiscount');
    await expect(page.locator('.alert-success')).toBeVisible();
});
