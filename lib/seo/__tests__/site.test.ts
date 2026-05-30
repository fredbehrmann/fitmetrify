import { afterEach, describe, expect, it } from "vitest";

import {
  PRODUCTION_DEFAULT_URL,
  absoluteUrl,
  getSiteUrl,
} from "../site";

describe("site helpers", () => {
  const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  const originalBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    if (originalAppUrl === undefined) {
      delete process.env.NEXT_PUBLIC_APP_URL;
    } else {
      process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
    }
    if (originalBaseUrl === undefined) {
      delete process.env.NEXT_PUBLIC_BASE_URL;
    } else {
      process.env.NEXT_PUBLIC_BASE_URL = originalBaseUrl;
    }
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("prefers NEXT_PUBLIC_BASE_URL over APP_URL", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://base.example.com/";
    process.env.NEXT_PUBLIC_APP_URL = "https://app.example.com";
    expect(getSiteUrl()).toBe("https://base.example.com");
  });

  it("uses NEXT_PUBLIC_APP_URL without trailing slash", () => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
    process.env.NEXT_PUBLIC_APP_URL = "https://fitmetrify.com/";
    expect(getSiteUrl()).toBe("https://fitmetrify.com");
  });

  it("falls back to localhost in development when env is missing", () => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
    delete process.env.NEXT_PUBLIC_APP_URL;
    process.env.NODE_ENV = "development";
    expect(getSiteUrl()).toBe("http://localhost:3001");
  });

  it("falls back to production URL when env is missing in production", () => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
    delete process.env.NEXT_PUBLIC_APP_URL;
    process.env.NODE_ENV = "production";
    expect(getSiteUrl()).toBe(PRODUCTION_DEFAULT_URL);
  });

  it("builds absolute URLs without double slashes", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://fitmetrify.com";
    expect(absoluteUrl("/calculadora-imc")).toBe(
      "https://fitmetrify.com/calculadora-imc"
    );
  });
});
