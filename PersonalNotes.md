### **Desarrollo ágil. No te obsesiones. No seas inseguro** (Aplica a todo momento)

- _Desarrolla Ágilmente_. Trabaja de tosco a fino. Hacé las cosas de forma directa y simple aunque no sea lo más eficiente ni lo más elegante. Después volvés a pulir detalles con una mejor visión. No trabajes las cosas de forma fina desde el principio para después borrarlo porque no anda; es estúpido.

- _Es un lenguaje dinámico multiparadigma y débilmente tipado._ Y eso es lo que te gusta!, obsesionarte es contradictorio y no tiene sentido! A veces las cosas no irán con el flujo a la perfección y muchas veces no tendrás un flujo o estructura definida para algo. Si te está llevando demasiado tiempo para la importancia del asunto, ya está.

- _No seas inseguro. No te rindas tan fácil_. Tu trabajo, tu lógica, tus herramientas y tu código no son malos, son excelentísimos. Todo funciona perfectamente y es estable y de primera calidad. No te sientas inseguro de lo que haces y no te rindas fácil con lo que haces creyendo que está mal y siempre lo estuvo, que es inestable porque no lo hiciste bien o que ante la mínima falla "no debiste intentar hacerlo para empezar porque no sabes nada".

---

### **Prioriza, Piensa, Busca y luego Desarrolla.** (Antes de mejorar algo o hacer algo nuevo o necesario)

- _Si tenés una idea, priorizala antes de desarrollarla_. Cuántas veces tuve una idea para hacer o mejorar algo y me mandé a hacerla de una sin priorizar, gastando mi tiempo y energía. Hacé una lista y poné prioridades.

- _Pensá y hacé un esquema antes de desarrollar_. Demasiadas veces desarrollo algo que luego no era la solución necesaria o bien había una forma cien veces más sencilla de hacerlo. No desarrolles "para ver" porque lleva tiempo, pensá primero, hacé un esquema.

- _No reinventes cosas_. Que decidas usar algo de un tercero no significa que no puedas hacerlo vos, sólo significa que estás siendo eficiente. Me gusta lo propio y odio cosas externas difícilmente personalizables, pero algunas cosas son muy largas para hacer mi propia versión. Aunque lo hiciera, no sería igual de buena por una cuestión de recursos.

---

### **Documentación, Legibilidad y Controles Tranquilos.** (Antes de agregar más de esto)

- _No agregues controles como si lo fuera a usar/leer un idiota que nunca programó en su vida_. Los controles son importantes y hay que agregar unos cuantos críticos. No obstante, no controles todos los casos posibles, sobre todo si sólo es para que lo uses vos.

- _Un código decentemente legible y un poquito de tiempo alcanza para ponerse al día y poder continuarlo_. No te pongas a comentar absolutamente todo, escribir una documentación exhaustiva, ni renombrar variables como para un idiota. Sí ayuda, pero ningún comentario, documentación ni legibilidad te ahorrará tener que revisar el código para volver a entenderlo y seguirlo.

- _Documentación para vos, no para el mundo_. No escribas una documentación como si fuera un repositorio público de github que lo verá todo el mundo. Sólo lo vas a leer vos, escribí lo mínimo para entenderlo a futuro, agregá un valiosísimo ejemplo, y listo.

---

## **Notas Técnicas**

### **Propósito de Hooks y Componentes.**

_Definiciones_

- **Hooks**: Agrupan procesamiento y/o estado de un Componente, y proveen una API imperativa para leer/escribir ese estado y/o los resultados del procesamiento.

- **Componentes**: Declaran una cierta interfaz que controlan completamente con un flujo declarativo.

> Al estar _enganchandos_ a un Componente, los Hooks sólo viven mientras viva dicho Componente.

_¿Cuándo necesito hacer un Hook y cuándo un Componente nuevo?_

- Si lo que necesito es declarar y/o manipular un _estado_, o manipular _props_, se utiliza un Hook.

- Si lo que necesito es declarar y manipular una _interfaz_ nueva o parte de otra, se utiliza un Componente.

### **Componentes nuevos cuando hay funcionalidad nueva.**

_Es buena idea hacer un componente nuevo si hay una funcionalidad nueva aplicada a cierta parte de una interfaz_.

Es más eficiente si las actualizaciones de estado y re-renderizadas aplican sólo a la interfaz que afectan y no un Componente más grande.
