import { describe, expect, it } from "vitest";

import { getCalculatorEngine } from "../index";

describe("calculator engines", () => {
  it("returns undefined for invalid slug", () => {
    expect(getCalculatorEngine("invalido")).toBeUndefined();
  });

  it("returns proteina engine for calculadora-proteina", () => {
    const engine = getCalculatorEngine("calculadora-proteina");
    expect(engine).toBeDefined();
    expect(engine?.calculateSimple).toBeDefined();
    expect(engine?.calculateAdvanced).toBeDefined();
  });

  it("returns deficit calorico engine for calculadora-deficit-calorico", () => {
    expect(getCalculatorEngine("calculadora-deficit-calorico")).toBeDefined();
  });

  it("returns macros engine for calculadora-macros", () => {
    const engine = getCalculatorEngine("calculadora-macros");
    expect(engine).toBeDefined();
    expect(engine?.calculateSimple).toBeDefined();
    expect(engine?.calculateAdvanced).toBeDefined();
  });

  it("returns agua engine for calculadora-agua", () => {
    const engine = getCalculatorEngine("calculadora-agua");
    expect(engine).toBeDefined();
    expect(engine?.calculateSimple).toBeDefined();
    expect(engine?.calculateAdvanced).toBeDefined();
  });

  it("returns pace engine for calculadora-pace", () => {
    expect(getCalculatorEngine("calculadora-pace")).toBeDefined();
  });

  it("returns pace velocidade engine for calculadora-pace-velocidade", () => {
    expect(getCalculatorEngine("calculadora-pace-velocidade")).toBeDefined();
  });

  it("returns previsor tempo engine for calculadora-previsor-tempo", () => {
    const engine = getCalculatorEngine("calculadora-previsor-tempo");
    expect(engine).toBeDefined();
    expect(engine?.calculateSimple).toBeDefined();
    expect(engine?.calculateAdvanced).toBeDefined();
  });

  it("returns one rep max engine for calculadora-1rm", () => {
    const engine = getCalculatorEngine("calculadora-1rm");
    expect(engine).toBeDefined();
    expect(engine?.calculateSimple).toBeDefined();
    expect(engine?.calculateAdvanced).toBeDefined();
  });

  it("returns volume treino engine for calculadora-volume-treino", () => {
    expect(getCalculatorEngine("calculadora-volume-treino")).toBeDefined();
  });

  it("returns zonas carga engine for calculadora-zonas-carga", () => {
    expect(getCalculatorEngine("calculadora-zonas-carga")).toBeDefined();
  });

  it("returns peso ideal engine for calculadora-peso-ideal", () => {
    const engine = getCalculatorEngine("calculadora-peso-ideal");
    expect(engine).toBeDefined();
    expect(engine?.calculateSimple).toBeDefined();
    expect(engine?.calculateAdvanced).toBeDefined();
  });

  it("returns calorias refeicao engine for calculadora-calorias-refeicao", () => {
    const engine = getCalculatorEngine("calculadora-calorias-refeicao");
    expect(engine).toBeDefined();
    expect(engine?.calculateSimple).toBeDefined();
    expect(engine?.calculateAdvanced).toBeDefined();
  });

  it("returns percentual gordura engine for calculadora-percentual-gordura", () => {
    const engine = getCalculatorEngine("calculadora-percentual-gordura");
    expect(engine).toBeDefined();
    expect(engine?.calculateSimple).toBeDefined();
    expect(engine?.calculateAdvanced).toBeDefined();
  });

  it("returns fc maxima engine for calculadora-fc-maxima", () => {
    const engine = getCalculatorEngine("calculadora-fc-maxima");
    expect(engine).toBeDefined();
    expect(engine?.calculateSimple).toBeDefined();
    expect(engine?.calculateAdvanced).toBeDefined();
  });
});
