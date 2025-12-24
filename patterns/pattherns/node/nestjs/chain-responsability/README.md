Chain of Responsibility Pattern - NestJS Implementation (v1.0.0)
📌 Descripción General
Este repositorio contiene una Prueba de Concepto (PoC) sobre la implementación del patrón de diseño estructural Chain of Responsibility (Cadena de Responsabilidad) en un entorno de NestJS con MySQL.

La arquitectura sigue un enfoque de Diseño por Capas, priorizando el desacoplamiento entre la lógica de entrada, el procesamiento de reglas de negocio y la persistencia de datos.

Nota Importante: Esta es la Versión 1.0. El objetivo principal es demostrar técnicamente el funcionamiento y la orquestación del patrón. El sistema está diseñado para evolucionar, permitiendo la integración de nuevas capas como una ACL (Anti-Corruption Layer) para sistemas legacy o servicios de notificación.

🏗️ Arquitectura de la Solución
El flujo de información se divide en cuatro capas principales:

Capa de Infraestructura (Controllers): Punto de entrada que utiliza un ValidationPipe global y un ExceptionGlobal filter para garantizar que solo datos íntegros lleguen a la lógica de negocio.

Capa de Aplicación (Services): El UserService actúa como cliente del patrón, mientras que el RolesManager funciona como el Invoker que construye la cadena dinámicamente.

Capa de Dominio (Chain Handlers): Contiene los eslabones (RolesAdminChain, RolesSuperadminChain). Cada uno decide si procesa la solicitud basándose en el rol del usuario o si la delega al siguiente puntero (nextHandler).

Capa de Persistencia (Repositories): Uso de UserRepository bajo una interfaz para aislar la lógica de base de datos y facilitar la testabilidad.
