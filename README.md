# 🛒 Athenea-Online - E-Commerce de Tecnología

**Athenea-Online** es una aplicación de e-commerce moderna desarrollada con React y Vite, especializada en productos tecnológicos. El proyecto incluye un catálogo de productos, carrito de compras funcional, integración con APIs externas y una interfaz de usuario moderna y responsive.

---

## 📋 Descripción del Proyecto

Este proyecto es una tienda online completa que permite:
- Navegar por un catálogo de productos tecnológicos
- Buscar productos en tiempo real
- Agregar productos al carrito con selección de color
- Gestionar el carrito (agregar, eliminar, modificar cantidades)
- Ver noticias tecnológicas actualizadas
- Interfaz responsive con diseño moderno

---

## ✨ Características Principales

### 🛍️ Funcionalidades del E-Commerce
- **Catálogo de Productos**: Muestra productos locales + productos de FakeStore API
- **Carrito de Compras**: Sistema completo con Context API de React
- **Búsqueda en Tiempo Real**: Autocompletado con sugerencias
- **Selección de Colores**: Cada producto puede tener múltiples variantes de color
- **Gestión de Cantidades**: Incrementar/decrementar productos en el carrito
- **Cálculo de Total**: Actualización automática del precio total
- **Persistencia de Estado**: El carrito mantiene su estado durante la sesión
- **Vista Detallada de Productos**: Modal con imagen grande y controles mejorados
- **Contador Visual en Footer**: Número animado que muestra productos en el carrito

### 🎨 Interfaz de Usuario
- **Diseño Responsive**: Adaptado para móviles, tablets y desktop
- **Carousel de Imágenes**: Banner rotativo en la página principal
- **Noticias Tecnológicas**: Sección con últimas noticias del sector
- **Navegación Inferior**: Footer con acceso rápido al carrito
- **Sidebar del Carrito**: Panel lateral deslizable para gestionar compras
- **Botones Mejorados**: Footer con mejor visibilidad y efectos hover
- **Modal de Productos**: Vista expandida al hacer click en productos

### 🔌 Integraciones
- **FakeStore API**: Productos de electrónica externos
- **NewsAPI / HackerNews API**: Noticias tecnológicas (configurable)

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1**: Biblioteca principal para la UI
- **Vite 7.1.6**: Build tool y dev server ultrarrápido
- **React Icons 5.5.0**: Librería de iconos
- **Context API**: Gestión de estado global del carrito

### Herramientas de Desarrollo
- **ESLint 9.35.0**: Linter para mantener código limpio
- **@vitejs/plugin-react**: Plugin de Vite para React con Fast Refresh
- **Google Fonts (Orbitron)**: Tipografía personalizada

### APIs Externas
- **FakeStore API**: https://fakestoreapi.com (productos)
- **NewsAPI / HackerNews API**: Noticias tecnológicas

---

## 📁 Estructura del Proyecto

```
athenea-online/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/          # Imágenes de productos
│   │   └── images/      # Imágenes locales de productos
│   ├── components/      # Componentes reutilizables
│   │   ├── Common/      # Componentes comunes (Header, SearchBar)
│   │   ├── Products/    # Componentes de productos (ProductCard)
│   │   ├── Cart/        # Componentes del carrito
│   │   ├── Carousel.jsx # Carrusel de imágenes
│   │   ├── CartSidebar.jsx # Panel lateral del carrito
│   │   ├── FooterNav.jsx   # Navegación inferior
│   │   └── TechNews.jsx    # Sección de noticias
│   ├── Context/         # Context API de React
│   │   └── CartContext.jsx # Contexto global del carrito
│   ├── data/            # Datos locales
│   │   └── products.js  # Productos locales (8 productos)
│   ├── pages/           # Páginas de la aplicación
│   │   └── HomePage.jsx # Página principal
│   ├── services/        # Servicios para APIs externas
│   │   ├── productsApi.js # Servicio de productos (FakeStore)
│   │   └── newsApi.js     # Servicio de noticias
│   ├── styles/          # Archivos CSS
│   │   ├── App.css
│   │   ├── components.css
│   │   ├── CartSidebar.css
│   │   ├── FooterNav.css
│   │   ├── ProductCard.css
│   │   ├── SearchBar.css
│   │   ├── TechNews.css
│   │   └── carousel.css
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada (con CartProvider)
│   └── index.css        # Estilos globales
├── index.html           # HTML principal
├── package.json         # Dependencias y scripts
├── vite.config.js       # Configuración de Vite
├── eslint.config.js     # Configuración de ESLint
└── README.md            # Este archivo
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 16 o superior)
- **npm** o **yarn**

### Pasos de Instalación

1. **Clonar o descargar el repositorio**
   ```bash
   cd athenea-online
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

