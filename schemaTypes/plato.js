export default {
  name: 'plato',
  title: 'Platos del Menú',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre del Plato',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'precio',
      title: 'Precio',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'categoria',
      title: 'Categoría',
      description: 'Seleccione una categoría creada en el panel de Categorías',
      type: 'reference',
      to: [{ type: 'categoria' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'imagen',
      title: 'Foto del Plato',
      type: 'image',
      options: { 
        hotspot: true 
      }
    },
    {
      name: 'disponible',
      title: '¿Está Disponible?',
      type: 'boolean',
      initialValue: true,
      description: 'Si se desactiva, el plato no aparecerá en el POS'
    },
    // --- NUEVOS CAMPOS DE INVENTARIO INTEGRADOS CORRECTAMENTE ---
    {
      name: 'controlaInventario',
      title: '¿Controla Inventario?',
      type: 'boolean',
      initialValue: false
    },
    // 🚀 NUEVA LÓGICA: RECETA MULTI-INSUMO
    {
      name: 'recetaInsumos',
      title: 'Insumos a Descontar (Receta)',
      type: 'array',
      hidden: ({ document }) => !document?.controlaInventario,
      description: 'Agregue todos los insumos que este plato debe descontar al venderse',
      of: [
        {
          type: 'object',
          name: 'itemReceta',
          fields: [
            {
              name: 'insumo',
              title: 'Insumo',
              type: 'reference',
              to: [{ type: 'inventario' }]
            },
            {
              name: 'cantidad',
              title: 'Cantidad a descontar',
              type: 'number',
              initialValue: 1
            }
          ],
          preview: {
            select: {
              title: 'insumo.nombre',
              cantidad: 'cantidad'
            },
            prepare({ title, cantidad }) {
              return {
                title: `${title || 'Sin seleccionar'}`,
                subtitle: `Descuenta: ${cantidad} unidades`
              }
            }
          }
        }
      ]
    },
    {
      name: 'insumoVinculado',
      title: 'Insumo del Inventario',
      type: 'reference',
      to: [{ type: 'inventario' }],
      hidden: true
    },
    {
      name: 'cantidadADescontar',
      title: 'Cantidad a descontar',
      type: 'number',
      initialValue: 1,
      hidden: true
    },
    {
    name: 'totalVentas',
      title: 'Popularidad (Ventas Totales)',
      type: 'number',
      initialValue: 0,
      description: 'Este número aumenta automáticamente con cada venta y define el orden en el POS'
    }
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'categoria.titulo',
      media: 'imagen'
    }
  }
}