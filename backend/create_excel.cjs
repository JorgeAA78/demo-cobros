const path = require('path');
const XLSX = require('../frontend/node_modules/xlsx');

const demoStudents = [
  { "Nombre": "Emiliano Martínez", "WhatsApp": "1144556677", "Email": "emiliano@ejemplo.com", "Plan": "Libre", "Cuota": 35000, "Cinturon": "Azul", "Vencimiento": 10, "Categoria": "Adulto" },
  { "Nombre": "Rodrigo De Paul", "WhatsApp": "1155667788", "Email": "rodrigo@ejemplo.com", "Plan": "3x", "Cuota": 28000, "Cinturon": "Blanco", "Vencimiento": 5, "Categoria": "Adulto" },
  { "Nombre": "Julián Álvarez", "WhatsApp": "1166778899", "Email": "julian@ejemplo.com", "Plan": "Libre", "Cuota": 35000, "Cinturon": "Morado", "Vencimiento": 10, "Categoria": "Adulto" },
  { "Nombre": "Enzo Fernández", "WhatsApp": "1177889900", "Email": "enzo@ejemplo.com", "Plan": "3x", "Cuota": 28000, "Cinturon": "Azul", "Vencimiento": 5, "Categoria": "Adulto" },
  { "Nombre": "Lautaro Martínez", "WhatsApp": "1188990011", "Email": "lautaro@ejemplo.com", "Plan": "Libre", "Cuota": 35000, "Cinturon": "Marrón", "Vencimiento": 10, "Categoria": "Adulto" },
  { "Nombre": "Ciro Messi (Kids)", "WhatsApp": "1199001122", "Email": "padres@ejemplo.com", "Plan": "3x", "Cuota": 25000, "Cinturon": "Gris", "Vencimiento": 10, "Categoria": "Kids", "Edad": 8, "Tutor": "Antonela Roccuzzo" },
  { "Nombre": "Mateo Messi (Kids)", "WhatsApp": "1199001133", "Email": "padres@ejemplo.com", "Plan": "Libre", "Cuota": 30000, "Cinturon": "Amarillo", "Vencimiento": 5, "Categoria": "Kids", "Edad": 10, "Tutor": "Antonela Roccuzzo" },
  { "Nombre": "Alexis Mac Allister", "WhatsApp": "1122334455", "Email": "alexis@ejemplo.com", "Plan": "Libre", "Cuota": 35000, "Cinturon": "Blanco", "Vencimiento": 10, "Categoria": "Adulto" }
];

const ws = XLSX.utils.json_to_sheet(demoStudents);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Alumnos");

const destPath = path.resolve(__dirname, '..', 'alumnos_demo.xlsx');
XLSX.writeFile(wb, destPath);

console.log('✅ Archivo alumnos_demo.xlsx generado exitosamente en:', destPath);
