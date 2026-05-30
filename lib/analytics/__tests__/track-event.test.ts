import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { captureMock } = vi.hoisted(() => ({
  captureMock: vi.fn(),
}));

vi.mock("@/lib/posthog", () => ({
  isPostHogReady: vi.fn(() => true),
  posthog: {
    capture: captureMock,
  },
}));

import { isPostHogReady } from "@/lib/posthog";
import { trackEvent } from "@/lib/analytics";

describe("trackEvent", () => {
  const gtagMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("window", {
      gtag: gtagMock,
    });
    vi.mocked(isPostHogReady).mockReturnValue(true);
    captureMock.mockClear();
    gtagMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends events to GA4 and PostHog", () => {
    trackEvent("calc_completed", { calc_slug: "calculadora-imc" });

    expect(gtagMock).toHaveBeenCalledWith("event", "calc_completed", {
      calc_slug: "calculadora-imc",
    });
    expect(captureMock).toHaveBeenCalledWith("calc_completed", {
      calc_slug: "calculadora-imc",
    });
  });

  it("skips GA4 when gtag is unavailable", () => {
    vi.stubGlobal("window", {});

    trackEvent("calc_started", { calc_slug: "calculadora-tmb" });

    expect(captureMock).toHaveBeenCalledWith("calc_started", {
      calc_slug: "calculadora-tmb",
    });
  });

  it("skips PostHog when not initialized", () => {
    vi.mocked(isPostHogReady).mockReturnValue(false);

    trackEvent("search_used", { search_query: "imc" });

    expect(gtagMock).toHaveBeenCalledWith("event", "search_used", {
      search_query: "imc",
    });
    expect(captureMock).not.toHaveBeenCalled();
  });
});
