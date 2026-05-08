import { defineField, defineType } from 'sanity'

// Tabella Deutsche Bank Easy Prod.31
// La modifica Solair raramente (solo se la banca cambia condizioni).
// Nando la aggiorna direttamente riga per riga quando necessario.

export default defineType({
  name: 'finanziamentoTable',
  title: 'Tabella finanziamento',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome versione',
      type: 'string',
      description: 'Es. "Deutsche Bank Easy Prod.31 — Maggio 2026"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attiva',
      title: 'Versione attiva',
      type: 'boolean',
      description: 'Il configuratore usa sempre la versione attiva. Attivane solo una.',
      initialValue: false,
    }),
    defineField({
      name: 'tan',
      title: 'TAN fisso (%)',
      type: 'number',
      initialValue: 6.9,
    }),
    defineField({
      name: 'aggiornato',
      title: 'Data validità',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    }),
    defineField({
      name: 'righe',
      title: 'Righe tabella',
      type: 'array',
      description: 'Ogni riga = una combinazione importo / numero rate / rata mensile / TAEG',
      of: [
        {
          type: 'object',
          name: 'riga',
          fields: [
            defineField({ name: 'importo', title: 'Importo (€)', type: 'number' }),
            defineField({ name: 'nRate', title: 'N° rate', type: 'number' }),
            defineField({ name: 'rata', title: 'Rata mensile (€)', type: 'number' }),
            defineField({ name: 'taeg', title: 'TAEG (%)', type: 'number' }),
          ],
          preview: {
            select: { importo: 'importo', nRate: 'nRate', rata: 'rata', taeg: 'taeg' },
            prepare: ({ importo, nRate, rata, taeg }) => ({
              title: `€ ${importo?.toLocaleString('it-IT')} · ${nRate} rate`,
              subtitle: `€ ${rata}/mese · TAEG ${taeg}%`,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'nome', attiva: 'attiva' },
    prepare: ({ title, attiva }) => ({
      title,
      subtitle: attiva ? '✅ Attiva' : '⏸ Non attiva',
    }),
  },
})
