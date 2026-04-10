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
    {
      name: 'insumoVinculado',
      title: 'Insumo del Inventario',
      type: 'reference',
      to: [{ type: 'inventario' }],
      hidden: ({ document }) => !document?.controlaInventario,
      description: 'Seleccione qué ítem del almacén descuenta este plato'
    },
    {
      name: 'cantidadADescontar',
      title: 'Cantidad a descontar',
      type: 'number',
      initialValue: 1,
      hidden: ({ document }) => !document?.controlaInventario,
      description: '¿Cuántas unidades o kg descuenta cada venta?'
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