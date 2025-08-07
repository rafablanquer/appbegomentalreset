# Modal de Advertencia - Primera Visita

## Descripción
Este modal se muestra automáticamente la primera vez que un usuario visita la aplicación. Incluye un aviso importante sobre que la aplicación no sustituye la atención profesional especializada.

## Funcionamiento
- ✅ Se muestra automáticamente en la primera visita
- ✅ Se guarda el estado en localStorage
- ✅ No se vuelve a mostrar en visitas posteriores
- ✅ Diseño responsive y accesible

## Para Desarrolladores

### Probar el modal nuevamente
En la consola del navegador, ejecuta:
```javascript
window.resetWarningModal()
```

Esto borrará la bandera de primera visita y recargará la página para mostrar el modal nuevamente.

### Estructura de archivos
```
src/
├── components/
│   ├── WarningModal/
│   │   └── index.tsx          # Componente del modal
│   └── FirstVisitWrapper/
│       └── index.tsx          # Wrapper que maneja la lógica
├── hooks/
│   └── useFirstVisit.ts       # Hook para manejar primera visita
└── app/(frontend)/
    └── layout.tsx             # Layout principal (integrado aquí)
```

### Personalización
Para modificar el contenido del modal, edita el archivo:
`src/components/WarningModal/index.tsx`

### localStorage Key
La aplicación utiliza la clave `neurodespertar-first-visit` en localStorage para recordar si el usuario ya vio el modal.