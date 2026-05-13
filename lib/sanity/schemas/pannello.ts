import { defineField, defineType } from 'sanity'

export const pannello = defineType({
  name: 'pannello',
  title: 'Pannello',
  type: 'document',
  fields: [
    defineField({ name: 'brand', title: 'Brand', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'modello', title: 'Modello', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'nome', title: 'Nome visualizzato (configuratore)', type: 'string', description: 'Es. "LONGi Hi-MO X10 Explorer" — usato come label nelle card del configuratore', validation: (Rule) => Rule.required() }),
    defineField({ name: 'codice', title: 'Codice modello', type: 'string', description: 'Es. LR7-72HVD' }),
    defineField({ name: 'potenza', title: 'Potenza (W)', type: 'number', description: 'Valore singolo, es. 645' }),
    defineField({ name: 'potenza_wp', title: 'Potenza configuratore (Wp)', type: 'number', description: 'Usato dal configuratore per calcoli. Stesso valore di Potenza.' }),
    defineField({ name: 'larghezza_mm', title: 'Larghezza (mm)', type: 'number' }),
    defineField({ name: 'altezza_mm', title: 'Altezza (mm)', type: 'number' }),
    defineField({ name: 'dimensioni', title: 'Dimensioni (testo)', type: 'string', description: 'Es. 2382×1134 mm — per visualizzazione' }),
    defineField({ name: 'peso', title: 'Peso (kg)', type: 'number' }),
    defineField({ name: 'efficienza', title: 'Efficienza (%)', type: 'number', validation: (Rule) => Rule.min(0).max(100) }),
    defineField({ name: 'degrado', title: 'Degrado annuo', type: 'string', description: 'Es. "0,35%/anno (yr 2–30)"' }),
    defineField({ name: 'garanziaProdotto', title: 'Garanzia Prodotto (anni)', type: 'number' }),
    defineField({ name: 'garanziaLineare', title: 'Garanzia Lineare (anni)', type: 'number' }),
    defineField({ name: 'tags', title: 'Tag tecnologici', type: 'array', of: [{ type: 'string' }], description: 'Es. N-type TOPCon, Bifacciale, Full Black…', options: { layout: 'tags' } }),
    defineField({ name: 'tier', title: 'Tier', type: 'string', options: { list: [{ title: 'Tier 1', value: 'tier1' }, { title: 'Tier 2', value: 'tier2' }] } }),
    defineField({ name: 'immagine', title: 'Immagine', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'scheda', title: 'Scheda Tecnica (PDF)', type: 'file' }),
    defineField({ name: 'attivo', title: 'Attivo', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'brand', subtitle: 'modello', media: 'immagine' },
    prepare({ title, subtitle, media }: { title: string; subtitle: string; media: any }) {
      return { title: `${title} ${subtitle}`, media }
    },
  },
})
