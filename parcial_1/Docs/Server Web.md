# Service WEB (ngrok + vagrant share)

---
## Pagina web
Recuerde que previamente debio haber configurado una pagina web en su servidor.
recuerde revisar su confiuracion previa una forma de hacerlo es con el comando curl 
en nuestro caso tenemos lo siguiente: 
```apache
curl www.servicios.com
Pagina principal del servicio web
```
como podemos ver el servicio esta funcionando.

Seguimos adelante con la configuracion.

## Puertos de reenvio

### Que es forwarded?

Hace referencia al reenvio de datos, esta opcion le permiten acceder a un puerto en su máquina host y reenviar todos los datos a un puerto en la máquina invitada, ya sea a través de TCP o UDP. [^1]

> [!IMPORTANT]
> Recuerda hacer este procedimiento con las maquinas virtuales apagadas.

### Guia configuracion

Como lo haremos en el siguiente ejemplo, el cual consiste en habilitar en una maquina virtual "servicios" un servidor web escuchando en el puerto 80, donde se realizara una asignación de puerto reenviado al puerto 8080 (o cualquier cosa) en el equipo host

> [!NOTE]
> El rango de puertos disponibles estan del 8000..8999
> Recuerde que estos cambios debe realizarlos sin alterar las demas lineas de codigo del Vagrantfile

Para ellos, en su maquina servidor adicione el _forwardin_ desde el **Vagrantfile**, especificando el puerto de salida

```ruby
Vagrant.configure("2") do |config|
  config.vm.define :[name_vm] do |[name_vm]|
    ...
    servidor.vm.network "forwarded_port", guest: 80, host: 8180
  end
  ...
end
```

Con nuestro puerto de reenvio activado, ahora debemos utilizar dos herramienta adicionales para probar el redirecionamiento, estas son: _NGROK y Vagrant Share_

### Que es NGROK?

Ngrok es un servicio o herramienta que permite convertir tu servidor local en un servidor accesible mediante un subdominio generado aleatoriamente por ngrok.com y así poder visualizarlo desde cualquier computadora con acceso a internet en el mundo
[^2].

En otras palabras, le brindara un subdominio que escuchara por el puerto de redirección asignado.

#### Para activar NGROK

Desde la pagina oficia [^3], registrese y descargue el aplicativo. Asegurese de guardar el ejecutable en un sitio seguro. Despues de eso copie la llave de autorización y registre la en el ejecutable.

```apache
ngrok authtoken 25tBlsb5YrHwIm0cZO97wBD6k6A_2Xzj63Vv7fJpienyy8cnQ
```
>[!CAUTION]
>Recuerde que cada token es unico generado apartir de su registro en ngrok

### Que es Vagrant Share?

Es una herramienta de vagrant que le permite compartir su entorno vagrant, para la colaboración directamente en su entorno Vagrant en casi cualquier entorno de red [^4]

> [!CAUTION]
> Vagrant Share requiere ngrok para ser utilizado. Asegurese de tenerlo instalado previamente

#### Para activar Vagrant Share

Instale en su maquina original Vagrant Share

```apache
vagrant plugin install vagrant-share
```

> [!IMPORTANT]
> Una vez instalado el servicio, asegurece de activar los servicios DNS y WEB en su maquina virtual "servidor", que en nuestro caso seran provistos por: named y httpd. Los cuales ya se han configurado con anterioridad con una pagina de aterrizaje.

y ejecute el comando de lanzamiento

```apache
vagrant share [name_vm]
```

Este le indicara el link donde podra visualizar su servicio web desde cualquier red con internet

Para detener el servicio, aplique los comando ` ctr + c `.
```apache
http://7b03-181-129-171-236.ngrok.io -> http://localhost:8180
```
Link del servicio en nuestro caso

> [!NOTE]
> Al detener el `vagrant share` el link sera inhabilitado.

---

## References

[^1]: [Forwarded Ports](https://www.vagrantup.com/docs/networking/forwarded_ports)
[^2]: [NGROK - Documentación](https://ngrok.com/docs)
[^3]: [NGROK - Descargas](https://ngrok.com/download)
[^4]: [Vagrant Share](https://www.vagrantup.com/docs/share)
