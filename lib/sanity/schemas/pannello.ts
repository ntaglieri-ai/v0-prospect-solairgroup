import { defineField, defineType } from 'sanity'

export const pannello = defineType({
  name: 'pannello',
  title: 'Pannello',
  type: 'document',
  fields: [
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modello',
      title: 'Modello',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'potenza',
      title: 'Potenza (W)',
      type: 'number',
    }),
    defineField({
      name: 'efficienza',
      title: 'Efficienza (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'garanziaProdotto',
      title: 'Garanzia Prodotto (anni)',
      type: 'number',
    }),
    defineField({
      name: 'garanziaLineare',
      title: 'Garanzia Lineare (anni)',
      type: 'number',
    }),
    defineField({
      name: 'dimensioni',
      title: 'Dimensioni',
      type: 'string',
      description: 'Es: 1722 x 1134 x 30 mm',
    }),
    defineField({
      name: 'peso',
      title: 'Peso (kg)',
      type: 'number',
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Tier 1', value: 'tier1' },
          { title: 'Tier 2', value: 'tier2' },
        ],
      },
    }),
    defineField({
      name: 'immagine',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'scheda',
      title: 'Scheda Tecnica (PDF)',
      type: 'file',
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
      title: 'brand',
      subtitle: 'modello',
      media: 'immagine',
    },
  },
})
