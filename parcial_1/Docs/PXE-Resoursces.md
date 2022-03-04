## Configurar un servidor PXE
En este documento estaran los archivos usados para configurar el servidor pxe, se usaron varios sitos webs para esto


--
## Instrucciones usadas para la configuracions del PXE
Below details of my Setup :


o Server IP = 192.168.50.5
o Host name = server-pxe
o OS = CentOS 7.x
o SELinux = enabled
o Firewall = enabled




Step 1:
```apache
yum install dhcp tftp tftp-server syslinux vsftpd xinetd -y

```


Step 2:
```apache
[root@pxe ~]#gedit /etc/dhcp/dhcpd.conf
```
# DHCP Server Configuration file.
```ruby

ddns-update-style interim;
ignore client-updates;
authoritative;
allow booting;
allow bootp;
allow unknown-clients;
# internal subnet for my DHCP Server
subnet 172.16.1.0 netmask 255.255.255.0 {
range 172.16.1.101 172.16.1.200;
option domain-name-servers 172.16.1.100;
option domain-name "pxe.example.com";
option routers 172.16.1.100;
option broadcast-address 172.16.1.255;
default-lease-time 600;
max-lease-time 7200;
# IP of PXE Server
next-server 172.16.1.100;
filename "pxelinux.0";
}
```



Step:3 
Edit and Config tftp server (/etc/xinetd.d/tftp)
```apache
[root@pxe ~]#gedit /etc/xinetd.d/tftp
```

change the parameter ‘disable = yes‘ to ‘disable = no’ 


Step:4
All the network boot related files are to be placed in tftp root directory “/var/lib/tftpboot”
Run the following commands to copy required network boot files in ‘/var/lib/tftpboot/’

```
[root@pxe ~]# cp -v /usr/share/syslinux/pxelinux.0 /var/lib/tftpboot
[root@pxe ~]# cp -v /usr/share/syslinux/menu.c32 /var/lib/tftpboot
[root@pxe ~]# cp -v /usr/share/syslinux/memdisk /var/lib/tftpboot
[root@pxe ~]# cp -v /usr/share/syslinux/mboot.c32 /var/lib/tftpboot
[root@pxe ~]# cp -v /usr/share/syslinux/chain.c32 /var/lib/tftpboot
[root@pxe ~]# mkdir /var/lib/tftpboot/pxelinux.cfg
[root@pxe ~]# mkdir /var/lib/tftpboot/networkboot
```

Step :5
Mount CentOS 7.x ISO file and copy its contents to local ftp server

```apache
[root@pxe ~]# mount -o loop CentOS-7-x86_64-DVD-1511.iso /mnt/
[root@pxe ~]# cd /mnt/
[root@pxe mnt]# cp -rf * /var/ftp/pub/
```

Step :6
Copy Kernel file (vmlimz) and initrd file from mounted iso file to ‘/var/lib/tftpboot/networkboot/’

```apache
[root@pxe ~]# cp /mnt/images/pxeboot/vmlinuz /var/lib/tftpboot/networkboot/
[root@pxe ~]# cp /mnt/images/pxeboot/initrd.img /var/lib/tftpboot/networkboot/

```


Step :7
Create a PXE menu file (/var/lib/tftpboot/pxelinux.cfg/default), copy the following contents into the pxe menu file.

```apache
[root@pxe ~]#gedit /var/lib/tftpboot/pxelinux.cfg/default
```
```ruby
default menu.c32
prompt 0
timeout 30
MENU TITLE IT-ASSIST PXE Menu
LABEL centos7_x64
MENU LABEL CentOS 7_X64
KERNEL /networkboot/vmlinuz
APPEND initrd=/networkboot/initrd.img inst.repo=ftp://172.168.1.100/pub

```




Step :8
Start and enable xinetd, dhcp and vsftpd service

```apache
[root@pxe ~]# systemctl start xinetd
[root@pxe ~]# systemctl enable xinetd
[root@pxe ~]# systemctl start dhcpd.service
[root@pxe ~]# systemctl enable dhcpd.service
[root@pxe ~]# systemctl start vsftpd
[root@pxe ~]# systemctl enable vsftpd

```
In Case SELinux is enabled, then set the following selinux rule for ftp server


root@pxe ~]# setsebool -P allow_ftpd_full_access 1


Step :9
Open the ports in the OS firewall using following firewall-cmd commands

```apache
[root@pxe ~]# firewall-cmd --add-service=ftp --permanent
[root@pxe ~]# firewall-cmd --add-service=dhcp --permanent
[root@pxe ~]# firewall-cmd --add-port=69/tcp --permanent 
[root@pxe ~]# firewall-cmd --add-port=69/udp --permanent 
[root@pxe ~]# firewall-cmd --add-port=4011/udp --permanent
[root@pxe ~]# firewall-cmd --reload

```




Completed Now..
--
## References
[1] https://autostatic.com/setting-up-a-pxe-server-with-dnsmasq/
[2] 
