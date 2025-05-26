# Uniformación Amazonica
![uniformacion](https://github.com/user-attachments/assets/7275ec87-28c1-415f-adb1-6e6ed763d12f)
<p align="center">
<img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">
</p>

<p align="left">
:white_check_mark: El proyecto Uniformación Amazonica presenta una aplicacion web en donde las personas se pueden registrar como estudiantes y mediante integración con profesores previamente ingresados y coordinadores gestionar la creacion de proyectos y los avances respectivos a los proyectos

Este documento proporciona instrucciones paso a paso para configurar y ejecutar la aplicación ProyectoFinalWeb localmente. Cubre los requisitos previos, la instalación, la configuración del entorno y el acceso inicial a la aplicación.
Para obtener información sobre la arquitectura general del sistema y sus componentes, consulta Descripción general. Para detalles sobre la configuración de autenticación y la gestión de usuarios, consulta Autenticación y Seguridad.
</p>

## Requisitos previos

- `Node.js`: Entorno de ejecución de JavaScript para herramientas de desarrollo en la versión 18.0.0 o superior 
- `npm`: Gestor de paquetes incluido con Node.js, versión **9.0.0** o superior  
- `Git`: Sistema de control de versiones para clonar y administrar el repositorio (se recomienda la última versión)  
- `Cuenta de Firebase`: Requerida para utilizar los servicios backend de autenticación y base de datos  
> ⚠️ La aplicación utiliza características modernas de JavaScript y requiere **Node.js 18 o superior**, tal como se especifica en las dependencias del archivo `package.json`

## Instalación
### 1. Clonar el repositorio
```bash
git clone https://github.com/Niiko235/ProyectoFinalWeb.git
cd ProyectoFinalWeb
```
### Instalar dependencias
La aplicación utiliza npm como gestor de paquetes, con un conjunto completo de dependencias para React, Material UI, Firebase y herramientas de desarrollo
```bash
npm install
```
Esto instalará todas las dependencias listadas en el archivo package.json, incluyendo:
- `React 19`: Framework principal y renderizado del DOM
- `Material UI`: Librería de componentes y sistema de temas  
- `Firebase`: Servicios de autenticación y base de datos Firestore 
- `React Admin`: Framework para la interfaz administrativa
- `React Router DOM`: Enrutamiento del lado del cliente
- `Vite`: Herramienta de construcción y servidor de desarrollo
### Verificar Instalación
Confirma que todas las dependencias se hayan instalado correctamente con el siguiente comando:
```bash
npm list --depth=0
```
## Configuración del entorno
### Configuración de Firebase
La aplicación requiere una configuración de **Firebase** para habilitar la autenticación y el acceso a la base de datos **Firestore**.  
Esta configuración debe ser creada desde la consola de tu proyecto en Firebase e integrada en la aplicación.
### Configuración de la aplicación
El punto de entrada principal de la aplicación se encuentra en main.jsx, en donde este archivo configura lo siguiente:
- `React.StrictMode`: Para advertencias durante el desarrollo  
- `BrowserRouter`: Para el enrutamiento del lado del cliente  
- `Importación de `CSS``: Para estilos y animaciones

La estructura HTML base está definida en el archivo index.html:
Y contiene:
- Configuración del idioma en español (`lang="es"`)  
- Título de la aplicación: **"Uniformación Amazónica"**  
- Referencia al logo: `./src/img/logo uniformacion amazonia.png`  
- Punto de montaje raíz para la aplicación React
  
## Ejecución de la aplicación
### Servidor de desarrollo
Inicia el servidor de desarrollo utilizando **Vite** con el siguiente comando:

```bash
npm run dev
```
## Ejecución de la aplicación
### Servidor de desarrollo
Inicia el servidor de desarrollo utilizando **Vite** con el siguiente comando:
```bash
npm run dev
```
Este comando utiliza el servidor de desarrollo de Vite, tal como está configurado en `package.json`, el cual proporciona:
* Reemplazo de módulos en caliente (Hot module replacement)
* Tiempos de construcción rápidos
* Soporte para módulos ES modernos
* Optimizaciones para desarrollo

**Construcción para Producción**
Para crear una construcción para producción:
```bash
npm run build
```
### Verificaciones de Calidad del Código
Ejecuta ESLint para la validación de la calidad del código:
```bash
npm run lint
```
### Previsualización de la Construcción de Producción
Previsualiza la construcción de producción localmente:
```bash
npm run preview
```
### URL de Desarrollo Predeterminada
Una vez que el servidor de desarrollo se inicie, accede a la aplicación en:
```bash
http://localhost:5173
```
### Primeros Pasos
* Acceder a la Página de Inicio: Navega a la URL de la aplicación para ver la página de inicio pública.
* Registro: Utiliza el formulario de registro para crear una nueva cuenta de usuario.
* Inicio de Sesión: Autentícate con tus credenciales para acceder a las funciones específicas de tu rol.
* Asignación de Roles: Los roles de usuario se gestionan a través de la interfaz administrativa.

### Resolución de Problemas Comunes
#### Conflictos de Puerto
Si el puerto 5173 no está disponible, Vite seleccionará automáticamente el siguiente puerto disponible y lo mostrará en la terminal.
### Conflictos de Dependencias
Asegúrate de tener instalada la versión 18 o superior de Node.js, ya que es un requisito para las dependencias de Firebase (package-lock.json líneas 1076-1077).
### Errores de Construcción
Ejecuta npm run lint para identificar problemas de calidad del código antes de construir la aplicación.

## Autenticación y Seguridad
### Configuración de Firebase

Verifica que la configuración del proyecto de Firebase y las claves API estén correctamente configuradas para la autenticación y el acceso a Firestore.
Para obtener información detallada sobre la configuración de la autenticación y la gestión de roles de usuario, consulta Authentication & Security. Para la configuración y las herramientas del entorno de desarrollo, consulta Development Environment.
Este documento cubre el sistema de autenticación, el modelo de seguridad y los mecanismos de control de acceso implementados en la aplicación ProyectoFinalWeb. El sistema utiliza Firebase Authentication para la gestión de usuarios e implementa un control de acceso basado en roles para asegurar diferentes áreas de la aplicación.
Para obtener información sobre la implementación específica de la protección de rutas, consulta Route Protection. Para detalles sobre los roles y permisos de usuario, consulta User Roles & Permissions.

### Integración con Firebase
La aplicación utiliza Firebase Authentication como su proveedor de autenticación principal, integrado con Firebase Firestore para la gestión de roles de usuario y el almacenamiento de datos.

#### Métodos de Autenticación
El sistema soporta la autenticación por correo electrónico y contraseña con Firebase, incluyendo la funcionalidad de registro e inicio de sesión de usuarios:

* createUserWithEmailAndPassword: Crear nuevos usuarios para registrar nuevas cuentas de usuario
* signInWithEmailAndPassword: Iniciar sesión de usuarios existentes y autenticar usuarios ya registrados
* signOut: Cerrar sesiones de usuario y finalizar las sesiones activas de los usuarios
* onAuthStateChanged: Monitorizar los cambios en el estado de autenticación	y rastrear si un usuario ha iniciado o cerrado sesión

### Gestión del Estado
El contexto de autenticación mantiene tres elementos de estado críticos:
* user: El objeto del usuario actual de Firebase o null.
* loading: Un valor booleano que indica si se está resolviendo el estado de autenticación.
* rol: El rol del usuario recuperado de Firestore ("coordinador", "profesor" o "estudiante").
  
El estado de autenticación se monitorea continuamente utilizando el listener onAuthStateChanged de Firebase, el cual actualiza automáticamente el contexto cuando los usuarios inician o cierran sesión.

### Control de Acceso Basado en Roles
El sistema implementa un sistema de control de acceso basado en roles de tres niveles, donde los roles de usuario se almacenan en Firestore y se recuperan durante la autenticación.
* coordinador: Acceso completo al sistema, gestión de proyectos y usuarios.
* profesor:	Creación y gestión de proyectos, asignación de estudiantes.
* estudiante: Acceso de solo lectura a los proyectos asignados.

## Interfaces de Usuario

Este documento proporciona una visión general de las interfaces de usuario disponibles en la aplicación ProyectoFinalWeb, incluyendo tanto las interfaces públicas como las protegidas. Cubre los tipos de interfaz, la estructura de navegación y los patrones de acceso basados en roles que determinan qué usuarios pueden acceder a partes específicas del sistema.
Para obtener información detallada sobre la autenticación y la gestión de roles, consulta Authentication & Security. Para detalles de implementación de componentes de interfaz individuales, consulta las subsecciones: Public Pages, Student Dashboard, Teacher Dashboard y Admin Panel.

## Tipos de Interfaz y Niveles de Acceso
La aplicación proporciona dos categorías principales de interfaces de usuario, cada una sirviendo a diferentes grupos de usuarios y requisitos de acceso:

### Interfaces Públicas
Las interfaces públicas son accesibles a todos los usuarios, independientemente de su estado de autenticación. Estas incluyen la página de inicio, el formulario de inicio de sesión y el formulario de registro. El sistema redirige automáticamente a los usuarios autenticados desde estas páginas a su panel de control correspondiente.

### Interfaces Protegidas
Las interfaces protegidas requieren autenticación y permisos de rol específicos. El sistema proporciona tres experiencias de panel de control distintas basadas en los roles de usuario: coordinador (administrador), profesor y estudiante.
### Navegación y Estructura de Rutas
La aplicación utiliza React Router para la navegación del lado del cliente con control de acceso basado en roles implementado a través de componentes de protección de rutas.

## Lógica de Protección de Rutas Públicas
El componente PublicRoute asegura que los usuarios autenticados no puedan acceder a páginas públicas como el inicio de sesión o el registro, redirigiéndolos automáticamente a su panel de control correspondiente según su rol.
### Control de Acceso a Rutas Protegidas
Cada ruta protegida especifica allowedRoles (roles permitidos) que determinan qué roles de usuario pueden acceder a la interfaz:
```bash
Ruta	        Componente	        Roles Permitidos	Propósito
/admin/*	    AdminPanel	        ['coordinador']	    Administración completa del sistema
/docente/*	    DocenteDashboard	['profesor']	    Gestión de proyectos por parte del profesor
/estudiante/*	EstudianteDashboard	['estudiante']	    Visualización de proyectos por el estudiante
```

## Páginas Públicas

<p align="center">
    :house:Home:house:
</p>
![Pagina Publica](https://github.com/user-attachments/assets/e46e532c-a032-41e9-8890-80b184b12f55)

Este documento cubre las páginas de acceso público en la aplicación ProyectoFinalWeb que están disponibles para usuarios no autenticados. Estas páginas gestionan la experiencia inicial del usuario, la creación de cuentas y el punto de entrada de autenticación.
Las páginas públicas constan de tres componentes principales: la página de inicio (Home), la página de inicio de sesión (Inicio) y la página de registro (Registro). Para obtener información sobre las interfaces de usuario autenticadas, consulta Student Dashboard, Teacher Dashboard y Admin Panel. Para detalles sobre el mecanismo de protección de rutas, consulta Route Protection.
<p align="center">
    :unlock:Login:unlock:
</p>
![Captura de pantalla 2025-05-25 215206](https://github.com/user-attachments/assets/db8ef69c-46e5-4cf3-b805-b61bf06d94bb)

<p align="center">
    :lock:Registre:lock:
</p>
![Captura de pantalla 2025-05-25 215503](https://github.com/user-attachments/assets/adf1c61c-aebf-4e2e-9b63-c82a897999d4)

### Descripción General de las Páginas Públicas
La aplicación proporciona tres páginas públicas que forman la experiencia del usuario no autenticado:
```bash
Componente	    Ruta	    Propósito
Landing	        /	        Página de bienvenida con opciones de navegación
Login	        /login	    Formulario de autenticación de usuario
Register	    /register	Creación de nuevas cuentas de usuario
```

## Panel de Control del Estudiante

El Panel de Control del Estudiante proporciona una interfaz de solo lectura para los usuarios con el rol de estudiante para ver los proyectos a los que han sido asignados. Este panel implementa un control de acceso basado en roles y muestra la información del proyecto a través de una interfaz simplificada construida sobre el framework React Admin.
Para las capacidades administrativas de gestión de proyectos, consulta Admin Panel. Para las funciones de creación y gestión de proyectos por parte del profesor, consulta Teacher Dashboard. Para detalles sobre la autenticación y la asignación de roles, consulta Authentication & Security.

### Descripción General de la Arquitectura
El Panel de Control del Estudiante sigue una arquitectura en capas que integra la autenticación, la obtención de datos y la presentación de la interfaz de usuario a través de los componentes de React Admin.

## Panel de Control del Profesor
El Panel de Control del Profesor proporciona capacidades de gestión de proyectos para usuarios con el rol de profesor dentro del sistema de gestión de proyectos educativos. Esta interfaz permite a los profesores crear, editar y gestionar sus propios proyectos, así como asignar estudiantes a los equipos de proyecto.
Para obtener información sobre las capacidades de visualización de proyectos por parte de los estudiantes, consulta Student Dashboard. Para las capacidades administrativas completas, incluyendo la gestión de usuarios, consulta Admin Panel. Para detalles sobre el sistema de autenticación subyacente, consulta Authentication & Security.

### Descripción General del Sistema

El Panel de Control del Profesor se implementa como una interfaz basada en React Admin que proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) específicamente limitadas a los proyectos propiedad del profesor autenticado. El sistema integra Firebase Firestore para la persistencia de datos e implementa el filtrado de datos basado en roles para garantizar que los profesores solo puedan gestionar sus propios proyectos.

## Panel de Administración
El Panel de Administración proporciona una interfaz administrativa completa para los usuarios con el rol de coordinador, ofreciendo capacidades completas de gestión del sistema, incluyendo la supervisión de proyectos, la gestión de usuarios y las operaciones CRUD en todo el sistema. Esta interfaz está construida utilizando el framework React Admin y proporciona el nivel más alto de acceso dentro de la aplicación.
Para obtener información sobre otras interfaces de usuario, consulta Student Dashboard (4.2) y Teacher Dashboard (4.3). Para detalles sobre el sistema de autenticación y roles que controla el acceso a este panel, consulta Authentication & Security (3).

### Descripción General de la Arquitectura
El Panel de Administración se implementa como una aplicación React Admin que envuelve múltiples interfaces de gestión de recursos. La estructura del componente principal integra la autenticación, la tematización y la gestión de recursos en una experiencia administrativa unificada.
