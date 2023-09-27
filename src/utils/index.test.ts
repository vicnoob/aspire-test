// Import the function to be tested
import {
  formatNumber,
  generateExpiryDate,
  generateCreditCardNumber,
  generateCvv,
} from './';
import { describe, it, expect } from 'vitest';

describe('formatNumber', () => {
  it('returns correct number format', () => {
    expect(formatNumber(100)).toBe('100');
    expect(formatNumber(100.02)).toBe('100.02');
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(9999)).toBe('9,999');
    expect(formatNumber(10000)).toBe('10,000');
    expect(formatNumber(-1)).toBe('-1');
    expect(formatNumber(-1000)).toBe('-1,000');
    expect(formatNumber(100000)).toBe('100,000');
    expect(formatNumber(1000000)).toBe('1,000,000');
  });
});

describe('generateExpiryDate', () => {
  it('returns correct expiry date', () => {
    // shoudl be pattern '12/34'
    expect(generateExpiryDate().length).toBe(5);
    const expiryDate = generateExpiryDate();
    const regex = /^(0[1-9]|1[0-2])\/(24|25|26|27)$/;

    expect(expiryDate).toMatch(regex);
  });

  it('should generate a different expiry date each time', () => {
    const expiryDate1 = generateExpiryDate();
    const expiryDate2 = generateExpiryDate();

    expect(expiryDate1).not.toBe(expiryDate2);
  });
});

describe('generateCreditCardNumber', () => {
  it('should generate a valid credit card number with 4 segments', () => {
    const creditCardNumber = generateCreditCardNumber();

    // Validate that the generated string contains 4 segments separated by spaces
    const segments = creditCardNumber.split(' ');
    expect(segments).toHaveLength(4);

    // Validate that each segment is a 4-digit number
    segments.forEach((segment) => {
      expect(segment).toMatch(/^\d{4}$/);
    });
  });

  it('should generate a different credit card number each time', () => {
    const creditCardNumber1 = generateCreditCardNumber();
    const creditCardNumber2 = generateCreditCardNumber();

    expect(creditCardNumber1).not.toBe(creditCardNumber2);
  });
});

describe('generateCvv', () => {
  it('should generate a valid CVV with 3 digits', () => {
    const cvv = generateCvv();

    // Validate that the generated string is a 3-digit number
    expect(cvv).toMatch(/^\d{3}$/);
  });

  it('should generate a different CVV each time', () => {
    const cvv1 = generateCvv();
    const cvv2 = generateCvv();

    expect(cvv1).not.toBe(cvv2);
  });
});
