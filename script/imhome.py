import subprocess
import urllib2, urllib

#number of device in your home
nodiyh=3
username='TRANSMISSION_USER'
password='TRANSMISSION_PASSWORD'

output=subprocess.check_output(['nmap','-sn', '-n', '-T5', '192.168.1.1/24'])

num=output.split('Nmap done')[1].split('(')[1].split(' ')[0]
num=int(num)

if(num<=nodiyh):
	print('Tolgo limite banda')
	subprocess.call(['transmission-remote','--auth', username+':'+password, '-AS'])
	#transmission-remote --auth transmission:valar?morghulis -l -astransmission-remote --auth user:password -l -as
else:
	print('Siete connessi in '+str(num)+' lascio il limite')

#print(num)
