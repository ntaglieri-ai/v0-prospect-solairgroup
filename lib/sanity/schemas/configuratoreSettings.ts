import { defineField, defineType } from 'sanity'

// Singleton — un solo documento, sempre lo stesso.
// Contiene tutto quello che Solair può voler modificare
// senza toccare il codice: testi, numeri, contatti.

export default defineType({
  name: 'configuratoreSettings',
  title: 'Impostazioni generali',
  type: 'document',
  fields: [
    // ── CONTATTI ──
    defineField({
      name: 'whatsapp',
      title: 'Numero WhatsApp (con prefisso)',
      type: 'string',
      description: 'Es. 393497988101',
    }),

    // ── TRUST BAR ──
    defineField({
      name: 'trustBar',
      title: 'Trust bar (massimo 3 voci)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Le 3 righe sotto il logo. Es. "⭐ 99 recensioni Google"',
      validation: (Rule) => Rule.max(3),
    }),

    // ── ZAVORRE ──
    defineField({
      name: 'costoZavorreFalde',
      title: 'Costo zavorre — Tetto a falde (€/kWp)',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'costoZavorreVento',
      title: 'Costo zavorre — Falde con vento forte (€/kWp)',
      type: 'number',
      initialValue: 150,
    }),

    // ── PANNELLI ──
    defineField({
      name: 'pannelli',
      title: 'Pannelli disponibili',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pannello',
          fields: [
            defineField({ name: 'nome', title: 'Nome', type: 'string' }),
            defineField({ name: 'isDefault', title: 'Pannello di default', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'nome', isDefault: 'isDefault' },
            prepare: ({ title, isDefault }) => ({
              title,
              subtitle: isDefault ? '⭐ Default' : '',
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Impostazioni generali' }),
  },
})
