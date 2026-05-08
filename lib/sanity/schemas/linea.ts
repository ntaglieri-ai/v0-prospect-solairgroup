import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'linea',
  title: 'Linee prodotto',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Linea',
      type: 'string',
      readOnly: true,
      description: 'Non modificare — identificatore interno',
    }),
    defineField({
      name: 'ordine',
      title: 'Ordine',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'livello',
      title: 'Etichetta livello',
      type: 'string',
      description: 'Es. "Linea Base"',
    }),
    defineField({
      name: 'nome',
      title: 'Nome commerciale',
      type: 'string',
      description: 'Es. "Smart One"',
    }),
    defineField({
      name: 'brand',
      title: 'Componenti principali',
      type: 'string',
      description: 'Es. "Solis + V-TAC LiFePo"',
    }),
    defineField({
      name: 'consigliata',
      title: 'Mostra badge "Più scelto"',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'badgeLabel',
      title: 'Testo badge',
      type: 'string',
      initialValue: 'Più scelto',
      hidden: ({ document }) => !document?.consigliata,
    }),
    defineField({
      name: 'features',
      title: 'Caratteristiche (lista con spunta)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tag',
          fields: [
            defineField({ name: 'testo', title: 'Testo', type: 'string' }),
            defineField({
              name: 'stile',
              title: 'Stile',
              type: 'string',
              options: {
                list: [
                  { title: 'Grigio (neutro)', value: 'neutro' },
                  { title: 'Verde (highlight)', value: 'highlight' },
                  { title: 'Rosso (attenzione)', value: 'alert' },
                ],
                layout: 'radio',
              },
              initialValue: 'neutro',
            }),
          ],
          preview: {
            select: { title: 'testo', subtitle: 'stile' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'nome', subtitle: 'livello' },
  },
  orderings: [
    { title: 'Ordine', name: 'ordine', by: [{ field: 'ordine', direction: 'asc' }] },
  ],
})
