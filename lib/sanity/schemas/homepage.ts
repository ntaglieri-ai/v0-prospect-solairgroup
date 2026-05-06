import { defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitolo',
      title: 'Hero - Titolo',
      type: 'string',
    }),
    defineField({
      name: 'heroSottotitolo',
      title: 'Hero - Sottotitolo',
      type: 'text',
    }),
    defineField({
      name: 'heroCtaPrimario',
      title: 'Hero - CTA Primario',
      type: 'string',
    }),
    defineField({
      name: 'heroCtaSecondario',
      title: 'Hero - CTA Secondario',
      type: 'string',
    }),
    defineField({
      name: 'soluzioniTitolo',
      title: 'Soluzioni - Titolo',
      type: 'string',
    }),
    defineField({
      name: 'soluzioniDescrizione',
      title: 'Soluzioni - Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'incentiviTitolo',
      title: 'Incentivi - Titolo',
      type: 'string',
    }),
    defineField({
      name: 'incentiviDescrizione',
      title: 'Incentivi - Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'cerTitolo',
      title: 'CER - Titolo',
      type: 'string',
    }),
    defineField({
      name: 'cerDescrizione',
      title: 'CER - Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'faqTitolo',
      title: 'FAQ - Titolo',
      type: 'string',
    }),
    defineField({
      name: 'contattiTitolo',
      title: 'Contatti - Titolo',
      type: 'string',
    }),
    defineField({
      name: 'contattiDescrizione',
      title: 'Contatti - Descrizione',
      type: 'text',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
