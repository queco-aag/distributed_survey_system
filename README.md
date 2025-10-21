# distributed_survey_system
Sistema distribuido de encuestas

## Estructura del Proyecto

Este proyecto consta de dos partes principales:

1. **Backend** - API REST desarrollada con Spring Boot (Java)
2. **Frontend** - Aplicación web desarrollada con React y PrimeReact

## Backend

El backend es una aplicación Spring Boot que proporciona una API REST para gestionar encuestas, usuarios, empresas y departamentos.

### Tecnologías
- Java 17
- Spring Boot 3.1.5
- Spring Security con JWT
- Spring Data JPA
- Base de datos H2 (en memoria)

### Ejecutar el Backend

```bash
mvn clean install
mvn spring-boot:run
```

El servidor se ejecutará en `http://localhost:8080`

## Frontend

El frontend es una aplicación React moderna construida con Vite y PrimeReact como framework de componentes UI.

### Tecnologías
- React 19
- Vite
- PrimeReact
- React Router
- Axios

### Ejecutar el Frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

Para más detalles sobre el frontend, consulta el [README del frontend](frontend/README.md).

## Características

- Autenticación de usuarios con JWT
- Gestión de encuestas con múltiples tipos:
  - **OPEN**: Encuesta abierta con fecha inicio y fecha fin
  - **PRESELECTION**: Encuesta a preselección con fecha inicio y fecha fin
  - **TEST**: Test o examen con respuestas correctas para evaluar conocimientos
  - **EXAM**: Examen formal con respuestas correctas y sistema de calificación
- Gestión de usuarios, empresas y departamentos
- Interfaz moderna y responsive con PrimeReact
- API REST segura
- Sistema de respuestas correctas para encuestas de tipo TEST y EXAM

## Licencia

Ver archivo LICENSE para más detalles.
