import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'domanda',
      title: 'Domanda',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'risposta',
      title: 'Risposta',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Generale', value: 'generale' },
          { title: 'Installazione', value: 'installazione' },
          { title: 'Incentivi', value: 'incentivi' },
          { title: 'Prodotti', value: 'prodotti' },
          { title: 'Pagamenti', value: 'pagamenti' },
          { title: 'Garanzia', value: 'garanzia' },
        ],
      },
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
      title: 'domanda',
      subtitle: 'categoria',
    },
  },
})
