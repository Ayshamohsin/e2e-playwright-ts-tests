//
// src/pages/SignUp.ts

import type { Locator, Page } from "@playwright/test";
import type { UserData } from "../utils/testData"; //  import correct type

export class SignUp {
  page: Page;
  name: Locator;
  emailAddress: Locator;
  signUpButton: Locator;
  title: Locator;
  password: Locator;
  dayDropdown: Locator;
  monthDropdown: Locator;
  yearDropdown: Locator;
  signUpForNewsletter: Locator;
  receiveSpecialOffer: Locator;
  firstName: Locator;
  lastName: Locator;
  company: Locator;
  address: Locator;
  addressField: Locator;
  countryDropDown: Locator;
  state: Locator;
  city: Locator;
  zipCode: Locator;
  mobileNumber: Locator;
  createAccountButton: Locator;
  successMessage: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.getByPlaceholder("Name");
    this.emailAddress = page.getByPlaceholder("Email Address").nth(1);
    this.signUpButton = page.getByRole("button", { name: "Signup" });
    this.title = page.locator("//input[@id='id_gender2']");
    this.password = page.locator("#password");
    this.dayDropdown = page.locator("#days");
    this.monthDropdown = page.locator("#months");
    this.yearDropdown = page.locator("#years");
    this.signUpForNewsletter = page.locator("#newsletter");
    this.receiveSpecialOffer = page.locator("#optin");
    this.firstName = page.locator("#first_name");
    this.lastName = page.locator("#last_name");
    this.company = page.locator("#company");
    this.address = page.locator("#address1");
    this.addressField = page.locator("#address2");
    this.countryDropDown = page.locator("#country");
    this.state = page.locator("#state");
    this.city = page.locator("#city");
    this.zipCode = page.locator("#zipcode");
    this.mobileNumber = page.locator("#mobile_number");
    this.createAccountButton = page.locator(".btn.btn-default").first();
    this.successMessage = page.getByText(
      "Congratulations! Your new account has been successfully created!",
    );
    this.continueButton = page.locator(".btn.btn-primary");
  }

  async registerUser(
    userData: UserData,
    day: string,
    month: string,
    year: string,
    country: string,
  ) {
    await this.name.fill(userData.name);
    await this.emailAddress.fill(userData.email);
    await this.signUpButton.click();
    await this.title.check();
    await this.password.fill(userData.password);
    await this.selectDateOfBirth(day, month, year);
    await this.signUpForNewsletter.check();
    await this.receiveSpecialOffer.check();
    await this.firstName.fill(userData.firstName);
    await this.lastName.fill(userData.lastName);
    await this.company.fill(userData.company);
    await this.address.fill(userData.address);
    await this.addressField.fill(userData.addressField || "");
    await this.countryDropDown.click();
    await this.selectCountry(country);
    await this.state.fill(userData.state);
    await this.city.fill(userData.city);
    await this.zipCode.fill(userData.zipCode);
    await this.mobileNumber.fill(userData.phone);
    await this.createAccountButton.click();
  }

  async selectDateOfBirth(day: string, month: string, year: string) {
    await this.dayDropdown.selectOption(day);
    await this.monthDropdown.selectOption(month);
    await this.yearDropdown.selectOption(year);
  }

  async selectCountry(country: string) {
    await this.countryDropDown.selectOption({ value: country });
  }

  async verifyAccountCreated() {
    await this.page.waitForLoadState("networkidle");
    return this.successMessage;
  }

  async clickContinueButton() {
    await this.continueButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
