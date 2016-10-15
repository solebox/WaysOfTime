#!/usr/bin/env bash
apt-get update
sed -ie 's/apt-get/apt-get\ --force-yes/' /srv/mapwarper/lib/vagrant/provision.sh #patch for mapwarper provision file
pushd /srv/mapwarper
chmod +x ./lib/vagrant/provision.sh
./lib/vagrant/provision.sh
popd
pushd /srv/Maps
sudo apt-get install -y python python-pip python-dev build-essential libpq-dev python3-dev --force-yes
popd
pushd /srv
sudo pip install -r requirements.txt
popd
pushd /srv/mapwarper
source lib/vagrant/create_user.sh
create_user "test" "test@gmail.com" "moomoocow123"
popd
