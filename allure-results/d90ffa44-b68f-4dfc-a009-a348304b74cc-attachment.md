# Test info

- Name: Place Order : Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:7:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://automationexercise.com/", waiting until "load"

    at HomePage.navigate (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\homePage.ts:18:21)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:9:28
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
   8 |
   9 |
  10 |     constructor(page : Page){
  11 |         this.page = page;
  12 |         this.logo = this.page.locator('.logo.pull-left');
  13 |         this.navBar = this.page.locator('.nav.navbar-nav')
  14 |         this.footer = this.page.locator('#footer').first();
  15 |     }
  16 |
  17 |    async navigate(){
> 18 |     await this.page.goto('https://automationexercise.com/');
     |                     ^ Error: page.goto: Target page, context or browser has been closed
  19 |    }
  20 |
  21 |
  22 |     async getLogoVisibility(){
  23 |       return  await this.logo.isVisible();
  24 |     }
  25 |
  26 |
  27 |     async getNavBarLinksNames(){
  28 |        return  await this.navBar.allTextContents();
  29 |          
  30 |    }
  31 |
  32 |    async getFooterVisibility(){
  33 |     return await this.footer.isVisible();
  34 |    }
  35 |
  36 |
  37 | }
```