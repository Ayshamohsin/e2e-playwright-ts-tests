// src/pages/SignUp.ts

import type { Locator, Page } from "@playwright/test";
import { safeClick, safeFill, waitForVisible } from "../utils/actions";
import type { UserData } from "../utils/testData";

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

  // Fills the signup form and creates a new user account
  async registerUser(
    userData: UserData,
    day: string,
    month: string,
    year: string,
    country: string,
  ) {
    await safeFill(this.name, userData.name);
    await safeFill(this.emailAddress, userData.email);
    await safeClick(this.signUpButton);

    await waitForVisible(this.title);
    await this.title.check();

    await safeFill(this.password, userData.password);
    await this.selectDateOfBirth(day, month, year);

    await waitForVisible(this.signUpForNewsletter);
    await this.signUpForNewsletter.check();
    await waitForVisible(this.receiveSpecialOffer);
    await this.receiveSpecialOffer.check();

    await safeFill(this.firstName, userData.firstName);
    await safeFill(this.lastName, userData.lastName);
    await safeFill(this.company, userData.company);
    await safeFill(this.address, userData.address);
    await safeFill(this.addressField, userData.addressField || "");

    await safeClick(this.countryDropDown);
    await this.selectCountry(country);

    await safeFill(this.state, userData.state);
    await safeFill(this.city, userData.city);
    await safeFill(this.zipCode, userData.zipCode);
    await safeFill(this.mobileNumber, userData.phone);

    await safeClick(this.createAccountButton);
  }

  // Selects the date of birth
  async selectDateOfBirth(day: string, month: string, year: string) {
    await this.dayDropdown.selectOption(day);
    await this.monthDropdown.selectOption(month);
    await this.yearDropdown.selectOption(year);
  }

  // Selects the country from dropdown
  async selectCountry(country: string) {
    await this.countryDropDown.selectOption({ value: country });
  }

  // Verifies that account creation success message is visible

  async verifyAccountCreated() {
    await this.page.waitForLoadState("load"); // or optionally remove if already enough wait
    return this.successMessage;
  }

  // Clicks the continue button after account creation
  async clickContinueButton() {
    await safeClick(this.continueButton);
    await this.page.waitForLoadState("domcontentloaded");
  }
}
