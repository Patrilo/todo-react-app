#  Ejercicio Práctico React: aplicación To-do List

Este proyecto fue creado por YuneVK. El repositorio original lo podemos encontrar en esta url https://github.com/YuneVK/taller-react-todo Es un proyecto muy completo para empezar a trabajar con React, y las indicaciones para trabajar con el proyecto son perfectas para crear un proyecto desde 0. Las podemos encontrar también en este README

## ¿Qué vamos a hacer?

Desde esta práctica, vamos a trabajar sobre el proyecto de ToDo List original y añadiremos alguna nueva funcionalidad para que podamos poner en práctica lo que hemos visto durante el curso.



El resultado final será este:

<p align="center">
  <img alt="Aplicación Todo" height="600" src="https://raw.githubusercontent.com/YuneVK/portfolio-test/master/images/aplicacion-todo.gif">
</p>



## Creando nuestra aplicación

### 1. Setup inicial

El primer paso es sencillo: ¡hay que configurar nuestro entorno de trabajo!


1. Clona este repositorio: `git clone https://github.com/Patrilo/todo-react-app.git`
3. Entra en el directorio del repo: `cd taller-react-todo`
4. Desde la rama master, instala todas las dependencias con npm install y después, yarn install
5. Arranca el proyecto: `npm start`, una vez se ha instalado todo correctamente.
6. Abre el navegador y entra a la dirección `localhost:3000` para comprobar que está funcionando.

<p align="center">
  <img alt="Create-react-app home" width="600" src="https://raw.githubusercontent.com/YuneVK/portfolio-test/master/images/home-create-react-app.png">
</p>


### 2. Limpiando el código

Antes de añadir nada, vamos a hacer un poco de limpieza 🧹 al código que viene por defecto, básicamente al componente App (recuerda, `src/App.js`).

Vamos a quitar todo lo que devuelva el método `render()` para dejar solo el `div` padre, además de borrar la importación del logo que no vamos a utilizar (`import logo from './logo.svg';`), quedando así:

```js
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return <div className="App">{/* El código de la app irá aquí */}</div>;
  }
}

export default App;
```

También vamos a hacer una limpieza de su archivo de estilos, `App.css`, borrando todo su contenido.

🧹 Ahora que hemos dejado el código algo más limpio, ¡vamos a empezar a añadir el nuestro para darle forma a la aplicación!

### 3. Añadiendo estilos

Sí, estamos en _front_, así que, aunque no nos centraremos en los estilos de la aplicación, sí vamos a intentar hacer las cosas con una estética mínimamente decente. 😜

Hemos preparado este CSS para que insertes `App.css`, con las clases que utilizaremos a continuación:

```css
.App {
  width: 20rem;
  max-width: 90vw;
  height: 30rem;
  max-height: 90vh;
  margin: 1rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(50, 50, 50, 0.2);
  color: #263238;
  display: flex;
  flex-direction: column;
}

.App h1 {
  margin: 0;
  margin-bottom: 1.5rem;
  font-weight: 200;
  font-size: 3rem;
  position: relative;
  color: #00897b;
  text-align: center;
}

.ItemList {
  margin: 1rem 0;
  list-style-type: none;
  padding: 0;
  overflow: scroll;
}

.Item {
  font-size: 1.2rem;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #eceff1;
  cursor: pointer;
}

.Item.completed {
  color: #90a4ae;
  text-decoration: line-through;
}

.ItemForm input {
  width: 100%;
  font-size: 1.2rem;
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #90a4ae;
}

.ItemForm input:focus {
  border-bottom: 1px solid #00897b;
  outline: 0;
}

.ItemForm input:focus::placeholder {
  color: #00897b;
}

.ItemForm input::placeholder {
  color: #90a4ae;
  font-weight: 100;
}
```

Y este para `index.css`:

```css
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400&display=swap");

body {
  margin: 0;
  background: #f6f9fd;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: "Open Sans", sans-serif;
}

#root {
  height: fit-content;
  width: fit-content;
}
```

> ⚠️ Para centrarnos más en las funcionalidades de React, vamos a centralizar el CSS, en dos unicos archivos, IMPORTANTE, el código CSS relativo a cada componente debería de estar en archivos diferentes, y que cada componente tenga su correspondiente archivo CSS.

