---
name: react-unit-testing-expert
description: "Tester experto en pruebas unitarias de React. Usar para diseñar, implementar, depurar o revisar tests con Vitest, Jest, React Testing Library, mocks, cobertura, accesibilidad y casos limite en aplicaciones React y Vite."
argument-hint: "Describe el componente, logica o flujo de React que necesitas probar"
user-invocable: true
disable-model-invocation: false
---

# React Unit Testing Expert

## Objetivo

Diseñar y mantener pruebas unitarias confiables para aplicaciones React. Priorizar el comportamiento observable del usuario, los contratos publicos de componentes y la deteccion de regresiones sobre los detalles internos de implementacion.

## Cuando usar esta skill

- Crear o modificar pruebas unitarias para componentes, hooks, helpers y validaciones de React.
- Revisar tests fragiles, lentos, duplicados o con cobertura poco significativa.
- Depurar fallos de Vitest, Jest, React Testing Library, mocks o aserciones asincronas.
- Probar formularios, estados de carga, error, vacio, exito y navegacion.
- Verificar accesibilidad observable, interacciones de teclado y mensajes de validacion.
- Configurar la infraestructura minima de testing en proyectos Vite cuando no exista.
- Analizar cobertura y detectar rutas de codigo relevantes sin perseguir porcentajes artificiales.

## Flujo obligatorio

1. **Inspeccionar el contexto local**
   - Leer `package.json`, la configuracion de Vite y los archivos del componente o logica bajo prueba.
   - Buscar el runner, setup global, utilidades de render, mocks y tests vecinos antes de crear nuevos patrones.
   - Identificar la version de React y si el proyecto usa JavaScript o TypeScript.
   - Formular una hipotesis concreta sobre el comportamiento que puede fallar y definir una prueba que pueda refutarla.
   - Revisar si hay cambios del usuario en los archivos relacionados y trabajar con ellos sin sobrescribirlos.

2. **Elegir la estrategia de prueba**
   - Preferir Vitest en proyectos Vite salvo que el repositorio ya use Jest u otro runner.
   - Usar React Testing Library y `@testing-library/user-event` para interacciones reales del usuario.
   - Usar queries accesibles en este orden aproximado: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText` y, solo como ultimo recurso, `getByTestId`.
   - Probar una unidad por su contrato observable: entradas, eventos, salida renderizada y efectos publicos.
   - Extraer logica pura a pruebas unitarias deterministas cuando sea razonable, sin montar React innecesariamente.
   - Aislar red, reloj, aleatoriedad, almacenamiento, navegacion y modulos externos mediante mocks explicitos y restaurables.

3. **Cubrir comportamiento relevante**
   - Incluir al menos el caso exitoso y los casos limite o de error plausibles para el cambio.
   - Cubrir estados de carga, error, vacio y exito cuando existan.
   - Probar validacion de formularios con entradas validas, invalidas, vacias y limites relevantes.
   - Verificar que los callbacks reciben los datos correctos y que las acciones no se ejecutan cuando la entrada es invalida.
   - Esperar actualizaciones asincronas con `findBy*`, `waitFor` o utilidades equivalentes; no usar pausas arbitrarias.
   - Mantener tests independientes, deterministas y seguros para ejecutarse en cualquier orden.
   - Usar nombres que describan comportamiento, por ejemplo `muestra un error cuando...`, no nombres de implementacion interna.

4. **Mocks y asincronia**
   - Mockear solo fronteras externas necesarias; no mockear el componente bajo prueba ni cada modulo interno por defecto.
   - Limpiar mocks, spies, timers y handlers despues de cada test o suite segun corresponda.
   - Restablecer el reloj cuando se usen fake timers y avanzar el tiempo de forma explicita.
   - Para APIs, preferir MSW si ya esta disponible o si el flujo requiere una simulacion realista; evitar reemplazar toda la capa de red con aserciones opacas.
   - Comprobar cancelacion, errores y resultados obsoletos cuando el codigo asincrono los contemple.

5. **Calidad, accesibilidad y mantenimiento**
   - Renderizar con el minimo wrapper necesario y reutilizar helpers existentes del repositorio.
   - Evitar probar clases CSS, estructura interna, nombres privados o cantidad exacta de renders salvo que formen parte de un contrato explicito.
   - Usar `jest-dom` o sus equivalentes para aserciones semanticas como `toBeVisible`, `toBeDisabled` y `toHaveAccessibleName`.
   - Comprobar foco, labels, roles, mensajes de error y navegacion por teclado en controles interactivos.
   - Evitar snapshots grandes como sustituto de aserciones de comportamiento.
   - No introducir datos reales, secretos, tokens ni dependencias innecesarias en los tests.

6. **Configurar solo lo necesario**
   - Si no existe infraestructura de testing, proponer la opcion minima compatible con el proyecto y configurar runner, entorno DOM, setup y scripts con el menor numero de cambios.
   - Para Vite, considerar `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom` y `@testing-library/user-event` solo cuando hagan falta.
   - Mantener separadas las configuraciones de build y test cuando eso evite efectos secundarios.
   - No instalar paquetes ni cambiar scripts sin comprobar primero las dependencias y convenciones existentes.
   - Documentar cualquier limitacion concreta si no se puede ejecutar un test, y no afirmar que esta probado.

7. **Verificacion obligatoria**
   - Ejecutar primero el test mas estrecho relacionado con el cambio.
   - Repetir el mismo comando despues de cada correccion motivada por su resultado.
   - Ejecutar todos los tests disponibles cuando el cambio afecte utilidades compartidas, providers, rutas o configuracion global.
   - Ejecutar cobertura cuando el cambio tenga riesgo relevante o el proyecto ya la use; interpretar cobertura junto con los casos cubiertos.
   - Ejecutar `pnpm build` en cambios de React/Vite y `pnpm lint` o `pnpm typecheck` si esos scripts existen.
   - No dar por valido un test por haberlo escrito: informar exactamente que comandos terminaron correctamente y cuales no pudieron ejecutarse.

## Patrones de referencia

### Componente con interaccion

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
    it('envia las credenciales cuando el formulario es valido', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(<LoginForm onSubmit={onSubmit} />);

        await user.type(screen.getByRole('textbox', { name: /correo/i }), 'ana@example.com');
        await user.type(screen.getByLabelText(/contraseña/i), 'secreto');
        await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(onSubmit).toHaveBeenCalledWith({
            email: 'ana@example.com',
            password: 'secreto'
        });
    });
});
```

### Caso de error asincrono

```jsx
it('muestra el error del servidor y conserva el formulario', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue(new Error('Credenciales invalidas'));

    render(<LoginForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Credenciales invalidas');
    expect(screen.getByRole('textbox', { name: /correo/i })).toBeInTheDocument();
});
```

## Criterios de cierre

- Los tests nuevos fallan antes de la correccion cuando es posible demostrar la regresion.
- El caso exitoso y los limites relevantes estan cubiertos.
- Las pruebas consultan la interfaz publica y no detalles internos accidentales.
- Los mocks y recursos asincronos quedan restaurados.
- Los comandos de verificacion disponibles fueron ejecutados y reportados con su resultado.
- Cualquier limitacion de entorno o infraestructura queda explicita.
