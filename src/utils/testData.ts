// src/utils/testData.ts

import { faker } from "@faker-js/faker";

// User data model
export interface UserData {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  addressField: string;
  city: string;
  state: string;
  zipCode: string;
  company: string;
  phone: string;
}

// Payment data model
export interface PaymentData {
  cardHolderName: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

// Profile model combining user and payment information
export interface ProfileData {
  user: UserData;
  payment: PaymentData;
}

// Generate random test profile with user and payment details
export function generateTestProfile(): ProfileData {
  const futureDate = faker.date.future();

  return {
    user: {
      name: faker.person.fullName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      address: faker.location.streetAddress(),
      addressField: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      company: faker.company.name(),
      phone: faker.phone.number(),
    },
    payment: {
      cardHolderName: faker.person.fullName(),
      cardNumber: faker.finance.creditCardNumber("visa"),
      cvc: faker.finance.creditCardCVV(),
      expiryMonth: String(futureDate.getMonth() + 1).padStart(2, "0"),
      expiryYear: String(futureDate.getFullYear()),
    },
  };
}