Ya tenemos nuestro `setup`, así que vamos con los componentes lógicos.

### 4. Establecer y leer elementos con el state

Comenzamos estableciendo los elementos de nuestro `todo` que estarán disponibles al iniciar la aplicación.

¿Recuerdas cuando hablamos antes del `state`? Comentamos que el `state` (o estado) de un componente permite manejar datos propios a lo largo de su ciclo de vida. Es decir, es una información, un dato local de ese componente.

Nuestra aplicación va a tener una lista de tareas, por lo que, si lo piensas, ese listado debería formar parte del estado de un componente, en este caso App.

Recuerda que, mediantes los Hooks, podemos definir el estado de un componente con la siguiente sintaxis:

```js
function Component() {
  const [fooBar, setFooBar] = useState("Este sería el valor inicial");

  // ...
}
```

Vamos a seguir esta sintaxis para establecer el estado `items` a nuestro componente `App`:

```js
function App() {
  const [items, setItems] = useState([
    {
      content: "📘 Aprender React"
    },
    {
      content: "⚛️ Crear mi primera aplicación"
    },
    {
      content: "🚀 Subirla a GitHub"
    }
  ]);

  // ...
}
```

> ⚠️ Como estás usando la función `useState`, vas a tener que importarla, así que cambia la línea 1 por lo siguiente:
>
> ```js
> import React, { useState } from "react";
> ```

Ya los tenemos establecidos en el componente, ¡así que toca mostrar el listado! Como `items` es un array, tendremos que recorrerlo para renderizar un elemento por cada uno. Para ello, establece el método `reader()` de tu componente `App` así:

```js
return (
  <div className="App">
    <h1>Todo List</h1>
    <ul className="ItemList">
      {items.map((item, index) => (
        <li key={index} className="Item">
          {item.content}
        </li>
      ))}
    </ul>
  </div>
);
```

