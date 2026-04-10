// Archivo: backend/schemas/venta.js

export default {
  name: 'venta',
  title: 'Reporte de Ventas',
  type: 'document',
  fields: [
    {
      name: 'folio', // 🆕 Nuevo campo para el folio generado
      title: 'Folio de Venta',
      type: 'string',
      readOnly: true, // Evita que se edite manualmente en el Studio
    },
    {
      name: 'mesero', // 🆕 Nuevo campo para el nombre del mesero
      title: 'Mesero / Atendido por',
      type: 'string',
    },
    {
      name: 'fecha',
      title: 'Fecha de Venta (UTC / Sistema)',
      type: 'datetime'
    },

    // 🟢 NUEVO CAMPO – FUENTE REAL PARA REPORTES
    {
      name: 'fechaLocal',
      title: 'Fecha Local del Negocio',
      type: 'datetime',
      description: 'Fecha y hora real en Colombia al momento de la venta'
    },

    {
      name: 'mesa',
      title: 'Mesa / Cliente',
      type: 'string'
    },
    {
            name: 'tipoOrden',
            title: 'Tipo de Servicio',
            type: 'string',
            options: {
                list: [
                    { title: '🏠 Mesa / Salón', value: 'mesa' },
                    { title: '🛵 Domicilio', value: 'domicilio' },
                    { title: '🛍️ Para Llevar', value: 'llevar' }
                ],
                layout: 'radio' // Esto lo hace ver como botones de selección rápida
            },
            initialValue: 'mesa'
        },
    {
      name: 'totalPagado',
      title: 'Total Pagado (Venta Neta)',
      description: 'Monto correspondiente solo a los productos vendidos.',
      type: 'number'
    },
    {
      name: 'propinaRecaudada', // 💰 Dinero destinado a los meseros
      title: 'Propina Recaudada',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'metodoPago',
      title: 'Método de Pago',
      type: 'string',
      options: {
        list: [
          { title: 'Efectivo', value: 'efectivo' },
          { title: 'Nequi/Daviplata', value: 'digital' },
          { title: 'Tarjeta', value: 'tarjeta' }
        ]
      }
    },
    {
      name: 'detallePagos',
      title: 'Desglose de Pago (Mixto)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metodo', type: 'string', title: 'Método' },
            { name: 'monto', type: 'number', title: 'Monto' }
          ]
        }
      ]
    },
    {
      name: 'platosVendidosV2',
      title: 'Detalle de Productos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'platoVendidoV2',
          fields: [
            { name: 'nombrePlato', type: 'string', title: 'Plato' },
            { name: 'cantidad', type: 'number', title: 'Cantidad' },
            { name: 'precioUnitario', type: 'number', title: 'Precio' },
            { name: 'subtotal', type: 'number', title: 'Subtotal' },
            { name: 'comentario', type: 'string', title: 'Notas de Cocina' },
          ]
        }
      ]
    }
  ],

  preview: {
    select: {
      total: 'totalPagado',
      propina: 'propinaRecaudada',
      fecha: 'fecha',
      fechaLocal: 'fechaLocal', // 👈 usamos la nueva
      mesa: 'mesa',
      folio: 'folio'
    },
    prepare(selection) {
      const { total, propina, fecha, fechaLocal, mesa, folio } = selection;

      // El total real que entró a la caja (Venta + Propina)
      const totalFinal = (Number(total) || 0) + (Number(propina) || 0);

      // 🧠 PRIORIDAD: fechaLocal → fecha → fallback
      const fechaMostrar = fechaLocal || fecha;

      return {
        title: `$${totalFinal.toLocaleString('es-CO')} - ${mesa || 'Sin Mesa'}`,
        subtitle: `${folio ? '[' + folio + ']' : ''} ${
          fechaMostrar
            ? new Date(fechaMostrar).toLocaleString('es-CO')
            : 'Sin fecha'
        }`
      };
    }
  }
};// cambio para forzar git
