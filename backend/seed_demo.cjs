const fs = require('fs');
const path = require('path');

const basePath = path.resolve(__dirname, '..');

const admins = {
  admins: [
    {
      id: "admin-demo-01",
      email: "demo@cobros.com",
      password: "$2b$10$9U.wNCbalSmVIlrotoBWAu8XfNAaxFUZFxhScJ50HEQVOGh9qJSve",
      nombre: "Profesor Demo",
      emailVerificado: true,
      tokenVerificacion: null,
      tokenExpiracion: null,
      creadoEn: "2026-01-01T10:00:00.000Z",
      actualizadoEn: "2026-01-01T10:00:00.000Z"
    },
    {
      id: "admin-demo-02",
      email: "admin@demo.com",
      password: "$2b$10$9U.wNCbalSmVIlrotoBWAu8XfNAaxFUZFxhScJ50HEQVOGh9qJSve",
      nombre: "Administrador Demo",
      emailVerificado: true,
      tokenVerificacion: null,
      tokenExpiracion: null,
      creadoEn: "2026-01-01T10:00:00.000Z",
      actualizadoEn: "2026-01-01T10:00:00.000Z"
    }
  ]
};

const alumnos = [
  { id: "100001", nombre: "Lucas Benítez", whatsapp: "5491133330001", plan: "libre", cuota: 35000, diaVencimiento: 10, estado: "activo", categoria: "adulto", nivel: "azul", notas: "Competidor", fechaRegistro: "2026-02-10T12:00:00Z" },
  { id: "100002", nombre: "Martín Palermo", whatsapp: "5491133330002", plan: "libre", cuota: 35000, diaVencimiento: 10, estado: "activo", categoria: "adulto", nivel: "morado", notas: "Turno Noche", fechaRegistro: "2026-01-15T12:00:00Z" },
  { id: "100003", nombre: "Camila Rodríguez", whatsapp: "5491133330003", plan: "3x", cuota: 28000, diaVencimiento: 5, estado: "activo", categoria: "adulto", nivel: "blanco", notas: "Lunes, Miércoles y Viernes", fechaRegistro: "2026-03-01T12:00:00Z" },
  { id: "100004", nombre: "Nicolás Fernández", whatsapp: "5491133330004", plan: "libre", cuota: 35000, diaVencimiento: 10, estado: "activo", categoria: "adulto", nivel: "azul", notas: "", fechaRegistro: "2026-02-20T12:00:00Z" },
  { id: "100005", nombre: "Sofía Martínez", whatsapp: "5491133330005", plan: "3x", cuota: 28000, diaVencimiento: 5, estado: "activo", categoria: "adulto", nivel: "blanco", notas: "", fechaRegistro: "2026-04-05T12:00:00Z" },
  { id: "100006", nombre: "Agustín Romero", whatsapp: "5491133330006", plan: "libre", cuota: 35000, diaVencimiento: 10, estado: "activo", categoria: "adulto", nivel: "marron", notas: "Instructor asistente", fechaRegistro: "2025-11-10T12:00:00Z" },
  { id: "100007", nombre: "Valeria Gómez", whatsapp: "5491133330007", plan: "3x", cuota: 28000, diaVencimiento: 5, estado: "activo", categoria: "adulto", nivel: "azul", notas: "", fechaRegistro: "2026-05-12T12:00:00Z" },
  { id: "100008", nombre: "Mateo Morales", whatsapp: "5491133330008", plan: "3x", cuota: 25000, diaVencimiento: 10, estado: "activo", categoria: "kids", edad: 9, tutor: "Carla Morales (Madre)", nivel: "gris", notas: "Kids Grupo B", fechaRegistro: "2026-03-15T12:00:00Z" },
  { id: "100009", nombre: "Benjamín Silva", whatsapp: "5491133330009", plan: "libre", cuota: 30000, diaVencimiento: 5, estado: "activo", categoria: "kids", edad: 11, tutor: "Roberto Silva (Padre)", nivel: "amarillo", notas: "Kids Avanzado", fechaRegistro: "2026-02-18T12:00:00Z" },
  { id: "100010", nombre: "Mía Herrera", whatsapp: "5491133330010", plan: "3x", cuota: 25000, diaVencimiento: 10, estado: "activo", categoria: "kids", edad: 7, tutor: "Mariana Herrera (Madre)", nivel: "blanco", notas: "Kids Inicial", fechaRegistro: "2026-06-01T12:00:00Z" },
  { id: "100011", nombre: "Facundo Torres", whatsapp: "5491133330011", plan: "libre", cuota: 35000, diaVencimiento: 10, estado: "activo", categoria: "adulto", nivel: "blanco", notas: "", fechaRegistro: "2026-07-10T12:00:00Z" },
  { id: "100012", nombre: "Luciana Navarro", whatsapp: "5491133330012", plan: "3x", cuota: 28000, diaVencimiento: 5, estado: "activo", categoria: "adulto", nivel: "azul", notas: "", fechaRegistro: "2026-03-22T12:00:00Z" },
  { id: "100013", nombre: "Joaquín Castro", whatsapp: "5491133330013", plan: "libre", cuota: 35000, diaVencimiento: 10, estado: "activo", categoria: "adulto", nivel: "blanco", notas: "", fechaRegistro: "2026-08-01T12:00:00Z" },
  { id: "100014", nombre: "Thiago Rossi", whatsapp: "5491133330014", plan: "3x", cuota: 25000, diaVencimiento: 5, estado: "activo", categoria: "kids", edad: 8, tutor: "Esteban Rossi (Padre)", nivel: "gris", notas: "", fechaRegistro: "2026-04-10T12:00:00Z" },
  { id: "100015", nombre: "Gonzalo Peralta", whatsapp: "5491133330015", plan: "libre", cuota: 35000, diaVencimiento: 10, estado: "activo", categoria: "adulto", nivel: "negro", notas: "Cinturón Negro", fechaRegistro: "2025-01-10T12:00:00Z" }
];