4. **Compilar para producción**
   ```bash
   npm run build
   ```
   Los archivos optimizados se generarán en la carpeta `dist/`

5. **Previsualizar build de producción**
   ```bash
   npm run preview
   ```

---

## 📦 Pasos para Entregar el Proyecto

### Opción 1: Entrega como Código Fuente

1. **Limpiar archivos innecesarios**
   ```bash
   # Eliminar node_modules (se puede reinstalar)
   rm -rf node_modules
   
   # Eliminar carpeta dist si existe
   rm -rf dist
   ```

2. **Crear archivo comprimido**
   ```bash
   # Desde el directorio padre
   zip -r athenea-online.zip athenea-online/ -x "*/node_modules/*" "*/dist/*" "*/.git/*"
   ```

3. **Incluir documentación**
   - Este README.md
   - Instrucciones de instalación
   - Lista de dependencias (package.json)

### Opción 2: Entrega como Aplicación Compilada

1. **Compilar el proyecto**
   ```bash
   npm install
   npm run build
   ```

2. **Verificar la carpeta dist/**
   - Contiene todos los archivos optimizados
   - Listos para desplegar en cualquier servidor web

3. **Crear archivo comprimido**
   ```bash
   zip -r athenea-online-build.zip dist/
   ```

### Opción 3: Despliegue en Hosting (Recomendado)

**Desplegar en Vercel (Gratis)**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel
```

**Desplegar en Netlify (Gratis)**
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Compilar y desplegar
npm run build
netlify deploy --prod --dir=dist
```

**Desplegar en GitHub Pages**
1. Modificar `vite.config.js` para agregar base path
2. Compilar: `npm run build`
3. Subir carpeta `dist/` a rama `gh-pages`

---

## 📝 Checklist de Entrega

- [ ] Código fuente completo
- [ ] README.md actualizado (este archivo)
- [ ] package.json con todas las dependencias
- [ ] Archivos de configuración (vite.config.js, eslint.config.js)
- [ ] Carpeta src/ con todo el código
- [ ] Carpeta public/ con assets estáticos
- [ ] .gitignore configurado
- [ ] Build de producción funcional (`npm run build`)
- [ ] Aplicación ejecutándose sin errores (`npm run dev`)
- [ ] Documentación de APIs utilizadas

---

## 🔧 Configuración Adicional (Opcional)

### Configurar NewsAPI
Para obtener noticias reales, necesitas una API key gratuita:

1. Registrarse en https://newsapi.org
2. Obtener API key gratuita
3. Editar `src/services/newsApi.js`:
   ```javascript
   const API_KEY = 'tu_api_key_aqui';
   ```

### Variables de Entorno
Puedes crear un archivo `.env` para manejar configuraciones:
```env
VITE_NEWS_API_KEY=tu_api_key
VITE_API_URL=https://fakestoreapi.com
```

---

## 🎯 Funcionalidades Implementadas

✅ **Catálogo de productos** con datos locales y API  
✅ **Sistema de carrito** con Context API  
✅ **Búsqueda en tiempo real** con autocompletado  
✅ **Selección de colores** por producto  
✅ **Gestión de cantidades** en el carrito  
✅ **Cálculo automático** de totales  
✅ **Diseño responsive** para todos los dispositivos  
✅ **Carousel de imágenes** en homepage  
✅ **Sección de noticias** tecnológicas  
✅ **Navegación inferior** con acceso al carrito  
✅ **Sidebar deslizable** para el carrito  

---

## 📊 Datos del Proyecto

- **Nombre**: Athenea-Online
- **Versión**: 0.0.0
- **Tipo**: E-Commerce de Tecnología
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.6
- **Productos Locales**: 8 productos tecnológicos
- **Productos API**: ~6 productos de FakeStore API
- **Total Productos**: ~14 productos disponibles

---

## 👨‍💻 Desarrollo

### Scripts Disponibles

```bash
# Modo desarrollo con hot reload
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

### Agregar Nuevos Productos

Editar `src/data/products.js`:
```javascript
export const products = [
  {
    id: 9,
    name: 'Nuevo Producto',
    description: 'Descripción del producto',
    price: 99999,
    colors: ['Negro', 'Blanco'],
    image: imagenImportada,
  },
  // ...
];
```

---

## 🐛 Solución de Problemas

**Error: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Puerto 5173 en uso**
```bash
# Vite usará automáticamente el siguiente puerto disponible
# O especificar uno manualmente en vite.config.js
```

**Productos de API no cargan**
- Verificar conexión a internet
- La app funciona con productos locales si la API falla

---

## 📄 Licencia

Este proyecto es de uso educativo.

---

## 📞 Contacto

Para consultas sobre el proyecto, referirse a la documentación del código o los comentarios en los archivos fuente.

---

**Desarrollado con ❤️ usando React + Vite**