> 💡 **¡Recuerda!** El método [`map()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map) recorre un array y devuelve un nuevo array con los resultados de la función que recibe por parámetro, que es aplicada a cada elemento del array. Es muy común su uso en React para renderizar componentes en función de un listado.

Ahora vuelve al navegador y comprueba que todo funciona correctamente. :crossed_fingers:

<p align="center">
  <img alt="Listado" width="600" src="https://raw.githubusercontent.com/YuneVK/portfolio-test/master/images/todo-listado.png">
</p>

Ya vemos el listado, pero es el momento de hacer un pequeño `refactor`, ya que tenemos que pensar en componentes. Por eso, vamos a crear uno que sea el encargado de mostrar un elemento de la lista.

Para ello, crea una carpeta llama `components` dentro de `src` y, dentro de esta carpeta, un archivo `Item.js`, quedando la estructura así:

```
taller-react-todo/
  node_modules/
  public/
    index.html
    favicon.ico
  src/
    components/
      Item.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
  package.json
  README.md
```

> 💡 Crear una carpeta `components` no es obligatorio, puedes tener todos tus componentes sueltos en `src`, aunque se suelen poner en una carpeta por convenio, para organizar el código y para una mayor comodidad. 

`Item.js` corresponde al compontente `Item`, que se utilizará para representar a cada elemento, por lo que recibirá por `props` el contenido.

```js
import React from "react";

const Item = props => {
  return <li className="Item">{props.content}</li>;
};

export default Item;
```

Ahora tenemos que utilizar este componente en el principal, `App`. Para ello, el primer paso es importarlo:

```js
import Item from "./components/Item";
```

Una vez importado, podremos utilizarlo, por lo que volvemos a cambiar el método `render()` de `App`:

```js
return (
  <div className="App">
    <h1>Todo List</h1>
    <ul className="ItemList">
      {items.map((item, index) => (
        <Item key={index} index={index} content={item.content} />
      ))}
    </ul>
  </div>
);
```

Con todos estos cambios, el componente `App` quedaría así:

```js
import React, { useState } from "react";
import Item from "./componentes/Item";

function App() {
  const [items, setItems] = useState([
    {
      content: "📘 Aprender React"
    },
    {
      content: "⚛️ Crear mi primera aplicación"
    },
    {
      content: "🚀 Subirla a GitHub"
    }
  ]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul className="ItemList">
        {items.map((item, index) => (
          <Item key={index} index={index} content={item.content} />
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Y el componente `Item` quedaría así:

```js
import React from "react";

const Item = props => {
  return <li className="Item">{props.content}</li>;
};

export default Item;
```

Ahora volvemos al navegador y vemos que sigue funcionando correctamente.


### 5. Añadir elementos

Vale, ya podemos ver los elementos, pero, ¿y si queremos añadir uno nuevo? En este paso vamos a añadir esa funcionalidad.

Y para ello, primero creamos un método en nuestro componente `App` que, dado un valor recibido por parámetro, lo añada al `state` de `items`. Con el método `unshift` añadimos un elemento al principio del array.

```js
const addItem = content => {
  const newItems = [...items];
  newItems.unshift({ content: content });
  setItems(newItems);
};
```

> 💡 ¿Te ha confundido la parte de `[...todos ]`? Es el [`spread operator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (u operador de propagación), una característica de ES6 que, en este caso, lo estamos utilizando para hacer una copia del array `items`. ¿Por qué tenemos que hacer una copia? En JavaScript, los tipos de datos complejos (arrays y objetos) se pasan por referencia, y no por valor, por lo tenemos que hacerlo para tener una copia de `todos` y asegurarnos de que no modificamos el original. [En este artículo tienes más información sobre las diferencias de valor y referencia](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0).

Esta función que hemos creado la utilizará el componente del formulario, así que ahora creamos dicho componente, que será `ItemForm` (`src/components/ItemForm.js`).

Básicamente va a ser un formulario con un único `input`, cuyo valor se guardará en su `state`. Además, para su funcionamiento necesitaremos un método que gestione el envío de dicho formulario (lo llamaremos `handleSubmit()`), y que llame a su vez al método `addItem()`, que recibirá del componente `App` para añadir este elemento a su `state`. ¿Te has quedado así: 🤯? ¡No te preocupes! Puede ser muy confuso de explicar, pero cuando lo veas en práctica seguro que lo entiendes mejor. 😉

> 💡 **Recuerda** que puedes pasar todo tipo de dato mediante `props`. Puedes compararlo a los argumentos de una función, a la que le puedes pasar incluso otra función que quieres que se ejecute en ella.

Siguiendo lo que hemos comentado, cuando ya tengas creado el archivo del componente, `ItemForm`, primero establece su estado. Recuerda, será el valor del campo del formulario.

```js
const [value, setValue] = useState("");
```

A continuación, añade el contenido que renderizará el componente `ItemForm`:

```js
return (
  <form className="ItemForm" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Introduce una tarea"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  </form>
);
```

Vamos a destacar varias cosas del código que acabas de añadir:

1. Con `onSubmit={handleSubmit}`, establecemos que, cuando se envíe el formulario, se ejecute la función `handleSubmit`. Esta función todavía no la hemos creado, lo haremos en el siguiente paso.
2. El `value` del `input` está asociado a su estado, con el mismo nombre.
3. Cada vez que cambie el valor del formulario (`onChange`), se llamará al método `setValue` para actualizar el `state` con el nuevo valor. Si no pusiéramos esta línea, el `input` no cambiaría cuando escribamos en él. ¡Pruébalo!

Y ahora sí, por último, vamos a establecer el `handleSubmit`:

```js
const handleSubmit = (e) => {
  e.preventDefault();
  if (!value) return;

  props.addItem(value);
  setValue("");
  return false;
};
```

Con este código, comprobamos si el `state` tiene contenido, es decir, si se ha introducido algo. Si es así, lo añadimos al listado mediante la función `addTodo` que recibe por `props`.

Ahora te falta importar dicho componente a `App`:

```js
import ItemForm from "./components/ItemForm";
```

Y renderizarlo, pasándole la función `addItem`:

```js
  return (
    <div className="App">
      <ItemForm addItem={addItem} />
      <ul className="ItemList">
        {items.map((item, index) => (
          <Item key={index} index={index} content={item.content} />
        ))}
      </ul>
    </div>
  );
````

Con todos estos cambios, el componente `App` quedaría así:

```js
import React, { useState } from "react";
import Item from "./componentes/Item";
import ItemForm from "./componentes/ItemForm";

function App() {
  const [items, setItems] = useState([
    {
      content: "📘 Aprender React"
    },
    {
      content: "⚛️ Crear mi primera aplicación"
    },
    {
      content: "🚀 Subirla a GitHub"
    }
  ]);
  
  const addItem = (content) => {
    const newItems = [...items, { content: content }];
    setItems(newItems);
  };

  return (
    <div className="App">
      <ItemForm addItem={addItem} />
      <ul className="ItemList">
        {items.map((item, index) => (
          <Item key={index} index={index} content={item.content} />
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Y el componente `ItemForm` así:

```js
import React, { useState } from "react";

const ItemForm = props => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    props.addItem(value);
    setValue("");
    
    return false;
  };

  return (
    <form className="ItemForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Introduce una tarea"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
};

export default ItemForm;
```

¡Y ya estaría! Ahora solo te queda comprobar que funciona. 😬

### 6. Marcar elementos como completados

Otra de las características esenciales de una aplicación to-do es poder marcar los elementos como completados, y eso es lo que vamos a hacer ahora.

Piensa, ¿cómo podrías establecer si el elemento ha sido completado o no a través de su componente? 👉 ¡Con su estado!

Si revisas de nuevo la estructura del `state` del componente `App`, verás que cada ítem tiene solo un dato: `content`. Ahora necesitamos que contenga otra propiedad más, `isCompleted`, que será la que indique si la tarea está o no completada. Por eso, vamos a añadirla, con el valor `false` por defecto:

```js
const [items, setItems] = useState([
  {
    content: "📘 Aprender React",
    isCompleted: false
  },
  {
    content: "⚛️ Crear mi primera aplicación",
    isCompleted: false
  },
  {
    content: "🚀 Subirla a GitHub",
    isCompleted: false
  }
]);
```

También tenemos que actualizar el método `addItem` para que, cuando genere el objeto, también añada esta propiedad:

```js
const addItem = content => {
  const newItems = [...items];
  newItems.unshift({ content: content, isCompleted: false });
  setItems(newItems);
};
```

A continuación tendremos que escribir la función que se encargará de cambiar ese estado (a `true`si está en `false`, y viceversa), teniendo en cuenta que para ello deberá recibir la posición del array a la que se le quiere cambiar este valor.

```js
const completeItem = (index) => {
  const newItems = [...items];
  newItems[index].isCompleted = !newItems[index].isCompleted;
  setItems(newItems);
};
```

El funcionamiento de la función es sencillo: clonamos el array, accedemos a la posición en función del índice que recibimos por parámetro y cambiamos su propiedad `isCompleted` por su opuesto (con el símbolo `!` devolvemos el valor contrario).

> ⚠️ Recuerda que tienes que hacer una copia del array para no modificar el original, como en el paso anterior.

Esta función que hemos creado se la vamos a sar al componente `Item` para que pueda utilizarla, además de la propiedad `isCompleted`que luego vamos a utilizar:

```js
<Item
  key={index}
  index={index}
  content={item.content}
  completeItem={completeItem}
  isCompleted={item.isCompleted}
/>
```

Ahora vamos al componente `Item` para establecer que, cada vez que se pulse sobre él, se ejecute dicha función, pasando el `index` por parámetro:

```js
const Item = props => {
  return (
    <li className="Item" onClick={() => props.completeItem(props.index)}>
      {props.content}
    </li>
  );
};
```

Vale, ya tenemos configurado el `state` y vinculada la función que se encarga de modificarlo. Pero, ¿cómo vamos a saber si está completada o no? Para ello, tenemos definida en CSS la clase `is-completed`, que define esos estilos, por lo que, cuando `isCompleted` sea `true`, ese componente deberá llevar esa clase:

```js
className={`Item${props.isCompleted ? " completed" : ""}`}
```

> 💡 Hemos usado otra funcionalidad de ES6, los `backticks`. Son `template strings`, es decir, plantillas de cadenas de texto a través de las cuales podemos concatenar `strings` con variables o expresiones con una sintaxis más fácil de leer. Aquí tienes un ejemplo
>
> ```js
> // Forma clásica
> const foo = "Hola " + name + "!";
>
> // Con backticks
> const bar = `Hola ${name}!`;
> ```
>
> Mucho mejor la segunda, ¿verdad? 😜 [Aquí tienes más información](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

Haciendo un último repaso a los componentes, `App` quedaría así:

```js
import React, { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import ItemForm from "./components/ItemForm";

function App() {
  const [items, setItems] = useState([
    {
      content: "📘 Aprender React",
      isCompleted: false
    },
    {
      content: "⚛️ Crear mi primera aplicación",
      isCompleted: false
    },
    {
      content: "🚀 Subirla a GitHub",
      isCompleted: false
    }
  ]);

  const completeItem = index => {
    const newItems = [...items];
    newItems[index].isCompleted = !newItems[index].isCompleted;
    setItems(newItems);
  };

  const addItem = content => {
    const newItems = [...items];
    newItems.unshift({ content: content, isCompleted: false });
    setItems(newItems);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ItemForm addItem={addItem} />
      <ul className="ItemList">
        {items.map((item, index) => (
          <Item
            key={index}
            index={index}
            content={item.content}
            completeItem={completeItem}
            isCompleted={item.isCompleted}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Y el componente `Item`:

```js
import React from "react";

const Item = props => {
  return (
    <li
      className={`Item${props.isCompleted ? " completed" : ""}`}
      onClick={() => props.completeItem(props.index)}
    >
      {props.content}
    </li>
  );
};

export default Item;
```

Por último, comprueba que funciona correctamente.

<p align="center">
  <img alt="Aplicación Todo" height="600" src="https://raw.githubusercontent.com/YuneVK/portfolio-test/master/images/todo-complete.gif">
</p>

### 6. Añadir dos nuevos botones

Vamos a añadir dos nuevos botones para cada una de nuestras tareas. El primero de ellos, hará la funcionalidad que hemos creado antes para marcar la tarea como completada, para ello tendremos que hacer una pequeña refactorización y el segundo botón borrará la tarea seleccionada. ¿Vamos?

El evento onClick que teniamos tendremos que pasarlo al nuevo botón.
La refactorización quedaría así.
 
```
import React from "react";


const Item = props => {
    return (
        <li className={`Item${props.isCompleted ? " completed" : ""}`} >
            <span>{props.content}</span>
            <button onClick={() => props.completeItem(props.index)} className="Item done">Hecho</button>
            <button onClick={() => props.itemDelete(props.index)} className="Item delete">Borrar</button>
        </li>
    );
};

export default Item;
```


Vamos a darle un poquito de estilos a los dos nuevos colores, para diferenciar cual es el va a marcar la tarea como completada y el que la va a borrar. De nuevo, aplicamos los estilos de forma global, pero ¡Recuerda! cada componente debe de tener su propio estilo. Vamos a añadirlo en el archivo ``` App.css ```


```
.Item.done {
    border: 0;
    padding: 10px;
    margin: 0 10px;
    background-color: #5EBA7D;
    color: white;
    font-size: 14px;
}

.Item.delete {
    border: 0;
    padding: 10px;
    margin: 0 10px;
    background-color: #F22F47;
    font-size: 14px;
    color: white;
}


```
Volvamos con la funcionalidad, nos queda el último paso. Vamos a nuestro archivo ``` App.js```. Informamos la nueva prop itemDelete del componente ```Item``` y creamos la función con la lógica para eliminar el elemento de la lista.

```
  const deleteItem = index => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <ItemForm addItem={addItem} />
            <ul className="ItemList">
                {items.map((item, index) => (
                    <Item
                        key={index}
                        index={index}
                        content={item.content}
                        completeItem={completeItem}
                        isCompleted={item.isCompleted}
                        itemDelete={deleteItem}
                    />
                ))}
            </ul>
        </div>
    );
    
    
```

Como puedes ver, es una función muy sencilla y parecida a la de ```addItem```. En este caso, simplemente eliminamos el elemento del array utilizando el método ```splice```. https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice  Este método, recibe como parametros, 2 números: el primero es el indice en el cual comienza a borrar, y el segundo es el número de elementos que va a borrar.
De nuevo, setemos nuestro state de Items para actualizarlo.

## Hemos terminado :blush:

La resolución de este ejercicio lo puedes encontrar en la rama "task-button"

En la rama dev, podrás ver la solución del este pequeño ejercicio. El último ejercicio, el de los botones, lo podrás encontrar en la rama ```task-button```.

Como extra, hemos creado un ejemplo sencillo para trabajar con React Router. ¿Quieres verlo? Cambiate de rama y mira como es el código. La rama es ```react-routing```




