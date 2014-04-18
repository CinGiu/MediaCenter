#!/bin/bash
SERVICE='transmission'
 
if ps ax | grep -v grep | grep $SERVICE > /dev/null
then
    echo "Attivo"
else
    echo "Disattivo"
fi
