import { defineField, defineType } from 'sanity'

export const documentoPdf = defineType({
  name: 'documentoPdf',
  title: 'Documento PDF',
  type: 'document',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'file',
      title: 'File PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Scheda Tecnica', value: 'scheda-tecnica' },
          { title: 'Brochure', value: 'brochure' },
          { title: 'Contratto', value: 'contratto' },
          { title: 'Privacy', value: 'privacy' },
          { title: 'Termini e Condizioni', value: 'termini' },
          { title: 'Garanzia', value: 'garanzia' },
          { title: 'Altro', value: 'altro' },
        ],
      },
    }),
    defineField({
      name: 'pubblico',
      title: 'Pubblico',
      type: 'boolean',
      description: 'Se attivo, il documento è scaricabile pubblicamente',
      initialValue: false,
    }),
    defineField({
      name: 'ordine',
      title: 'Ordine',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'titolo',
      subtitle: 'categoria',
    },
  },
})
