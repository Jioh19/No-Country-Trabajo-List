# Trabajo Listo

"Trabajo Listo" fue creado con el propósito de simplificar y agilizar el proceso de búsqueda de servicios. La función principal de la aplicación es brindar una plataforma que permite a los usuarios buscar servicios posteados por profesionales, realizar consultas, contactar al profesional y contratar el servicio.

## Link a la Web
[c16-10-m-node-react.vercel.app](c16-10-m-node-react.vercel.app)

## Links de deploy
  * Frontend: [Trabajo listo](https://trabajo-listo-nc.vercel.app/)
  * Backend: [Trabajo listo backend](https://trabajo-listo.vercel.app/api)
## Tecnologías Utilizadas

### *Frontend*

| **Tecnologías**        |
| ------------- | 
|  Vite.js |
| Tailwind CSS |
| ReactJs | 
| TypeScript  |
|MUI, Material UI|

| **Dependencias**        |
| ------------- | 
|  react-dom |
| react-router-dom |
| Redux | 
| Redux-toolkit  |
|Axios|
|react-toastify|


### *Backend*

| **Tecnologías**    |
| ------------- | 
| NestJs |
| Mongo DB  | 
| Cloudinary|
| TypeScript  |

### *UX/UI*

|**Tecnologías**       |
| ------------- | 
| Figma |
| Adobe illustrator  | 
| Photoshop|

## Características principales
* Registro de cliente-profesional y autenticación.
* Publicación de servicios y visualización de contenido
* Búsqueda y filtrado de servicios
* Consultas y respuestas sobre el servicio entre usuario y profesional
* Contactar al profesional
* Contratar servicio

## Equipo
| **Nombre**        | **ROL**           |
| ------------- | ------------- |
| [Fernando Acosta](https://www.linkedin.com/in/fernando-acosta-172557239/) | Frontend  |
| [Franco Tevez](https://www.linkedin.com/in/franco-tevez-1a985b219/) | Frontend |
| [Valentin Di Geronimo](https://www.linkedin.com/in/digeronimovalentin/)| Frontend  |
| [Piero Sanchez](https://www.linkedin.com/in/sanchezpiero/) | UX/UI  |
| [Harry Yanarico](https://www.linkedin.com/in/harry-yanarico-20802a12b/)  | Fullstack  |
| [Juan Oh](https://www.linkedin.com/in/jioh19/) | Backend |
| [Dario Nicolas Ramos](https://www.linkedin.com/in/dario-nicolas-ramos/) | Backend  |
|Juan Emilio Busalmen  | Team Leader  |


## API Backend documentación

[API DOC](https://insomnia-coral.vercel.app/)


## Vista previa

1. **Inicio de sesión**
    
   ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/37b105d7-7b54-4872-966d-c4d4ec126a4c)

2. **Registro**


    * **Usuario**

      ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/15365c99-31df-4919-aa76-4a744d8c19f3)
    * **Profesional**

      ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/12bc5184-c612-412f-81b8-425a7c99acdd)

3. **Servicios recomendados**

    ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/19eb116e-54d0-4c8b-a198-84fdd77b0d08)

4. **Perfiles**
    * **Cliente**

        ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/3f853a0e-300b-479e-8443-59feafc39b0c)
    * **Profesional**

        ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/52fc6f4f-91b8-4c7e-a03d-2bc6aac2e494)
5. **Editar perfiles y servicios**
    * **Perfil**

        ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/6aa2fceb-d3fe-46bb-b1fa-75317da6d517)

    * **Servicio**
      
      ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/a0e83e5b-a61f-44fd-a63e-985ce06d86df)
6. **Buscador y filtros**

    ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/1e06350c-1bfd-48d8-8095-818f756c1180)


7. **Detalle de servicio**

    * **Imagen**

      ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/3e3212ca-d1e6-4797-8945-a898128e79f2)
    * **Consultas**

      ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/98d5cae6-6fce-4e03-b286-c845d7dcd182)
      ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/c0d6cfea-5ec3-42dc-b039-11b302a38375)

8. **Contactar profesional**

     ![image](https://github.com/No-Country/c16-10-m-node-react/assets/104600953/7dff7f76-589c-4842-9848-38c8f7af7e6b)


## **Organizacion del equipo**

  Utilizamos la metodología ágile y scrum.

  Una vez consolidamos la idea del MVP en grupo, pudimos formar la lista de requisitos para que el sector del backend y UX/UI pudieran empezar a implementar las bases.
  Dividimos las tareas en base a los sprints que eran de una semana cada uno.
  
  * **Funcionalidades del MVP**
      * Registrar cliente o profesional
      * Loguear usuario
      * Crear/Editar/Eliminar servicios
      * Buscar servicios con filtros
      * Ver detalles de servicios 
      * Consultas de cliente a profesional con respuestas
      * Contratar servicio

  * **SPRINT-1**
      * Realizar el diseño estatico de la "main page"
      * Crear formularios de login y registro de usuario
      * Creacion base de datos user y login con deploy
  * **SPRINT-2**
      * Implementar seguridad bcrypt y jwt
      * Agregar servicios recomendados estaticos
      * Implementar login y registro conectando con la base de datos
      * Mostrar/Editar perfil de usuario
      * Formularios de creación de servicios
  * **SPRINT-3**
      * Crear  posts y conexion con frontend
      * Conectar servicios con base de datos
      * Implementar busqueda de servicios con filtros
      * Crear detalles de servicios, agregar consultas y respuestas
      * Traer datos de contacto del profesional
  * **SPRINT-4**
      * Corrección y resolución final de conflictos
      * Reorganización de archivos
      * Creación de la documentación oficial