const pagos = [];
const paidMonth11 = ["100001", "100003", "100004", "100006", "100007", "100009", "100011", "100012", "100015"];
const pendingMonth10 = ["100002", "100013"];

// Mes 9
alumnos.forEach((a, i) => {
  pagos.push({
    id: `p-9-${a.id}`,
    alumnoId: a.id,
    mes: 9,
    anio: 2026,
    monto: a.cuota,
    estado: "pagado",
    fechaPago: `2026-09-0${(i % 8) + 2}T15:30:00Z`
  });
});

// Mes 10
alumnos.forEach((a, i) => {
  const isPending = pendingMonth10.includes(a.id);
  pagos.push({
    id: `p-10-${a.id}`,
    alumnoId: a.id,
    mes: 10,
    anio: 2026,
    monto: a.cuota,
    estado: isPending ? "pendiente" : "pagado",
    fechaPago: isPending ? undefined : `2026-10-0${(i % 8) + 2}T16:00:00Z`
  });
});

// Mes 11 (Noviembre 2026 - actual)
alumnos.forEach((a, i) => {
  const isPaid = paidMonth11.includes(a.id);
  pagos.push({
    id: `p-11-${a.id}`,
    alumnoId: a.id,
    mes: 11,
    anio: 2026,
    monto: a.cuota,
    estado: isPaid ? "pagado" : "pendiente",
    fechaPago: isPaid ? `2026-11-0${(i % 8) + 2}T14:20:00Z` : undefined
  });
});

const activity = [
  { type: "payment", message: "Pago recibido: Gonzalo Peralta ($35.000 - Noviembre)", timestamp: "2026-11-24T09:15:00.000Z" },
  { type: "payment", message: "Pago recibido: Lucas Benítez ($35.000 - Noviembre)", timestamp: "2026-11-23T18:40:00.000Z" },
  { type: "sent", message: "Recordatorio Noviembre enviado a Martín Palermo", timestamp: "2026-11-22T11:00:00.000Z" },
  { type: "payment", message: "Pago recibido: Benjamín Silva ($30.000 - Noviembre)", timestamp: "2026-11-21T16:20:00.000Z" },
  { type: "register", message: "Alumno registrado: Facundo Torres (Plan Libre)", timestamp: "2026-11-15T10:30:00.000Z" },
  { type: "sent", message: "Recordatorios Noviembre: 6 enviados, 0 fallidos", timestamp: "2026-11-10T09:00:00.000Z" }
];

const recordatoriosEnviados = {
  "100002_11_2026": { manual: "2026-11-22T11:00:00.000Z" },
  "100005_11_2026": { primer_recordatorio: "2026-11-05T09:00:00.000Z" }
};

const dataStore = {
  alumnos,
  pagos,
  config: {
    ycloudApiKey: "",
    ycloudWhatsAppNumber: "+5491122334455",
    diaEnvio: 5,
    mensajePlantilla: "¡Hola {nombre}! 👋🥋\n\nTe recordamos que la cuota de *{mes}* ya está disponible para abonar:\n\n💰 Monto: *{monto}*\n📋 Plan: *{plan}*\n\n{datos_pago}\n\n¡Te esperamos en el tatami! 💪🔥\n\n_Academia Demo - Sistema de Gestión_",
    datosPago: "Alias: academia.demo\na nombre de: Juan Carlos Demo (Banco Galicia)",
    datosPagoKids: "Alias: kids.academia.demo\na nombre de: Laura Demo (Banco Santander)"
  },
  activity,
  mensajesEnviados: 24,
  recordatoriosEnviados,
  enviosRealizados: []
};

fs.writeFileSync(path.join(basePath, 'backend', 'admins.json'), JSON.stringify(admins, null, 2), 'utf8');
fs.writeFileSync(path.join(basePath, 'backend', 'data.json'), JSON.stringify(dataStore, null, 2), 'utf8');
fs.writeFileSync(path.join(basePath, 'backend', 'data.demo.json'), JSON.stringify(dataStore, null, 2), 'utf8');

const envContent = `PORT=3001
NODE_ENV=development
JWT_SECRET=demo-super-secret-key-998877
# Sin credenciales de Supabase para que opere 100% aislado con data.json local
`;
fs.writeFileSync(path.join(basePath, '.env'), envContent, 'utf8');

console.log("✅ Datos ficticios y configuración inicial generados con éxito!");
