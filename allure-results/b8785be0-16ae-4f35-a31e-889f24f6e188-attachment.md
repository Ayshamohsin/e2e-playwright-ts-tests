# Test info

- Name: Place Order : Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:10:5

# Error details

```
Error: locator.check: Target page, context or browser has been closed
Call log:
  - waiting for locator('//input[@id=\'id_gender2\']')

    at SignUp.registerUser (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\signUP.ts:70:22)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:49:6
```

# Test source

```ts
   1 | import { Page, Locator } from '@playwright/test';
   2 | import { faker } from '@faker-js/faker';
   3 |
   4 | export class SignUp {
   5 |   page: Page;
   6 |   name: Locator;
   7 |   emailAddress: Locator;
   8 |   signUpButton: Locator;
   9 |   title: Locator;
  10 |   password: Locator;
  11 |   dayDropdown: Locator;
  12 |   monthDropdown: Locator;
  13 |   yearDropdown: Locator;
  14 |   signUpForNewsletter: Locator;
  15 |   receiveSpecialOffer: Locator;
  16 |   firstName: Locator;
  17 |   lastName: Locator;
  18 |   company: Locator;
  19 |   address: Locator;
  20 |   addressField: Locator;
  21 |   countryDropDown: Locator;
  22 |   state: Locator;
  23 |   city: Locator;
  24 |   zipCode: Locator;
  25 |   mobileNumber: Locator;
  26 |   createAccountButton: Locator;
  27 |
  28 |   constructor(page: Page) {
  29 |     this.page = page;
  30 |     this.name = page.getByPlaceholder('Name');
  31 |     this.emailAddress = page.getByPlaceholder('Email Address').nth(2);
  32 |     this.signUpButton = page.getByRole('button', { name: 'Signup' });
  33 |     this.title = page.locator("//input[@id='id_gender2']");
  34 |     this.password = page.locator("#password");
  35 |     this.dayDropdown = page.locator("#days");
  36 |     this.monthDropdown = page.locator("#months");
  37 |     this.yearDropdown = page.locator("#years");
  38 |     this.signUpForNewsletter = page.locator("#newsletter");
  39 |     this.receiveSpecialOffer = page.locator("#optin");
  40 |     this.firstName = page.locator("#first_name");
  41 |     this.lastName = page.locator("#last_name");
  42 |     this.company = page.locator("#company");
  43 |     this.address = page.locator("#address1");
  44 |     this.addressField = page.locator("#address2");
  45 |     this.countryDropDown = page.locator("#country");
  46 |     this.state = page.locator("#state");
  47 |     this.city = page.locator("#city");
  48 |     this.zipCode = page.locator("#zipcode");
  49 |     this.mobileNumber = page.locator("#mobile_number");
  50 |     this.createAccountButton = page.locator(".btn.btn-default").first();
  51 |   }
  52 |
  53 |   async registerUser(day: string, month: string, year: string, country: string) {
  54 |     const randomName = faker.person.fullName();
  55 |     const randomEmailAddress = faker.internet.email();
  56 |     const randomPassword = faker.internet.password();
  57 |     const randomFirstName = faker.person.firstName();
  58 |     const randomLastName = faker.person.lastName();
  59 |     const randomCompanyName = faker.company.name();
  60 |     const randomAddress = faker.location.streetAddress();
  61 |     const randomAddressField = faker.location.streetAddress();
  62 |     const randomState = faker.location.state();
  63 |     const randomCity = faker.location.city();
  64 |     const randomZipCode = faker.location.zipCode();
  65 |     const randomMobileNumber = faker.phone.number();
  66 |
  67 |     await this.name.fill(randomName);
  68 |     await this.emailAddress.fill(randomEmailAddress);
  69 |     await this.signUpButton.click();
> 70 |     await this.title.check();
     |                      ^ Error: locator.check: Target page, context or browser has been closed
  71 |     await this.password.fill(randomPassword);
  72 |     await this.selectDateOfBirth(day, month, year);
  73 |     await this.signUpForNewsletter.check();
  74 |     await this.receiveSpecialOffer.check();
  75 |     await this.firstName.fill(randomFirstName);
  76 |     await this.lastName.fill(randomLastName);
  77 |     await this.company.fill(randomCompanyName);
  78 |     await this.address.fill(randomAddress);
  79 |     await this.addressField.fill(randomAddressField);
  80 |     await this.countryDropDown.click();
  81 |     await this.selectCountry(country);
  82 |     await this.state.fill(randomState);
  83 |     await this.city.fill(randomCity);
  84 |     await this.zipCode.fill(randomZipCode);
  85 |     await this.mobileNumber.fill(randomMobileNumber);
  86 |     await this.createAccountButton.click();
  87 |   }
  88 |
  89 |   async selectDateOfBirth(day: string, month: string, year: string) {
  90 |     await this.dayDropdown.selectOption(day);
  91 |     await this.monthDropdown.selectOption(month);
  92 |     await this.yearDropdown.selectOption(year);
  93 |   }
  94 |
  95 |   async selectCountry(country: string) {
  96 |     await this.countryDropDown.selectOption({ value: country });
  97 |   }
  98 | }
  99 |
```