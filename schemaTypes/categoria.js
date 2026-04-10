export default {
  name: 'categoria',
  title: 'Categorías del Menú',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Nombre de la Categoría',
      type: 'string',
      description: 'Ejemplo: 🥩 Carnes / Parrilla',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Valor Interno (ID)',
      type: 'slug',
      description: 'Haz clic en "Generate". Ejemplo: carnes',
      options: { source: 'titulo', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'orden',
      title: 'Orden de Aparición',
      type: 'number',
      description: '1 para el primero, 2 para el segundo, etc.'
    },
    {
  name: 'seImprime',
  title: '¿Se envía a Comanda?',
  description: 'Si se desactiva, esta categoría no bloqueará el monitor de cocina.',
  type: 'boolean',
  initialValue: true // Por defecto que todas impriman
  }
  ]
}