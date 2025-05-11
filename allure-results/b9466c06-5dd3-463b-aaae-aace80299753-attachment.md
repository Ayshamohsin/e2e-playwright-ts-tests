# Test info

- Name: Place Order : Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:10:5

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for getByPlaceholder('Email Address').nth(3)

    at SignUp.fillSignUpFormAndSubmit (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\signUP.ts:25:33)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:45:6
```

# Test source

```ts
   1 | import {Page , Locator} from '@playwright/test'
   2 | import { faker, Faker, th } from '@faker-js/faker'
   3 |
   4 | export class SignUp{
   5 |
   6 |     page:Page;
   7 |     name:Locator;
   8 |     emailAddress : Locator;
   9 |     signUpButton : Locator;
  10 |
  11 |     constructor(page:Page){
  12 |         this.page = page;
  13 |         this.name = this.page.getByPlaceholder('Name');
  14 |         this.emailAddress = this.page.getByPlaceholder('Email Address').nth(3);
  15 |         this.signUpButton = this.page.getByRole('button' , {name :'Signup'});
  16 |
  17 |     }
  18 |
  19 |     async fillSignUpFormAndSubmit(){
  20 |
  21 |         const randomName = faker.person.fullName();
  22 |         const randomEmailAddress = faker.internet.email();
  23 |
  24 |         await this.name.fill(randomName);
> 25 |         await this.emailAddress.fill(randomEmailAddress);
     |                                 ^ Error: locator.fill: Target page, context or browser has been closed
  26 |         await this.signUpButton.click();
  27 |         
  28 |     }
  29 | }
```