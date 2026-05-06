import { sede } from './sede'
import { homepage } from './homepage'
import { recensione } from './recensione'
import { faq } from './faq'
import { cer } from './cer'
import { prodotto } from './prodotto'
import { pannello } from './pannello'
import { accessorio } from './accessorio'
import { immagineGalleria } from './immagineGalleria'
import { documentoPdf } from './documentoPdf'
import { datiAziendali } from './datiAziendali'

export const schemaTypes = [
  // Singleton
  homepage,
  datiAziendali,
  cer,
  // Documents
  sede,
  recensione,
  faq,
  prodotto,
  pannello,
  accessorio,
  immagineGalleria,
  documentoPdf,
]
