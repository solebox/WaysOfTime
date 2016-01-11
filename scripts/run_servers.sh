#!/bin/bash

# this is meant to be a dev only script do not use it in production

# open screen session ( but keep it detached for now ;) ) 
screen -S servers -d -m

# create run tabs 
screen -S servers -X screen -t mapwarper
screen -S servers -X screen -t viewer

# go to server dirs
screen -S servers -X -p mapwarper stuff 'cd /srv/mapwarper'$(echo -ne '\015')
screen -S servers -X -p viewer stuff 'cd /srv/viewer'$(echo -ne '\015')

# run the servers
screen -S servers -X -p mapwarper stuff 'rails s -b 0.0.0.0 -p 3000'$(echo -ne '\015')
screen -S servers -X -p viewer stuff './manage.py runserver 0.0.0.0:8000'$(echo -ne '\015')

#now attach to the screen (remember that a screen is created with one additional tab , use it for general commands , the other 2 are named and are running the servers as mentioned above) 
#screen -r servers
