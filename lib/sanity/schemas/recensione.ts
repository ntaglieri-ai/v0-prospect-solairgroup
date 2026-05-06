import { defineField, defineType } from 'sanity'

export const recensione = defineType({
  name: 'recensione',
  title: 'Recensione',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome Cliente',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testo',
      title: 'Testo Recensione',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stelle',
      title: 'Stelle (1-5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'data',
      title: 'Data',
      type: 'date',
    }),
    defineField({
      name: 'fonte',
      title: 'Fonte',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Trustpilot', value: 'trustpilot' },
          { title: 'Altro', value: 'altro' },
        ],
      },
    }),
    defineField({
      name: 'attiva',
      title: 'Attiva',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ordine',
      title: 'Ordine',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'testo',
    },
  },
})
