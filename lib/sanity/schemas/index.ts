// sanity/schemas/index.ts

import { sede } from './sede'
import { homepage } from './homepage'
import { recensione } from './recensione'
import { faq } from './faq'
import { cer } from './cer'
import { pannello } from './pannello'
import { datiAziendali } from './datiAziendali'
import linea from './linea'
import priceList from './priceList'
import finanziamentoTable from './finanziamentoTable'
import configuratoreSettings from './configuratoreSettings'
import lavoraConNoi from './lavoraConNoi'

export const schemaTypes = [
  homepage,
  datiAziendali,
  cer,
  sede,
  recensione,
  faq,
  pannello,
  linea,
  priceList,
  finanziamentoTable,
  configuratoreSettings,
  lavoraConNoi,
]
