# Test info

- Name: Place Order : Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:7:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('.btn.btn-success.close-modal.btn-block')
    - locator resolved to <button data-dismiss="modal" class="btn btn-success close-modal btn-block">Continue Shopping</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    35 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

    at HomePage.addProducts (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\homePage.ts:65:41)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:22:6
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
  10 |
  11 |
  12 |     constructor(page : Page){
  13 |         this.page = page;
  14 |         this.logo = this.page.locator('.logo.pull-left');
  15 |         this.navBar = this.page.locator('.nav.navbar-nav')
  16 |         this.footer = this.page.locator('#footer').first();
  17 |         this.product = this.page.locator('.product-image-wrapper');
  18 |         this.continueShopping = this.page.locator('.btn.btn-success.close-modal.btn-block');
  19 |     }
  20 |
  21 |    async navigate(){
  22 |     await this.page.goto('https://automationexercise.com/');
  23 |    }
  24 |
  25 |
  26 |     async getLogoVisibility(){
  27 |       return  await this.logo.isVisible();
  28 |     }
  29 |
  30 |
  31 |     async getNavBarLinksNames(){
  32 |     return await this.navBar.isVisible();
  33 |          
  34 |    }
  35 |
  36 |    async getFooterVisibility(){
  37 |     return await this.footer.isVisible();
  38 |    }
  39 |
  40 |
  41 |    // Add product to the cart
  42 |    async addProducts(){
  43 |     const targetProductName = 'Stylish Dress';
  44 |     const productCount = await this.product.count();
  45 |         for (let i = 0; i < productCount; i++){
  46 |
  47 |
  48 | const product1 = this.product.nth(i);  
  49 | await product1.scrollIntoViewIfNeeded(); 
  50 |
  51 |             const name = await product1.locator('div.productinfo p').textContent();
  52 |            
  53 |
  54 |             console.log("Product name is" , name)
  55 |            
  56 |             
  57 |
  58 |             if(name?.trim()===targetProductName){
  59 |                 await product1.locator('text=Add to cart').first().click();
  60 |                 console.log(`Click add to cart for: ${targetProductName}`);
  61 |                 break;
  62 |
  63 |             }
  64 |
> 65 |             await this.continueShopping.click();
     |                                         ^ Error: locator.click: Target page, context or browser has been closed
  66 |
  67 |    
  68 |
  69 |        
  70 |     }
  71 | }
  72 |
  73 |
  74 |         }
  75 |     
  76 |
  77 |    
  78 |
  79 |
  80 |
```