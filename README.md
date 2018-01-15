# Microservicios
## Qué son los Microservicios?
Microservicios, también conocidos como la arquitectura de microservicios, es un estilo de arquitectura que estructura una aplicación como una colección de servicios débilmente acoplado, en la cual se implementan las capacidades del negocio. Esta arquitectura nos permite entregar y desplegar continuamente aplicaciones grandes y complejas. Tambíen permite a la organización actualizar/evolucionar sus stack de tecnologías.

## Características
Un microservicio se compone de distintivas características que lo hacen único, de las cuales se destacan las 6 principales:

### 1. Alta Cohesión
Así como el título lo meciona, existe una relación estrecha entre los mismos. Los microservicios tienen un único enfoque y responsabilidad, esto se basa bajo el principio [SOLID](https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
* S - Single responsability principle
* O - Open/Close Principle
* L - Liskov substitution principle
* I - Interface segregation Principle
* D - Dependency inversion principle

Además, cada microservicio representa una razón/motivo, ya sea por una función del negocio o el dominio del negocio. Cabe agregar también que se trabaja con los principios de encapsulación [OOP](https://anampiu.github.io/blog/OOP-principles/)

* Encapsulación
* Abstracción
* Herencia
* Poliformismo

Finalmente, el código debe ser fácilmente reescribible. Todo esto para responder a la escalabilidad, flexibilidad, y confiabilidad entregada por la arquitectura.

### 2. Autonomo
Un microservicio autonomo por definición se refiere a que es independiente, débilmente acoplado, respeta contratos e interfaces, independientemente cambiable y desplegable, compatible con versiones anteriores, y que permita el desarrollo concurrente.

### 3. Dominio del negocio centrado
Esto hace mención que los microservicios representan funciones del negocio, esto a su vez requiere que las funcionalidades deben estan correctamente divididas entre los dominios definidas por el alcance del negocio, se identifican limites en ellas, por lo que esto genera que sean responsivas a los cambio del negocio. Comúnmente estas prácticas están asociadas al contexto de [DDD](https://devexperto.com/domain-driven-design-1/)

### 4. Flexibilidad
La capacidad de aceptar el fallo, esto sea por otro servicio, una especifica conexión, o un sistema externo

## Beneficios
Los beneficios del uso de esta arquitectura son muchos, pero los principales a destacar son los siguientes:

* Bajos tiempos de desarollo
* Seguro y rápido despliegue
* Permite actualizaciones frecuentes
* Partes intercambiables - Desacopladas
* Seguro
* Mayor tiempo de actividad (Uptime)
* Rápida resolución de problemas
* Altamente escalable y mejor desempeño
* Mejor adueñamiento y conocimiento
* Técnología correcta
* Permite equipos distribuidos

