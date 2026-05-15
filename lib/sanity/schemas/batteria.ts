import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'batteria',
  title: 'Batteria',
  type: 'document',
  fields: [
    defineField({
      name: 'marca',
      title: 'Marca',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'V-TAC LiFePO', value: 'V-TAC' },
          { title: 'Sineng RHP', value: 'Sineng' },
          { title: 'BYD Battery-Box HVE', value: 'BYD' },
        ]
      }
    }),
    defineField({
      name: 'pdf',
      title: 'PDF offerta',
      type: 'file',
      options: { accept: '.pdf' }
    }),
    defineField({
      name: 'bullets',
      title: 'Caratteristiche principali',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Punti chiave mostrati nel drawer del configuratore'
    }),
    defineField({
      name: 'taglie',
      title: 'Taglie disponibili (kWh)',
      type: 'array',
      of: [defineArrayMember({ type: 'number' })],
      description: 'Es. 10, 16, 20, 32 per V-TAC'
    }),
    defineField({
      name: 'prezzi',
      title: 'Prezzi per kWp e kWh',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'priceEntry',
          fields: [
            defineField({ name: 'kwp', title: 'kWp', type: 'number' }),
            defineField({ name: 'kwh', title: 'kWh', type: 'number' }),
            defineField({ name: 'prezzo', title: 'Prezzo (€)', type: 'number' }),
          ],
          preview: {
            select: { kwp: 'kwp', kwh: 'kwh', prezzo: 'prezzo' },
            prepare({ kwp, kwh, prezzo }: { kwp: number; kwh: number; prezzo: number }) {
              return {
                title: `${kwp} kWp + ${kwh} kWh`,
                subtitle: `€ ${prezzo?.toLocaleString('it-IT')}`
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: { title: 'marca' },
    prepare({ title }: { title: string }) {
      return { title: title || 'Batteria' }
    }
  }
})
