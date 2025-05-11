# Test info

- Name: Place Order : Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:11:5

# Error details

```
Error: locator.scrollIntoViewIfNeeded: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('form-control')

    at CheckOut.addDescriptionAndPlaceOrder (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\checkOut.ts:108:33)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:95:34
```

# Page snapshot

```yaml
- banner:
  - link "Website for automation practice":
    - /url: /
    - img "Website for automation practice"
  - list:
    - listitem:
      - link " Home":
        - /url: /
    - listitem:
      - link " Products":
        - /url: /products
    - listitem:
      - link " Cart":
        - /url: /view_cart
    - listitem:
      - link " Logout":
        - /url: /logout
    - listitem:
      - link " Delete Account":
        - /url: /delete_account
    - listitem:
      - link " Test Cases":
        - /url: /test_cases
    - listitem:
      - link " API Testing":
        - /url: /api_list
    - listitem:
      - link " Video Tutorials":
        - /url: https://www.youtube.com/c/AutomationExercise
    - listitem:
      - link " Contact us":
        - /url: /contact_us
    - listitem:  Logged in as Erma Haley
- list:
  - listitem:
    - link "Home":
      - /url: /
  - listitem: Checkout
- heading "Address Details" [level=2]
- list:
  - listitem:
    - heading "Your delivery address" [level=3]
  - listitem: Mrs. Britney Orn
  - listitem: Becker - Kuhn
  - listitem: 8433 E South Street
  - listitem: Apt. 360
  - listitem: Samanthafort Minnesota 17854
  - listitem: New Zealand
  - listitem: (401) 516-1291 x700
- list:
  - listitem:
    - heading "Your billing address" [level=3]
  - listitem: Mrs. Britney Orn
  - listitem: Becker - Kuhn
  - listitem: 8433 E South Street
  - listitem: Apt. 360
  - listitem: Samanthafort Minnesota 17854
  - listitem: New Zealand
  - listitem: (401) 516-1291 x700
- heading "Review Your Order" [level=2]
- table:
  - rowgroup:
    - row "Item Description Price Quantity Total":
      - cell "Item"
      - cell "Description"
      - cell "Price"
      - cell "Quantity"
      - cell "Total"
      - cell
  - rowgroup:
    - row "Product Image Stylish Dress Women > Dress Rs. 1500 1 Rs. 1500":
      - cell "Product Image":
        - link "Product Image":
          - /url: ""
          - img "Product Image"
      - cell "Stylish Dress Women > Dress":
        - heading "Stylish Dress" [level=4]:
          - link "Stylish Dress":
            - /url: /product_details/4
        - paragraph: Women > Dress
      - cell "Rs. 1500":
        - paragraph: Rs. 1500
      - cell "1":
        - button "1"
      - cell "Rs. 1500":
        - paragraph: Rs. 1500
    - row "Total Amount Rs. 1500":
      - cell
      - cell
      - cell "Total Amount":
        - heading "Total Amount" [level=4]
      - cell "Rs. 1500":
        - paragraph: Rs. 1500
- text: If you would like to add a comment about your order, please write it in the field below.
- textbox
- link "Place Order":
  - /url: /payment
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
- link "":
  - /url: "#top"
- insertion:
  - iframe
```

# Test source

