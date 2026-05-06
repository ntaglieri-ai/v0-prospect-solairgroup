import { defineField, defineType } from 'sanity'

export const immagineGalleria = defineType({
  name: 'immagineGalleria',
  title: 'Immagine Galleria',
  type: 'document',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'immagine',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Installazione Residenziale', value: 'residenziale' },
          { title: 'Installazione Commerciale', value: 'commerciale' },
          { title: 'Installazione Industriale', value: 'industriale' },
          { title: 'Team', value: 'team' },
          { title: 'Eventi', value: 'eventi' },
        ],
      },
    }),
    defineField({
      name: 'sede',
      title: 'Sede',
      type: 'reference',
      to: [{ type: 'sede' }],
    }),
    defineField({
      name: 'data',
      title: 'Data',
      type: 'date',
    }),
    defineField({
      name: 'ordine',
      title: 'Ordine',
      type: 'number',
    }),
    defineField({
      name: 'attiva',
      title: 'Attiva',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'titolo',
      subtitle: 'categoria',
      media: 'immagine',
    },
  },
})
