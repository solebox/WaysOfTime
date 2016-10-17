# National Library Maps Project


## cloning
    git clone --recursive git@github.com:soleboxy/WaysOfTime.git 
## Development

There is a vagrantfile you can use.
First clone the project, then enter mapwarper folder by type `cd mapwarper` and type `vagrant up` to get and install the virtual machine - this will also install pip and the libraries and depencies into the virtual machine.
After that runs, type `vagrant ssh` to login.

Now type `cd /srv/viewer` and migrate the db with the command `python manage.py migrate`, then start python server by type `python manage.py runserver 0.0.0.0:8000&` and enter [http://localhost:8000](http://localhost:8000) to see if it's worked.

Create a admin user with the command `python manage.py createsuperuser` and follow the instructions in the terminal. After you finish the inserucations enter to [http://localhost:8000/admin](http://localhost:8000/admin) and login.

Now type `cd /srv/mapwarper` and then start the rails server by type `rails s -b 0.0.0.0 -p 3000&` and enter [http://localhost:3000](http://localhost:3000) to see if it's worked.

Now we need to create a new user in the postgis database so type `rails c` and then create a new user:
```
user = User.new
user.login = "super"
user.email = "super@superxyz123.com"
user.password = "12345678"
user.password_confirmation = "12345678"
user.save

```
When you'll type the last command (`user.save`) there'll be a url in the console output, copy it to the browser to activate the user, and try to login to the system.


# mapserver python3 support (will make a script for it in the future when the mapserver initial dev is done)

git clone https://github.com/edigiacomo/mapserver.git
checkout 4560d345fb0b9980968b425794aa50ed9356707b
run the vagrant scripts (install packages , compile and all, compile harfbuzz WITH glib support)

and in the build dir use the following cmake command:
cmake   -G "Unix Makefiles" -DWITH_CLIENT_WMS=1 \
        -DWITH_CLIENT_WFS=1 -DWITH_KML=1 -DWITH_SOS=1 -DWITH_PHP=1 \
        -DWITH_PYTHON=1 -DWITH_JAVA=0 -DWITH_THREAD_SAFETY=1 \
        -DWITH_FCGI=1 -DWITH_EXEMPI=1 -DCMAKE_BUILD_TYPE=RelWithDebInfo \
        -DWITH_RSVG=1 -DWITH_CURL=1 -DWITH_FRIBIDI=1 -DWITH_HARFBUZZ=1 \
        -DPYTHON_EXECUTABLE:FILEPATH=/usr/bin/python3 \
        -DPYTHON_INCLUDE_DIR:PATH=/usr/include/python3.5 \        
        -DPYTHON_INCLUDE_PATH:PATH=/usr/include/python3.5 \
        -DPYTHON_LIBRARIES:FILEPATH=/usr/lib/x86_64-linux-gnu/libpython3.5m.so \
        ..

# pack react stuff and move result to django static dir
cd react
npm run pack
