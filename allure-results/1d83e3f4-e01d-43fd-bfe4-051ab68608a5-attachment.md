# Test info

- Name: Place Order: Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:11:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://automationexercise.com/", waiting until "load"

    at HomePage.navigate (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\homePage.ts:24:21)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:20:24
```

# Test source

```ts
   1 | import { Page,Locator } from "playwright";
   2 |
   3 | export class HomePage {
   4 |     page :Page;
   5 |     logo : Locator;
   6 |     navBar : Locator
   7 |     footer : Locator;
   8 |     product : Locator;
   9 |     continueShopping : Locator;
  10 |     cartButton : Locator;
  11 |
  12 |
  13 |     constructor(page : Page){
  14 |         this.page = page;
  15 |         this.logo = this.page.locator('.logo.pull-left');
  16 |         this.navBar = this.page.locator('.nav.navbar-nav')
  17 |         this.footer = this.page.locator('#footer').first();
  18 |         this.product = this.page.locator('.product-image-wrapper');
  19 |         this.continueShopping = this.page.locator('.btn.btn-success.close-modal.btn-block');
  20 |         this.cartButton = this.page.locator('a[href="/view_cart"]').first();
  21 |     }
  22 |
  23 |    async navigate(){
> 24 |     await this.page.goto('https://automationexercise.com/');
     |                     ^ Error: page.goto: Target page, context or browser has been closed
  25 |    }
  26 |
  27 |
  28 |     async getLogoVisibility(){
  29 |       return  await this.logo.isVisible();
  30 |     }
  31 |
  32 |
  33 |     async getNavBarLinksNames(){
  34 |     return await this.navBar.isVisible();
  35 |          
  36 |    }
  37 |
  38 |    async getFooterVisibility(){
  39 |     return await this.footer.isVisible();
  40 |    }
  41 |
  42 |
  43 |    // Add product to the cart
  44 |    async addProducts(){
  45 |     //const addedItems : string[]= [];
  46 |     const addedItems : {name:string; price:string ; quantity:number; }[]= [];
  47 |     const targetProductName = 'Stylish Dress';
  48 |     const productCount = await this.product.count();
  49 |         for (let i = 0; i < productCount; i++){
  50 |
  51 |
  52 | const productItem = this.product.nth(i);  
  53 | await productItem.scrollIntoViewIfNeeded(); 
  54 |
  55 |             const itemName = await productItem.locator('div.productinfo p').textContent();
  56 |             const itemPrice = await productItem.locator('div.productinfo h2').textContent();
  57 |             const quantity = 1;
  58 |
  59 |             if(itemName?.trim()===targetProductName){
  60 |                 await productItem.locator('text=Add to cart').first().click();
  61 |                 console.log(`Click add to cart for: ${targetProductName}`);
  62 |                 await this.continueShopping.click();
  63 |                 // Store the added product name
  64 |
  65 |                 addedItems.push({name:itemName.trim()||'', price:itemPrice?.trim()||'',quantity:quantity});
  66 |
  67 |                 break;
  68 |
  69 |             }
  70 |        
  71 |     }
  72 |     return addedItems;
  73 | }
  74 |
  75 |             //Go to cart page
  76 |
  77 |             async goToCartPage(){
  78 |                 await this.cartButton.click();
  79 |                 
  80 |             }
  81 |
  82 |         }
  83 |     
  84 |
  85 |    
  86 |
  87 |
  88 |
```