## Configuracion del VsftpdSeguro 

Se debe intalar el paquete 
````apache
yum install vsftpd -y
```` 
Abrimos el archivo de configuracion vsftpd
````apache
vim /etc/vsftpd/vsftpd.conf
```` 
Ahora aqui vamos a configurar los siguiente 
````apache
write_enable=YES
chroot_local_user=YES
allow_writeable_chroot=YES
pasv_min_port=2000
pasv_max_port=2100
rsa_cert_file=/etc/pki/tls/certs/ca.crt
rsa_private_key_file=/etc/pki/tls/private/ca.key
ssl_enable=YES

````
Como se muestra en la siguiente imagen
![image](https://user-images.githubusercontent.com/93839814/161175555-3573a424-d5e2-4a37-a4b9-0160647ce58e.png)
# Generar el certificado de autenticidad
Ahora procedemos a instalar openssl
````apache
yum install mod_ssl
````
Creacion de la clave privada de 2048 bits
````apache
openssl genrsa -out ca.key 2048
````
Generacion de la peticion  para el certificado
````apache
openssl req -new -key ca.key -out ca.csr
````
Generacion del certificado
````apache
openssl x509 -req -days 365 -in ca.csr -signkey ca.key -out ca.crt
````
![image](https://user-images.githubusercontent.com/93839814/161176293-0ac45aa5-9652-465f-928b-b4f7fd3ca3fb.png)

Ahora enviamos los archivos a la ruta de almacenamiento
````apache
 cp ca.crt /etc/pki/tls/certs/
 ````
 ````apache
 cp ca.key /etc/pki/tls/private/
 ````
 ````apache
 cp ca.csr /etc/pki/tls/private/ 
````
Ahora procedemos a darle permisos 600
````apache
 chmod 600 /etc/pki/tls/certs/ca.crt
 chmod 600 /etc/pki/tls/private/ca.csr
 chmod 600 /etc/pki/tls/private/ca.key
 ````
 
>[IMPORTANT] 
>Recuerda que debe estar la ip configurada para que resuelva la consulta 
>Recuerde que es la ip de la maquina esclava
````apache
vim /etc/resolv.conf
````
![image](https://user-images.githubusercontent.com/93839814/161176740-5174b200-9d27-43bb-8934-b83b657207f4.png)

# Verificar que este funcionando el servicio
Despues de crear la clave y copiarla en las rutas de donde se alojaran los certificados se tiene la comprobacion de que funciona de la siguiente forma.
>[NOTE]
> Para que siga apareciendo el certificado se le debe dar cancelar.
![image](https://user-images.githubusercontent.com/93839814/161173717-11b87a15-21e9-4e93-92c6-4fc8abbd92a6.png)
