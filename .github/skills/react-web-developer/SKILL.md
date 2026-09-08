---
name: react-web-developer
description: "Desarrollador web experto en React moderno y Vite. Usar para crear, modificar, depurar o revisar componentes, paginas, rutas, formularios, estado, accesibilidad, rendimiento y estilos en aplicaciones React. Aplica practicas actuales, testing obligatorio y verificacion antes de dar por terminada cualquier tarea."
argument-hint: "Describe la funcionalidad React que necesitas implementar o revisar"
user-invocable: true
disable-model-invocation: false
---

# React Web Developer

## Objetivo

Implementar funcionalidades web en React con cambios pequenos, mantenibles, accesibles y verificables. Mantener las convenciones del repositorio y evitar introducir dependencias o abstracciones sin necesidad.

## Cuando usar esta skill

- Crear o modificar componentes, paginas, layouts y rutas React.
- Implementar formularios, validaciones, estados de carga, errores y estados vacios.
- Integrar APIs, autenticacion, navegacion o persistencia del lado cliente.
- Mejorar accesibilidad, rendimiento, responsive design o experiencia de usuario.
- Depurar regresiones y revisar implementaciones frontend.

## Flujo obligatorio

1. **Inspeccionar el contexto local**
   - Leer `package.json`, la configuracion relevante y los archivos directamente relacionados.
   - Identificar la version de React, el bundler, el router, el sistema de estilos y los scripts disponibles.
   - Buscar patrones existentes antes de crear helpers, componentes o convenciones nuevas.
   - Formular una hipotesis concreta sobre el flujo que controla el comportamiento y definir una comprobacion barata que pueda refutarla.

2. **Definir el cambio**
   - Mantener el alcance limitado a la funcionalidad solicitada.
   - Preferir componentes pequenos, responsabilidades claras y datos fluyendo de forma explicita.
   - No agregar `useMemo` o `useCallback` por defecto; usarlos solo cuando exista una razon medible o una convencion del proyecto.
   - Evitar efectos para estado derivado. Mantener la logica derivable fuera de `useEffect` cuando sea posible.
   - Gestionar estados de carga, error, vacio y exito cuando la interfaz los necesite.

3. **Implementar con practicas modernas**
   - Usar componentes funcionales, hooks y APIs compatibles con la version instalada de React.
   - Mantener JSX legible y extraer validaciones, transformaciones y handlers complejos a funciones con nombres descriptivos.
   - Usar keys estables en listas y evitar usar el indice si existe un identificador real.
   - Mantener actualizaciones de estado inmutables y evitar mutaciones de props o estado.
   - Para actualizaciones no urgentes, considerar `startTransition` o `useDeferredValue` solo cuando resuelvan un problema real de responsividad.
   - Respetar la arquitectura, el router, los estilos y los componentes ya existentes.

4. **Cuidar accesibilidad y seguridad**
   - Asociar labels con controles, conservar foco visible y usar HTML semantico.
   - Exponer errores de formularios de forma comprensible y con atributos ARIA cuando corresponda.
   - Garantizar navegacion basica por teclado y estados interactivos distinguibles sin depender solo del color.
   - No usar `eval`, `innerHTML`, `dangerouslySetInnerHTML` ni renderizar contenido no confiable como HTML.
   - No exponer secretos, tokens, credenciales ni informacion sensible en el cliente, logs o mensajes de error.
   - Validar entradas del usuario y tratar las validaciones del cliente solo como una ayuda de UX, no como control de seguridad del servidor.

5. **Escribir o actualizar tests antes de cerrar**
   - Revisar primero los tests vecinos y el runner configurado.
   - Para logica pura, agregar tests unitarios deterministas.
   - Para componentes, probar comportamiento observable del usuario: interaccion, estados, validacion, accesibilidad y callbacks; evitar probar detalles internos.
   - Para rutas o flujos importantes, agregar una prueba de integracion o E2E si el repositorio tiene la herramienta disponible.
   - Cubrir al menos el caso exitoso y los casos limite o de error relevantes al cambio.
   - Si no existe infraestructura de testing, configurar la opcion minima compatible con el proyecto o dejar documentada la limitacion concreta; nunca afirmar que el cambio esta probado sin ejecutar una comprobacion real.

6. **Ejecutar la verificacion obligatoria**
   - Ejecutar primero el test mas estrecho relacionado con el cambio.
   - Ejecutar todos los tests disponibles cuando el cambio afecte comportamiento compartido.
   - Ejecutar el build de produccion, normalmente `npm run build`, como comprobacion minima para cambios de React/Vite.
   - Ejecutar lint, typecheck o format check si existen scripts para ello.
   - Para cambios visuales o de flujo, verificar en navegador con la herramienta disponible y revisar al menos un viewport movil y uno de escritorio.
   - No dar la tarea por terminada si una comprobacion falla. Corregir la causa, repetir la misma comprobacion y solo despues ampliar la validacion.

7. **Cerrar con evidencia**
   - Resumir los archivos y comportamientos modificados.
   - Enumerar los comandos de testing, build, lint o typecheck ejecutados y su resultado.
   - Mencionar de forma explicita cualquier limitacion, test omitido o riesgo residual.
   - No presentar como exitoso un test que no se haya ejecutado.

## Criterios de calidad

- La implementacion sigue los patrones del repositorio y evita cambios no relacionados.
- La UI funciona con teclado, tiene estructura semantica y comunica errores y estados.
- Los efectos secundarios tienen dependencias correctas y limpieza cuando corresponde.
- Las operaciones asincronas contemplan carga, error, cancelacion o estados obsoletos cuando aplique.
- Los tests verifican comportamiento observable y cubren regresiones plausibles.
- El build y las comprobaciones disponibles terminan correctamente antes de cerrar la tarea.

## Comandos de referencia

Detectar los scripts con `npm run`. Usar los comandos disponibles del proyecto, por ejemplo:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

No ejecutar comandos que no existan solo para llenar un checklist. Si un comando no esta definido, usar la alternativa equivalente disponible y reportarla.
