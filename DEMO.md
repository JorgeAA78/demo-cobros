# 🥋 Entorno de Demostración — Sistema de Cobros

Este proyecto es una réplica 100% funcional y aislada de **cobros-system-v2**, preparada especialmente para mostrar demostraciones en vivo a clientes potenciales sin tocar datos reales de producción ni depender de bases de datos externas.

---

## 🚀 Cómo Iniciar la Demo

1. Abrí una terminal en esta carpeta:
   ```bash
   cd "C:\Users\Jorge Altamirano\PROYECTOS\demo-cobro-system"
   ```
2. Ejecutá el entorno completo (Frontend + Backend):
   ```bash
   pnpm run dev
   ```
3. Abrí en tu navegador:
   * **Frontend:** [http://localhost:5173](http://localhost:5173)
   * **Backend API:** [http://localhost:3001/api/data](http://localhost:3001/api/data)

---

## 🔑 Credenciales de Acceso Demo

En la pantalla de Login tenés un botón de acceso directo o podés ingresar manualmente:

* **Email:** `demo@cobros.com`
* **Contraseña:** `demo123`

*(También está disponible `admin@demo.com` con la misma contraseña `demo123`).*

---

## 📊 Datos Ficticios Precargados

* **15 Alumnos realistas:**
  * 11 Adultos (Planes Libre $35.000 y 3x Semana $28.000).
  * 4 Kids (con tutores asignados, edades y cuotas Kids).
* **Historial de Pagos:**
  * Mes actual (Noviembre 2026): 9 pagados y 6 pendientes para demostrar el semáforo y los filtros.
  * Mes anterior (Octubre 2026): 13 pagados y 2 con deuda histórica para mostrar la ficha de alumno.
* **Actividades recientes:** Eventos de cobro y registro ya cargados en el Dashboard.
* **Archivo de Excel para Importar en Vivo:**
  * En la raíz de este proyecto tenés el archivo `alumnos_demo.xlsx` listo para subir desde la pestaña *"Registrar Alumno" -> "Importar Excel"*.

---

## 🤖 Simulación Fluida de WhatsApp (YCloud)

* Si no colocás ninguna API Key de YCloud, el sistema opera en **Modo Simulado Automático**: al hacer clic en *"Enviar cobro"* o *"Enviar recordatorios"*, simula el envío con éxito y registra la actividad, permitiendo hacer la demo sin gastar saldo ni generar errores de conexión.
* Si cargás una API Key real en **Configuración**, enviará WhatsApps reales mediante la API oficial.

---

## 🔄 Cómo Reiniciar los Datos de la Demo

Si durante una prueba creás, modificás o borrás alumnos y querés volver al estado inicial:

1. **Desde la aplicación:** En el menú lateral (Sidebar), hacé clic en el botón amarillo **"🔄 Reiniciar Demo"**.
2. **Desde la terminal:**
   ```bash
   pnpm run seed
   ```
