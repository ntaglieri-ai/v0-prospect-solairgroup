import { defineField, defineType } from 'sanity'

export const cer = defineType({
  name: 'cer',
  title: 'CER (Comunità Energetica Rinnovabile)',
  type: 'document',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo Sezione',
      type: 'string',
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'vantaggi',
      title: 'Vantaggi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titolo', title: 'Titolo', type: 'string' },
            { name: 'descrizione', title: 'Descrizione', type: 'text' },
            { name: 'icona', title: 'Icona', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'comePartecipare',
      title: 'Come Partecipare',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step', type: 'number' },
            { name: 'titolo', title: 'Titolo', type: 'string' },
            { name: 'descrizione', title: 'Descrizione', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'incentivo',
      title: 'Incentivo (€/kWh)',
      type: 'number',
    }),
    defineField({
      name: 'ctaTesto',
      title: 'CTA Testo',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Sezione CER' }
    },
  },
})