```ts
   8 | import { Page,Locator } from "playwright";
   9 |
   10 | export class CheckOut{
   11 |   Page : Page;
   12 |   deliveryAddressItems : Locator;
   13 |   billingAddressItems : Locator;
   14 |   totalItemsInOrder : Locator;
   15 |   commentTextArea : Locator;
   16 |   placeOrderButton : Locator;
   17 |
   18 |
   19 |     constructor(Page: Page){
   20 |         this.Page = Page;
   21 |         this.deliveryAddressItems = this.Page.locator('#address_delivery li');
   22 |         this.billingAddressItems = this.Page.locator('#address_invoice li');
   23 |         this.totalItemsInOrder = this.Page.locator('tbody tr');
   24 |         this.commentTextArea = this.Page.locator('form-control');
   25 |         this.placeOrderButton = this.Page.locator('.btn.btn-default.check_out');
   26 |        }
   27 |
   28 |    async verifyDeliveryAddressDetail(){
   29 |       const addressTexts: string[] = [];
   30 |     const addressCount = await this.deliveryAddressItems.count();
   31 |     for(let i =1; i<addressCount; i++){
   32 |      const itemsText = await this.deliveryAddressItems.nth(i).textContent();
   33 |
   34 |     addressTexts.push(itemsText?.trim() || '')
   35 |
   36 |     }
   37 |
   38 |     return addressTexts;
   39 |
   40 |    }
   41 |
   42 |    async verifyBillingAddressDetail(){
   43 |       const addressTexts: string[] = [];
   44 |     const addressCount = await this.billingAddressItems.count();
   45 |     for(let i =1; i<addressCount; i++){
   46 |      const itemsText = await this.billingAddressItems.nth(i).textContent();
   47 |
   48 |     addressTexts.push(itemsText?.trim() || '')
   49 |
   50 |     }
   51 |
   52 |     return addressTexts;
   53 |
   54 |    }
   55 |
   56 | async reviewYourOrder() {
   57 |     const items: OrderItem[] = [];
   58 |     
   59 |     // ✅ Wait for at least 1 row to be attached before continuing
   60 |     await this.totalItemsInOrder.first().waitFor({ timeout: 60000, state: 'attached' });
   61 |
   62 |     const orders = await this.totalItemsInOrder.count();
   63 |
   64 |     for (let i = 0; i < orders; i++) {
   65 |         const row = this.totalItemsInOrder.nth(i);
   66 |
   67 |         await row.scrollIntoViewIfNeeded();
   68 |         
   69 |         // ✅ Step 1: Check if row is visible
   70 |         if (!(await row.isVisible())) {
   71 |             console.warn(`Skipping row ${i} because it is not visible.`);
   72 |             continue; // skip to next row
   73 |         }
   74 |
   75 |         const nameLocator = row.locator('td.cart_description h4 a');
   76 |         
   77 |         // ✅ Step 2: Check if product name link is visible
   78 |         if (!(await nameLocator.isVisible())) {
   79 |             console.warn(`Skipping row ${i} because product name is missing.`);
   80 |             continue;
   81 |         }
   82 |
   83 |         try {
   84 |             // ✅ Step 3: Safe to extract text
   85 |             const name = (await nameLocator.textContent())?.trim() ?? '';
   86 |             const price = (await row.locator('td.cart_price p').textContent())?.trim() ?? '';
   87 |             
   88 |             // ✅ Step 4: Extract quantity as text first
   89 |             const quantityText = (await row.locator('td.cart_quantity button').textContent())?.trim() ?? '0';
   90 |
   91 |             // ✅ Step 5: Convert quantityText to number
   92 |             const quantity = parseInt(quantityText, 10); // Now quantity is a number!
   93 |
   94 |             const total = (await row.locator('td.cart_total p').textContent())?.trim() ?? '';
   95 |
   96 |             // ✅ Step 6: Now quantity is number, matching your updated OrderItem type
   97 |             items.push({ name, price, quantity, total });
   98 |         } catch (error) {
   99 |             console.error(`Error extracting row ${i}:`, error);
  100 |         }
  101 |     }
  102 |
  103 |     return items;
  104 | }
  105 |
  106 | async addDescriptionAndPlaceOrder(){
  107 |    
> 108 |      await this.commentTextArea.scrollIntoViewIfNeeded();
      |                                 ^ Error: locator.scrollIntoViewIfNeeded: Test timeout of 30000ms exceeded.
  109 |      await this.commentTextArea.fill('I ahave revied my delivery address and order detail.');
  110 |     await this.placeOrderButton.click();
  111 | }
  112 |
  113 |
  114 |
  115 | }
  116 |
  117 |
  118 |
  119 |
  120 |
  121 |
```