import { defineField, defineType } from 'sanity'

export const datiAziendali = defineType({
  name: 'datiAziendali',
  title: 'Dati Aziendali',
  type: 'document',
  fields: [
    // Contatti
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Numero WhatsApp con prefisso (es: +393331234567)',
    }),
    defineField({
      name: 'telefono',
      title: 'Telefono',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'emailPec',
      title: 'Email PEC',
      type: 'string',
    }),
    // Social
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    }),
    // Statistiche
    defineField({
      name: 'impiantiInstallati',
      title: 'Impianti Installati',
      type: 'number',
    }),
    defineField({
      name: 'kWInstallati',
      title: 'kW Installati',
      type: 'number',
    }),
    defineField({
      name: 'clientiSoddisfatti',
      title: 'Clienti Soddisfatti (%)',
      type: 'number',
    }),
    defineField({
      name: 'anniEsperienza',
      title: 'Anni di Esperienza',
      type: 'number',
    }),
    defineField({
      name: 'recensioniGoogle',
      title: 'Numero Recensioni Google',
      type: 'number',
    }),
    defineField({
      name: 'mediaRecensioni',
      title: 'Media Recensioni (1-5)',
      type: 'number',
    }),
    // Dati legali
    defineField({
      name: 'ragioneSociale',
      title: 'Ragione Sociale',
      type: 'string',
    }),
    defineField({
      name: 'partitaIva',
      title: 'Partita IVA',
      type: 'string',
    }),
    defineField({
      name: 'codiceFiscale',
      title: 'Codice Fiscale',
      type: 'string',
    }),
    defineField({
      name: 'rea',
      title: 'REA',
      type: 'string',
    }),
    defineField({
      name: 'capitaleSociale',
      title: 'Capitale Sociale',
      type: 'string',
    }),
    defineField({
      name: 'sedeLegale',
      title: 'Sede Legale',
      type: 'string',
    }),
    // Footer
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      description: 'Es: © 2024 Solair Group. Tutti i diritti riservati.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Dati Aziendali' }
    },
  },
})
