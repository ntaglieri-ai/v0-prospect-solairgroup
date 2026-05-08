import { defineField, defineType } from 'sanity'

// Un documento per linea (smart / power / premium).
// Solair vede una griglia di righe kWp, ognuna con le colonne kWh → prezzo.

export default defineType({
  name: 'priceList',
  title: 'Listino prezzi',
  type: 'document',
  fields: [
    defineField({
      name: 'linea',
      title: 'Linea',
      type: 'string',
      readOnly: true,
      description: 'Non modificare — identificatore interno',
    }),
    defineField({
      name: 'aggiornato',
      title: 'Aggiornato il',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    }),
    defineField({
      name: 'righe',
      title: 'Prezzi',
      type: 'array',
      description: 'Una riga per ogni potenza (kWp). Ogni riga contiene i prezzi per accumulo (kWh).',
      of: [
        {
          type: 'object',
          name: 'rigaKwp',
          fields: [
            defineField({
              name: 'kwp',
              title: 'Potenza kWp',
              type: 'number',
            }),
            defineField({
              name: 'prezzi',
              title: 'Prezzi per accumulo',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'cella',
                  fields: [
                    defineField({ name: 'kwh', title: 'Accumulo kWh', type: 'number' }),
                    defineField({ name: 'prezzo', title: 'Prezzo €', type: 'number' }),
                  ],
                  preview: {
                    select: { kwh: 'kwh', prezzo: 'prezzo' },
                    prepare: ({ kwh, prezzo }) => ({
                      title: `${kwh} kWh`,
                      subtitle: `€ ${prezzo?.toLocaleString('it-IT')}`,
                    }),
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { kwp: 'kwp' },
            prepare: ({ kwp }) => ({ title: `${kwp} kWp` }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'linea', subtitle: 'aggiornato' },
    prepare: ({ title, subtitle }) => ({
      title: `Listino ${title}`,
      subtitle: subtitle ? `Aggiornato: ${subtitle}` : '',
    }),
  },
})
