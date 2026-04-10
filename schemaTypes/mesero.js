// schemas/mesero.js
export default {
  name: 'mesero',
  title: 'Meseros',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre del Mesero(a)',
      type: 'string',
      description: 'Escriba el nombre tal cual quiere que aparezca en el POS',
    }
  ],
}