import { aguaCalculator } from "./agua";
import { caloriasRefeicaoCalculator } from "./calorias-refeicao";
import { deficitCaloricoCalculator } from "./deficit-calorico";
import { gastoCaloricoCalculator } from "./gasto-calorico";
import { imcCalculator } from "./imc";
import { macrosCalculator } from "./macros";
import { oneRepMaxCalculator } from "./one-rep-max";
import { fcMaximaCalculator } from "./fc-maxima";
import { paceCalculator } from "./pace";
import { paceVelocidadeCalculator } from "./pace-velocidade";
import { percentualGorduraCalculator } from "./percentual-gordura";
import { pesoIdealCalculator } from "./peso-ideal";
import { previsorTempoCalculator } from "./previsor-tempo";
import { proteinaCalculator } from "./proteina";
import { tmbCalculator } from "./tmb";
import type { Calculator } from "./types";
import { volumeTreinoCalculator } from "./volume-treino";
import { zonasCargaCalculator } from "./zonas-carga";

export const calculators: Calculator[] = [
  imcCalculator,
  tmbCalculator,
  gastoCaloricoCalculator,
  deficitCaloricoCalculator,
  pesoIdealCalculator,
  proteinaCalculator,
  macrosCalculator,
  aguaCalculator,
  caloriasRefeicaoCalculator,
  percentualGorduraCalculator,
  fcMaximaCalculator,
  paceCalculator,
  paceVelocidadeCalculator,
  previsorTempoCalculator,
  oneRepMaxCalculator,
  volumeTreinoCalculator,
  zonasCargaCalculator,
];
