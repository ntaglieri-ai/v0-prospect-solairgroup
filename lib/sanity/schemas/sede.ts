import { defineField, defineType } from 'sanity'
export const sede = defineType({
  name: 'sede',
  title: 'Sede',
  type: 'document',
  fields: [
    defineField({ name: 'citta', title: 'Città', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'regione', title: 'Regione', type: 'string' }),
    defineField({ name: 'referente', title: 'Referente', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'telefono', title: 'Telefono', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'lat', title: 'Latitudine', type: 'number', validation: (Rule) => Rule.required().min(-90).max(90) }),
    defineField({ name: 'lng', title: 'Longitudine', type: 'number', validation: (Rule) => Rule.required().min(-180).max(180) }),
  ],
  preview: { select: { title: 'citta', subtitle: 'referente' } },
})
