import { defineField, defineType } from 'sanity'

export const prodotto = defineType({
  name: 'prodotto',
  title: 'Prodotto (Linea)',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome Linea',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nome' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Smart One', value: 'smart' },
          { title: 'Power Plus', value: 'power' },
          { title: 'Premium Top', value: 'premium' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'inverter',
      title: 'Inverter',
      type: 'string',
    }),
    defineField({
      name: 'batteria',
      title: 'Batteria',
      type: 'string',
    }),
    defineField({
      name: 'garanzia',
      title: 'Garanzia (anni)',
      type: 'number',
    }),
    defineField({
      name: 'caratteristiche',
      title: 'Caratteristiche',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'taglie',
      title: 'Taglie Disponibili',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'kWp', title: 'kWp', type: 'number' },
            { name: 'kWh', title: 'kWh', type: 'number' },
            { name: 'prezzo', title: 'Prezzo (€)', type: 'number' },
            { name: 'prezzoScontato', title: 'Prezzo Scontato (€)', type: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Es: "Più venduto", "Best value"',
    }),
    defineField({
      name: 'immagine',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ordine',
      title: 'Ordine',
      type: 'number',
    }),
    defineField({
      name: 'attivo',
      title: 'Attivo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'tipo',
      media: 'immagine',
    },
  },
})
