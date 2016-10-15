#!/usr/bin/env bash
apt-get update
pushd /srv/mapwarper
chmod +x ./lib/vagrant/provision.sh
./lib/vagrant/provision.sh
popd
pushd /srv/Maps
sudo apt-get install -y python python-pip python-dev build-essential libpq-dev python3-dev
popd
sudo pip install -r requirements.txt
pushd /srv/mapwarper
source lib/vagrant/create_user.sh
create_user "test" "test@gmail.com" "moomoocow123"
popd
