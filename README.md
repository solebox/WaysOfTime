# National Library Maps Project


## Download the vagrant box release
[![Download WaysOfTime](https://a.fsdn.com/con/app/sf-download-button)](https://sourceforge.net/projects/waysoftime/files/WaysOfTime/WaysOfTime_v1.0.box/download)
(hope you know how to use this. if not please post an issue)

## cloning
    git clone --recursive git@github.com:soleboxy/WaysOfTime.git 
## Development

There is a vagrantfile you can use.
First clone the project, and type `vagrant up` to get and install the virtual machine
After that runs, type `vagrant ssh` to login.

Now type `cd /srv/Maps` and migrate the db with the command `python manage.py migrate`, then start python server by typing `python manage.py runserver 0:8000&` and enter [http://localhost:8000](http://localhost:8000) to see if it's worked.

Create a admin user with the command `python manage.py createsuperuser` and follow the instructions in the terminal. After you finish the inserucations enter to [http://localhost:8000/admin](http://localhost:8000/admin) and login.

Now type `cd /srv/mapwarper` and then start the rails server by typing `rails s -b 0.0.0.0 -p 3000&` and enter [http://localhost:3000](http://localhost:3000) to see if it's worked.

Now we need to create a new user in the postgress database so type `rails c` and then create a new user:
```
user = User.new
user.login = "super"
user.email = "super@superxyz123.com"
user.password = "12345678"
user.password_confirmation = "12345678"
user.save

```
When you'll type the last command (`user.save`) there'll be a url in the console output, copy it to the browser to activate the user, and try to login to the system.

## contributing 
[contributing](https://github.com/soleboxy/WaysOfTime/blob/master/CONTRIBUTING.md)
