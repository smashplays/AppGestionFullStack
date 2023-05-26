# App Gestion Full Stack

Esta es una aplicación hecha para poder gestionar las incidencias que llegan para clientes en una tienda de informática ficticia, también hay una parte de agenda para anotar eventos.

## Instalación

Una vez clonado el repositorio o descargados los archivos haremos unas instalaciones necesarias, tanto en el Backend como en el Frontend.

### Backend

Entraremos en la carpeta back.

```bash
  cd back
```

Instalaremos las dependencias (necesario tener [PHP](https://www.php.net/downloads) y [Composer](https://getcomposer.org/) instalados).

```bash
  composer install
```

Ahora abriremos el archivo **.env.example** y lo duplicaremos, ese duplicado lo renombraremos como **.env** y añadiremos algunos datos, como por ejemplo el nombre de la base de datos que será **incidencias**.

![plot](./front/Capturas%20Readme/env.png)

Ahora vamos a ejecutar unos cuantos comandos, entre varias cosas para crear la base de datos, generar una key de encriptación y poder hacer funcionar el sistema de login (que es Passport).

```bash
    php artisan migrate
    php artisan key:generate
    php artisan passport:install
```

Y vamos a ejecutar el siguiente comando para tener un usuario por defecto (revisar el archivo UserSeeder en database/seeders para ver las contraseñas sin cifrar).

```bash
    php artisan db:seed --class=UserSeeder
```

Para terminar con el backend lanzaremos el siguiente comando para ejecutar Laravel (importante estar ejecutando un servidor de base de datos para que funcione).

```bash
    php artisan serve
```

### Frontend

Ahora volveremos a la carpeta raíz del proyecto.

```bash
    cd ..
```

Iremos a la carpeta front e instalaremos las dependencias (requiere tener [npm](https://nodejs.org/es) instalado)

```bash
  cd front
  npm install
```

Una vez finalizada la instalación, ejecutaremos el siguiente comando para abrir la aplicación en nuestro navegador por defecto (requiere tener instalado [Angular CLI](https://angular.io/cli) de manera global)

```bash
  ng serve --open
```

## Capturas y explicación

Lo primero que veremos al ejecutar será la pantalla de login, al ser una aplicación para una tienda no habrá una pantalla de registro (aunque luego el administrador podrá añadir más usuarios desde dentro)

![App Screenshot](./front/Capturas%20Readme/login.png)

Una vez iniciemos sesión seremos dirigidos a una página principal que nos dirá de abrir el menú de arriba, el cual es un sidenav, en él podremos entrar en las distintas páginas

![App Screenshot](./front/Capturas%20Readme/main.png)
![App Screenshot](./front/Capturas%20Readme/sidenav.png)

Vamos a entrar primero en la parte de usuarios (donde solo pueden entrar los usuarios con el rol de administrador) y dentro podemos crear usuarios nuevos, editarlos o borrarlos (menos al usuario propio con el que estemos logeado)

![App Screenshot](./front/Capturas%20Readme/users-list.png)
![App Screenshot](./front/Capturas%20Readme/users-create.png)
![App Screenshot](./front/Capturas%20Readme/users-edit.png)
![App Screenshot](./front/Capturas%20Readme/user-delete.png)

Ahora vamos a entrar a la parte de clientes, donde los usuarios solo pueden ver y crear clientes, mientras que los administradores también pueden editarlos y eliminarlos, también tenemos un buscador para filtrar por nombre que da una sugerencia de autorelleno.

![App Screenshot](./front/Capturas%20Readme/no-clients.png)
![App Screenshot](./front/Capturas%20Readme/clients-create.png)
![App Screenshot](./front/Capturas%20Readme/clients.png)
![App Screenshot](./front/Capturas%20Readme/clients-edit.png)
![App Screenshot](./front/Capturas%20Readme/clients-delete.png)

Ahora vamos a la parte de la agenda, donde podemos añadir eventos en distintas horas del día (está limitado de Lunes a Viernes hasta las 8 y media siguiendo el horario que suele tener una tienda de informática, esto puede ser modificado facilmente)

![App Screenshot](./front/Capturas%20Readme/no-agenda.png)
![App Screenshot](./front/Capturas%20Readme/crear-evento.png)
![App Screenshot](./front/Capturas%20Readme/agenda.png)
![App Screenshot](./front/Capturas%20Readme/actualizar-evento.png)

Ahora vamos a ver las incidencias pendientes y terminadas, para ello vamos a crear una incidencia pendiente y con uno de los botones lo guardaremos en la tabla de incidencias terminadas para volver a llevarla a pendientes si fuera necesario.

![App Screenshot](./front/Capturas%20Readme/no-pendientes.png)
![App Screenshot](./front/Capturas%20Readme/crear-incidencia.png)
![App Screenshot](./front/Capturas%20Readme/pendientes.png)
![App Screenshot](./front/Capturas%20Readme/editar-incidencia.png)
![App Screenshot](./front/Capturas%20Readme/eliminar-incidencia.png)
![App Screenshot](./front/Capturas%20Readme/terminar-incidencia.png)
![App Screenshot](./front/Capturas%20Readme/terminados.png)

Y para acabar, dentro de las incidencias pendientes podemos darle al botón entre el de finalizar y eliminar y podremos generar un pdf con todos los datos sobre la incidencia

![App Screenshot](./front/Capturas%20Readme/pdf.png)
