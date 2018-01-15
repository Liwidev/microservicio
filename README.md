# Microservicios

## Qué son los Microservicios?
Microservicios, también conocidos como la arquitectura de microservicios, es un estilo de arquitectura que estructura una aplicación como una colección de servicios débilmente acoplado, en la cual se implementan las capacidades del negocio. Esta arquitectura nos permite entregar y desplegar continuamente aplicaciones grandes y complejas. Tambíen permite a la organización actualizar/evolucionar sus stack de tecnologías.

## Características
Un microservicio se compone de distintivas características que lo hacen único, de las cuales se destacan las 6 principales:

### 1. Alta Cohesión
Así como el título lo meciona, existe una relación estrecha entre los mismos. Los microservicios tienen un único enfoque y responsabilidad, esto orientando bajo el principio [SOLID](https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
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

### 2. Autónomo
Un microservicio autónomo por definición se refiere a que es independiente, débilmente acoplado, respeta contratos e interfaces, independientemente cambiable y desplegable, compatible con versiones anteriores [versionamiento semántico](https://semver.org/), y que permita el desarrollo concurrente.
* Débilmente acoplado
* Respeta contrato e interfaces
* Independientemente cambiable
* Independientemente desplegable
* Compatibilidad con versiones anteriores
* Desarrollo Concurrente

### 3. Dominio del negocio centrado
Esto hace mención que los microservicios representan funciones del negocio, esto a su vez requiere que las funcionalidades deben estan correctamente divididas entre los dominios definidas por el alcance del negocio, se identifican límites en ellas, por lo que esto genera que sean responsivas a los cambio del negocio. Comúnmente estas prácticas están asociadas al contexto de [DDD](https://devexperto.com/domain-driven-design-1/)
* Servicios representan funciones del negocio
* Alcance del servicio
* Identificar límites entre dominios
* Cambiar código si es necesario
* Responsivo a cambios de negocio
* Ligado al contexto DDD

### 4. Flexibilidad
La capacidad de aceptar el fallo, esto sea por otro servicio, una especifica conexión, o un sistema externo. Las capacidades de degradar funcionalidad, como de definir funcionalidades por defecto en caso de fallo, con ello se debe tener la definición de los tipos de falla (Excepciones, retrazos, o indisponibilidad). Además la generación de multiples instancias (escalabilidad horizontal).
* Aceptar Fallo
* Degradar funcionalidades
* Funcionalidades por defecto
* Instancias múltiples
* Tipos de falla
* Problemas de Red
* Validación de entradas

### 5. Observable
El sistema de salud del microservicio, el reporte del estatus,  los registros y errores debe existir mediante un sistema centralizado de registros/monitoreo. Todo esto para las transacciones distribuidas, la resolución rapida de problemas, al tener rápidos despliegues implica retroalimentación, data usada para la capacidad de planiamiento, data usada para escalamiento, saber que es lo que es de verdad usado, y el monitoreo de la data del negocio.
* Sistema de salud
* Monitoreo Centralizado
* Registro Centralizado

### 6. Automatización
Es la aplicación de procedimiento automáticos en la realización de un proceso, en esta caso proveer de herramientas de testing, rápida retroalimentación y despliegue. Todo con el objetivo de apoyar el sistema distribuido, la generación de multiples instacias de servicios, la eliminación del testing y despliegue manual debido a sus altos tiempos de consumo.
* Herramientas para reducir Testing
* Herramientas para proveer rápido feedback
* Herramientas para proveer rápido despliege

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

## Ejemplo
En el siguiente apartado se mostrará código de ejemplo de la definición básica de un Microservicio, la cual se definirán los siguientes puntos clave:

* Instalación de Librerías
* Configuraciones
* Servidor
* API
* Caché - Redis
* Base de datos - MongoDB
* Consultas Request
* Pruebas Unitarias y Cobertura

Además cabe destacar que todo el ejemplo implementado esta basado en el lenguaje de programación JavaScript [NodeJS](https://nodejs.org/en/), el cual usa un modelo basado en eventos, no-bloqueante I/O que es de bajo peso y eficiente. Esta se apoya tambien del repositio de paquetes [NPM](https://www.npmjs.com/), el ecosistema mas grande de librerias de código abierto en el mundo.

### Instalación de Librerías
La siguiente línea de codigo nos permitirá la instalación de la librería que requiramos, en caso que querramos guardar esta librería dentro de nuestros paquetes de producción utlizaremos el flag --save, y en el caso que sólo lo requiramos durante el proceso de desarrollo utilizaremos del flag --save-dev.

```
npm install (--save | --save-dev) <libreria-a-instalar>
```

### Configuraciones
Parte de las definiciones para este ejemplo, se definió un archivo de configuración para todas las funcionalidades presentadas, de tal forma este ejemplo puede ser configurado rápidamente a las configuraciones propias para su uso.

```javascript
const optionsTwitter = {
  consumer_key: 'YovoeLr********pmTwW7l',
  consumer_secret: 'uUieUlo6************************lHcwECf',
  token: '3544111******************************2FPGnanIj',
  token_secret: 'J8gJmr******************************D76kae',
  url: 'https://api.twitter.com/1.1/search/tweets.json'
}

const optionsRedis = {
  port: 11074,
  host: 'redis-**********************.com',
  duracion: 10,
  password: 'test'
}

const optionsMongo = {
  urlMongoDB: 'mongodb://test:test@***************/demobech',
  db: 'dbtest',
  collection: 'ctest'
}
```

### Servidor
El servidor servidor consta del uso de una dependencia popularmente conocida dentro de NodeJS, [Express](https://www.npmjs.com/package/express), esta librería nos otorga la manera mas rápida de inicializar un servidor.

A este servidor de prueba se le dió las siguientes caracteristicas, el uso de Apis, el bodyparser a json de manera nativa y un puerto en el cual este levantará una vez ejecutado.

```javascript
const start = () => {
  return new Promise((resolve) => {
      app.use(bodyParser.json())
      require('../api/api')(app);
      const server = app.listen(optionsExpress.port, () => {
        console.log("Servidor ejecutandose en el puerto: " + optionsExpress.port);
        resolve(server);
      })
  })
}
```
### Api - Application Programming Interface
Como se mencionó en el servidor, utilizaremos de una Api (Interfaz de programación de aplicaciones) la cual dentro de la librería express viene ya la opción de utilizar de esta capacidad. La cual nos permitirá presentar una interfaz para la comunicación con el microservicio por medio de REST.

```javascript
  app.get('/heroe/:heroe', (req, res) => { getHeroe(req, res) });
  app.get('/twits/:heroe', (req, res) => { getTwits(req, res) });
  app.get('/heroes', (req, res) => { getAllHeroes(req, res) });

  app.get('/*', (req, res) => {
    res.send('Bienvenido al ejemplo');
  });
```

### Caché - Redis
Una de las recomendaciones más usadas actualmente para el manejo de data, es el cacheo de las mismas, es decir, almacenar en memoria data. [Redis](https://redis.io/) es un producto de código abierto que nos permite el uso de estas funcionalidades de cacheo, permitiendonos almacenar todo tipo de información y en muchas estructuras distintas por el tiempo que estimemos necesario.

Los metodos creados para este ejemplo fueron 3:

#### Creación del cliente Redis
Inicialización base para la creación de cliente Redis, en el cual entregamos el host y el puerto donde este se encuentra. Posteriomente a la generación de cliente nos autenticamos con la clave que se nos provee.
```javascript
const cache = () => (new Promise((resolve, reject) => {
    if (clienteRedis) {
        console.log('Redis - Cacheado');
        return resolve(true);
    } else {
        console.log('Redis - Real');
        clienteRedis = redis.createClient(optionsRedis.port, optionsRedis.host);
        clienteRedis.auth(optionsRedis.password, function () {
            console.log('Cliente autenticado existosamente');
        });
        clienteRedis.on('connect', function () {
            return resolve(false);
        })
    }
}));
```

#### Obtención de valores en Caché
Este sencillo código nos retorna el valor encontrado en caché con la llave proporsionada y en caso contrario nos retornar un error, todo esto en forma de promesa.
```javascript
const getFromCache = (id) => {
    return new Promise((resolve, reject) => {
        cache().then(
            () => {
                clienteRedis.get(id, function (err, value) {
                    (err) ? reject(err) : resolve(value);
                });
            }
        );
    });
}
```

#### Insertar valores en Caché
Este sencillo código nos guarda el valor deseado en caché con la llave que definamos y en caso contrario nos retornar un error, todo esto en forma de promesa.
```javascript
const setInCache = (id, valor) => {
    return new Promise((resolve, reject) => {
        cache().then(
            () => {
                clienteRedis.set(id, valor, 'EX', optionsRedis.duracion, function (err, value) {
                    (err) ? reject(err) : resolve(value);
                });

            }
        )
    });
}
```
### Base de datos - MongoDB
Todo microservicio debería de tener un repositorio propio para el manejo de data. Esta definición nace apartir del principio de que los MS deben de ser lo más desacoplado posible. Es así como para este ejemplo se utiliza de [MongoDB](https://www.mongodb.com/es) una base de datos no relacional (NoSQL), la cual permite a empresas ser más ágiles y escalables.

Los metodos creados para este ejemplo fueron 3:

#### Creación del cliente Mongo
En el siguiente código se muestra la generación del cliente Mongo con el uso de la configuración previamente definida, y en el caso que exista el cliente, se utiliza el cliente en cache.
```javascript
const mongoDB = () => (new Promise((resolve, reject) => {
  if (clienteMongoDB) {
    console.log('MongoDB- Cacheado');
    return resolve();
  } else {
    console.log('MongoDB- Real');
    MongoClient.connect(optionsMongo.urlMongoDB, (err, database) => {
      if (err) {
        return reject(err);
      } else {
        clienteMongoDB = database.db(optionsMongo.db);
        clienteMongoDB = clienteMongoDB.collection(optionsMongo.collection)
        return resolve();
      }
    });
  }

}));
```

#### Consulta a BD simple
Como dice el título de este apartado, una simple consulta en la BD en la cual se buscan todos los nombres que sean iguales a lo solicitado, en caso de encontrar un error este lo controla y envía un error.
```javascript
const getHeroe = (req, res) => {
  mongoDB().then(
    () => {
      const regex = new RegExp(["^", req.params.heroe, "$"].join(""), "i");
      clienteMongoDB.find({ "name.first": regex }).toArray(function (err, docs) {
        if (err) {
          res.status(500).send({ 'error': 'Un error ha ocurrido', 'info': err });
        } else {
          res.send(docs);
        }
      });
    }
  ).catch(
    (err) => {
      res.status(500).send(err);
    }
  );

}
```

#### Consulta a BD simple con Caché
Esta consulta ya un poco mas compleja, ya que utilizamos del Caché (Redis) en caso que se encuentre cacheado. Además cabe destacar que esta funcionalidad y como las otras fue desarrollada con promesas, pero con la diferencia que esta es utilizada con el metodo de encadenamiento de promesas, así obetener un código más limpio.
```javascript
const getAllHeroes = (req, res) => {
  getFromCache('heroes').then(
    (response) => {
      if (response) {
        console.log('Datos - CACHE');
        return new Promise((resolve, reject) => resolve({ result: JSON.parse(response) }));
      } else {
        console.log('Datos - REAL');
        return mongoDB()
      }
    }
  ).then(
    (response) => {
      if (clienteMongoDB && !response) {
        return new Promise((resolve,reject) => {
          clienteMongoDB.find({}).toArray(function (err, docs) {
            if (err) {
              res.status(500).send({ 'error': 'Un error ha ocurrido', 'info': err });
            } else {
              setInCache('heroes', JSON.stringify(docs));
              resolve(docs);
            }
          })
        });
      } else {
        return new Promise((resolve, reject) => resolve(response.result));
      }
    }
    ).then(
    (response) => {
      res.send(response);
    }
    ).catch(
    (err) => {
      res.status(500).send({ error: err });
    }
    );
}
```

### Consultas Request
Para este módulo se utilizó de una librería de NPM llamada [request-promise-native](https://github.com/request/request-promise-native), la cual nos permite utilizar de todas las funcionalidades de la librería original [request](https://www.npmjs.com/package/request), pero en este paso en forma de promesa.

En el siguiente trozo de código se hace la definición del query a hacer la consulta, en este caso a la [API de twitter](https://developer.twitter.com/). Por lo que para ello requeriremos de la oauth entregada por twitter y la consulta.
```javascript
const getTwits = (req, res) => {
    const query = '?q=from%3A' + req.params.heroe + '%20OR%20%23' + req.params.heroe;
    const url = optionsTwitter.url+''+query;

    (request.get({ url: url, oauth: optionsTwitter, json: true })).then(
        (result) => {
            res.send({ status: 200, search: req.params.heroe, result: result })
        }
    ).catch(
        (err) => {
            res.status(500).send({ status: 500, search: req.params.heroe, err: err })
        }
        )

}
```

### Pruebas Unitarias y Cobertura
En este último apartado se mencionarán las librerías utilizadas para la correcta implementación de las pruebas unitarias, esto incluye el uso de mock de librerías.

#### Chai
Esta [librería](https://www.npmjs.com/package/chai) es el core de nuestras pruebas unitarias. Es una librería de afirmaciones que permite que las pruebas sean mucho mas fáciles en el sentido que nos proporsiona muchas afirmaciones para que sean ejecutadas frente a nuestro código.

Junto a esta librería utilizaremos otras 2 liberías para complementar las afirmaciones que podremos hacer, la primera es [chai-http](https://www.npmjs.com/package/chai-http) la cual nos permitirá agregar aserciones de tipo http, y la segunda es [expect-to-be-a-promise](https://www.npmjs.com/package/expect-to-be-a-promise) que nos permite asersiones con promesas.

**Describe** nos da una orientación de que módulo o funcionalidad estamos probando e **it** nos da con más detalle que es lo que debe realizar nuestra prueba a nivel de lo esperado.
```javascript
describe('repositoryRedis', () => {

    it('Deberia retornar promesa de exito al intentar conectar a Redis', () => {
    
    });

});

```
#### Proxyquire
Esta [librería](https://www.npmjs.com/package/proxyquire) esencial para la sobrescribir dependencias durante la ejecución de pruebas, esto no requiere de hacer cambios en nuestro código.

En el siguiente trozo de código se presenta como se sobrescriben los las funcionalidades de la librería de redis:

```javascript
const repositoryRedis = proxyquire('../../repository/repositoryRedis', {
            redis: {
                createClient: (port, host) => {
                    const auth = (txt, callback) => {
                        return callback();
                    }
                    const on = (txt, callback) => {
                        return callback();
                    }
                    const get = (id, callback) => {
                        return callback('', 'test')
                    }
                    return { auth: auth, on: on, get: get }
                }
            }
        });
```
#### Mock Express Response
Esta [librería](https://www.npmjs.com/package/mock-express-response) es un extra a las principales mencionadas, ya que esta nos proporsiona un mock del response esperado para así trabajarlo con la respuesta http que se llegase a entregar. Por lo que solo hay que instanciar un nuevo response.

```
const res = new response();
```
#### Mocha
[Mocha](https://www.npmjs.com/package/mocha) es un framework ejecutado en NodeJS que permite el testing asincrono simple. Estas pruebas mocha se ejecutan de manera serial, permitiendo un reporte flexible y preciso, mientras se mapean los errores obtenidos por cada caso de fallo.
#### Istanbul
La cobertura es una de las maneras mas visuales de verificar que todas las piesas de nuestro código estan siendo ejecutadas y que no hay código basura. [Istanbul](https://www.npmjs.com/package/istanbul) nos genera usualmente un reporte en HTML el cual se podrá visualizar con mayor claridad la cobertura de nuestro código.
