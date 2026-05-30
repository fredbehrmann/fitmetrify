import { describe, expect, it } from "vitest";

import {
  isValidEmail,
  normalizeEmail,
  validateEmail,
} from "@/lib/newsletter/validate-email";

describe("validate-email", () => {
  it("normalizes email with trim and lowercase", () => {
    expect(normalizeEmail("  User@Example.COM  ")).toBe("user@example.com");
  });

  it("accepts valid emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("name+tag@domain.co.uk")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(isValidEmail("invalid")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
  });

  it("validateEmail returns normalized email or null", () => {
    expect(validateEmail("  User@Example.COM  ")).toBe("user@example.com");
    expect(validateEmail("invalid")).toBeNull();
    expect(validateEmail("")).toBeNull();
    expect(validateEmail(null)).toBeNull();
  });
});
