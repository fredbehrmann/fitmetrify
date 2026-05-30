import type { CalculatorEngine } from "./types";
import { aguaEngine } from "./agua-engine";
import { paceEngine } from "./pace-engine";
import { paceVelocidadeEngine } from "./pace-velocidade-engine";
import { previsorTempoEngine } from "./previsor-tempo-engine";
import { oneRepMaxEngine } from "./one-rep-max-engine";
import { volumeTreinoEngine } from "./volume-treino-engine";
import { zonasCargaEngine } from "./zonas-carga-engine";
import { imcEngine } from "./imc-engine";
import { deficitCaloricoEngine } from "./deficit-calorico-engine";
import { macrosEngine } from "./macros-engine";
import { proteinaEngine } from "./proteina-engine";
import { gastoCaloricoEngine } from "./gasto-calorico-engine";
import { tmbEngine } from "./tmb-engine";
import { pesoIdealEngine } from "./peso-ideal-engine";
import { caloriasRefeicaoEngine } from "./calorias-refeicao-engine";
import { fcMaximaEngine } from "./fc-maxima-engine";
import { percentualGorduraEngine } from "./percentual-gordura-engine";

const engines: Record<string, CalculatorEngine> = {};

export function getCalculatorEngine(slug: string): CalculatorEngine | undefined {
  return engines[slug];
}

export function isCalculatorEngineReady(slug: string): boolean {
  return getCalculatorEngine(slug) !== undefined;
}

export function registerCalculatorEngine(
  slug: string,
  engine: CalculatorEngine
): void {
  engines[slug] = engine;
}

registerCalculatorEngine("calculadora-imc", imcEngine);
registerCalculatorEngine("calculadora-tmb", tmbEngine);
registerCalculatorEngine("calculadora-gasto-calorico", gastoCaloricoEngine);
registerCalculatorEngine("calculadora-deficit-calorico", deficitCaloricoEngine);
registerCalculatorEngine("calculadora-proteina", proteinaEngine);
registerCalculatorEngine("calculadora-macros", macrosEngine);
registerCalculatorEngine("calculadora-agua", aguaEngine);
registerCalculatorEngine("calculadora-pace", paceEngine);
registerCalculatorEngine("calculadora-pace-velocidade", paceVelocidadeEngine);
registerCalculatorEngine("calculadora-previsor-tempo", previsorTempoEngine);
registerCalculatorEngine("calculadora-1rm", oneRepMaxEngine);
registerCalculatorEngine("calculadora-volume-treino", volumeTreinoEngine);
registerCalculatorEngine("calculadora-zonas-carga", zonasCargaEngine);
registerCalculatorEngine("calculadora-peso-ideal", pesoIdealEngine);
registerCalculatorEngine(
  "calculadora-calorias-refeicao",
  caloriasRefeicaoEngine
);
registerCalculatorEngine(
  "calculadora-percentual-gordura",
  percentualGorduraEngine
);
registerCalculatorEngine("calculadora-fc-maxima", fcMaximaEngine);
