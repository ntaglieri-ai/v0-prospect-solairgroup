import { defineField, defineType } from 'sanity'
export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroCtaPrimario', title: 'Hero - CTA Primario', type: 'string' }),
    defineField({ name: 'heroCtaSecondario', title: 'Hero - CTA Secondario', type: 'string' }),
    defineField({ name: 'soluzioniTitolo', title: 'Soluzioni - Titolo', type: 'string' }),
    defineField({ name: 'incentiviTitolo', title: 'Incentivi - Titolo', type: 'string' }),
    defineField({ name: 'cerTitolo', title: 'CER - Titolo', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Homepage' } } },
})
