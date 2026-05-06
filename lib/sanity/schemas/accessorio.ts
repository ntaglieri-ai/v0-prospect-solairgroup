import { defineField, defineType } from 'sanity'

export const accessorio = defineType({
  name: 'accessorio',
  title: 'Accessorio',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'prezzo',
      title: 'Prezzo (€)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Wallbox', value: 'wallbox' },
          { title: 'Ottimizzatore', value: 'ottimizzatore' },
          { title: 'Monitoraggio', value: 'monitoraggio' },
          { title: 'Struttura', value: 'struttura' },
          { title: 'Altro', value: 'altro' },
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
      name: 'attivo',
      title: 'Attivo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'prezzo',
      media: 'immagine',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `€${subtitle}` : '',
        media,
      }
    },
  },
})
