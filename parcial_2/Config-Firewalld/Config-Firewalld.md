

## Gui de configuraciones FIREWALLD

En un principio debemos instalar el lector de archivos vim y la herramienta net-tools para revisar la configuracion de las ips.

```apache
yum install vim net-tools -y
```
> [!NOTE]
> Luego de esto procedemos a iniciar el servicio de FIREWALLD
Para iniciar el servicio del firewalld se escribe 
```apache
service firewalld start
```
Luego de que el servicio esta corriendo.
Lo primero sera definir la zona dmz como la zona por default de la siguiente forma
```apache
firewall-cmd --set-default-zone=dmz
```
Luego corremos el siguiente comando para que esta configuracion se convierta en permanente
```apache
firewall-cmd --runtime-to-permanent
```
despues de aplicar este comando le damos un reload al firewalld para que guarde la configuracion
```apache
firewall-cmd reload
```
Revisamos que la zona defualt haya quedado como la configuramos 
```apache
firewall-cmd --get-default-zone
```
Ahora realizamos una verifacion de las zonas que estan corriendo con 
```apache
 firewall-cmd --list-all
```
Revisamos las interfaces que estan corriendo en la zona dmz
 ```apache
 firewall-cmd --list-all --zone=dmz
```
Ahora procedemos a ver que ip esta ligada que eth# usando el comando 
 ```apache
 ifconfig
```
Lo primero sera remover de dmz la eth2
 ```apache
 firewall-cmd --zone=dmz --remove-interface=eth2
```
Ahora procedemos a ingresar eth2 a internal
```apache
 firewall-cmd --zone=internal --add-interface=eth2
```
De nuevo volvemos a correr un run-to-permanent y un reload para asegurarnos que de que guarden las configuraciones y un reload
```apache
  firewall-cmd --runtime-to-permanent
```
```apache
  firewall-cmd --reload
```
Revisamos de nuevo que haya quedado bien configuradas las interfaces con el siguiente comando.
```apache
   firewall-cmd --list-all --zone=dmz
```
Ahora revisamos la interna
```apache
   firewall-cmd --list-all --zone=internal
```
Ahora se debe hacer un add de las mascaras para las 2 zonas
```apache
  firewall-cmd --permanent --zone=dmz --add-masquerade
```
para internal
```apache
  firewall-cmd --permanent --zone=internal --add-masquerade
```
Guardamos configuraciones con un reload
```apache
  firewall-cmd --reload
```
Ahora procedemos a a;adir los servicios.
```apache
  firewall-cmd --zone=dmz --add-service=dns
```
```apache
  firewall-cmd --zone=dmz --add-service=ftp
```
De nuevo volvemos a correr un run-to-permanent y un reload para asegurarnos que de que guarden las configuraciones.
```apache
  firewall-cmd --runtime-to-permanent
```
```apache
  firewall-cmd --reload
```
Ahora se a;aden los puertos y la ip de donde trabajaremos.
```apache
 firewall-cmd --zone="dmz" --add-forward-port=port=21:proto=tcp:toport=21:toaddr=192.168.0.201
```
```apache
 firewall-cmd --zone="dmz" --add-forward-port=port=53:proto=tcp:toport=53:toaddr=192.168.0.201
```
```apache
 firewall-cmd --zone="dmz" --add-forward-port=port=2000-2100:proto=tcp:toport=2000-2100:toaddr=192.168.0.201
```
De nuevo volvemos a correr un run-to-permanent y un reload para asegurarnos que de que guarden las configuraciones.
```apache
  firewall-cmd --runtime-to-permanent
```
```apache
  firewall-cmd --reload
```
Ahora verificamos la zonas que estan activas
```apache
  firewall-cmd --get-active-zones
```
![image](https://user-images.githubusercontent.com/93839814/161163755-e30d1265-2427-4441-8e84-0720545b3333.png)
Comprobamos que salga igual que en la imagen.
Verificamos la dmz
```apache
  firewall-cmd --list-all --zone=dmz
```
![image](https://user-images.githubusercontent.com/93839814/161163839-8a679a0c-c675-422d-a8d6-0e564b9fdeef.png)
