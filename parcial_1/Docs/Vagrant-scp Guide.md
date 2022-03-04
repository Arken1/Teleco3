# Vagrant SCP

---


## Como instalar vagrant-scp

vagrant-scp el complemento requiere vagrant-vbguest, por lo que primero debe instalar la dependencia, de lo contrario, puede obtener el error de la siguiente manera:

> [!CAUTION]
Recuerda que debes tener tus maquinas virtuales encedidas para ejecutar este comando.

```apache
vagrant plugin install vagrant-scp
```

Para copiar un archivo o un directorio entre el host de Vagrant y la VM invitada, debe conocer el id o la name de una máquina virtual invitada.

Esta información se puede encontrar en el resultado del siguiente comando:
```apache
vagrant global-status
```

--
Copie el archivo o directorio de la máquina virtual invitada a la máquina host de Vagrant:

```apache
vagrant scp <some_local_file_or_dir> <vm_name>:<some_path_on_vm>
```
--
## En nuestro caso
Nosotros ejecutamos el comando de la siguiente manera:
```apache
vagrant scp aqui1.txt sercidor:~/teleco3
```
En este caso el archivo que esta en nuestro equipo anfitrion es copiado a nuestra maquina virtual servidor y estara en la carpeta teleco3

Para corroborar que el archivo fue copiado usamos el siguiente metodo ingresamos al servidor:

```apache
vagrant ssh servidor
```
Ya dentro del servidor

Luego entramos a la carpeta teleco3
```apache
cd teleco3
```
Luego le damos un ls
```apache
ls 
```
y revisamos los archivos que existen en la carpeta 
--
