import { afterEach, describe, expect, it } from "vitest";

import { absoluteUrl, getSiteUrl } from "../site";

describe("site helpers", () => {
  const original = process.env.NEXT_PUBLIC_APP_URL;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_APP_URL;
    } else {
      process.env.NEXT_PUBLIC_APP_URL = original;
    }
  });

  it("uses NEXT_PUBLIC_APP_URL without trailing slash", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://fitmetrify.com/";
    expect(getSiteUrl()).toBe("https://fitmetrify.com");
  });

  it("falls back to localhost when env is missing", () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    expect(getSiteUrl()).toBe("http://localhost:3001");
  });

  it("builds absolute URLs without double slashes", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://fitmetrify.com";
    expect(absoluteUrl("/calculadora-imc")).toBe(
      "https://fitmetrify.com/calculadora-imc"
    );
  });
});
