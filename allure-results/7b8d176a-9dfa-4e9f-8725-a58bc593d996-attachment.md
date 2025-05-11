# Test info

- Name:  Place Order: Register while Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:23:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://automationexercise.com/", waiting until "load"

    at HomePage.navigate (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\homePage.ts:30:25)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:34:24
```

# Test source

```ts
   1 | import { Page, Locator } from '@playwright/test';
   2 | import { getEnv, isEnvironmentReachable } from '../utils/environments';
   3 |
   4 |  // Added import to get environment settings
   5 |
   6 | export class HomePage {
   7 |     page :Page;
   8 |     logo : Locator;
   9 |     navBar : Locator
   10 |     footer : Locator;
   11 |     loginButton : Locator;
   12 |     product : Locator;
   13 |     continueShopping : Locator;
   14 |     cartButton : Locator;
   15 |
   16 |
   17 |     constructor(page : Page){
   18 |         this.page = page;
   19 |         this.logo = this.page.locator('.logo.pull-left');
   20 |         this.navBar = this.page.locator('.nav.navbar-nav')
   21 |         this.footer = this.page.locator('#footer').first();
   22 |         this.loginButton = this.page.locator('.fa.fa-lock');
   23 |         this.product = this.page.locator('.product-image-wrapper');
   24 |         this.continueShopping = this.page.locator('.btn.btn-success.close-modal.btn-block');
   25 |         this.cartButton = this.page.locator('a[href="/view_cart"]').first();
   26 |     }
   27 |
   28 |    async navigate(){
   29 |     const env = getEnv(); // default 'dev' unless specified otherwise
>  30 |         await this.page.goto(env.baseUrl);
      |                         ^ Error: page.goto: Target page, context or browser has been closed
   31 |         // Why: Fetches correct URL based on selected environment (dev/test). Avoids hardcoding, satisfies exercise constraint of dynamic environments.
   32 |     
   33 |    }
   34 |
   35 |    async isHomePageVisible() {
   36 |     const logoVisible = await this.logo.isVisible();
   37 |     const navBarVisible = await this.navBar.isVisible();
   38 |     const footerVisible = await this.footer.isVisible();
   39 |
   40 |     return logoVisible && navBarVisible && footerVisible;
   41 |   }
   42 |
   43 |
   44 |  // go to login page
   45 |  async navigateToLoginPage(){
   46 |     await this.loginButton.waitFor({state:'visible', timeout: 5000});
   47 |     await this.loginButton.click();
   48 |
   49 |
   50 |  }
   51 |  
   52 |    // Add product to the cart
   53 |    async addProducts(){
   54 |     //const addedItems : string[]= [];
   55 |     const addedItems : {name:string; price:string ; quantity:number; }[]= [];
   56 |     const targetProductName = 'Stylish Dress';
   57 |     const productCount = await this.product.count();
   58 |         for (let i = 0; i < productCount; i++){
   59 |
   60 |
   61 | const productItem = this.product.nth(i);  
   62 | await productItem.scrollIntoViewIfNeeded(); 
   63 |
   64 |             const itemName = await productItem.locator('div.productinfo p').textContent();
   65 |             const itemPrice = await productItem.locator('div.productinfo h2').textContent();
   66 |             const quantity = 1;
   67 |
   68 |             if(itemName?.trim()===targetProductName){
   69 |                 await productItem.locator('text=Add to cart').first().click();
   70 |                 console.log(`Click add to cart for: ${targetProductName}`);
   71 |                 await this.continueShopping.click();
   72 |                 // Store the added product name
   73 |
   74 |                 addedItems.push({name:itemName.trim()||'', price:itemPrice?.trim()||'',quantity:quantity});
   75 |
   76 |                 break;
   77 |
   78 |             }
   79 |        
   80 |     }
   81 |     return addedItems;
   82 | }
   83 |
   84 |
   85 |
   86 |
   87 |             //Go to cart page
   88 |
   89 |             async goToCartPage(){
   90 |                 await this.cartButton.click();
   91 |                 
   92 |             }
   93 |
   94 |         }
   95 |     
   96 |
   97 |    
   98 |
   99 |
  100 |
```