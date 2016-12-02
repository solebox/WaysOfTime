# National Library Maps Project


## Download the vagrant box release
[![Download WaysOfTime](https://a.fsdn.com/con/app/sf-download-button)](https://sourceforge.net/projects/waysoftime/files/WaysOfTime/WaysOfTime_v1.0.box/download)
(hope you know how to use this. if not please post an issue)

## cloning
    git clone --recursive git@github.com:soleboxy/WaysOfTime.git 
## Development

There is a vagrantfile you can use.
First clone the project, then deploy and login.

### deploy and login:
```
vagrant up
vagrant ssh
```
### migrate and runserver: 
```
cd /srv/Maps 
python manage.py migrate 
python manage.py runserver 0:8000&
```
enter [http://localhost:8000](http://localhost:8000) to see if it worked.

### Create a admin user:
`python manage.py createsuperuser`
 follow the instructions in the terminal. After you finish the inserucations enter to [http://localhost:8000/admin](http://localhost:8000/admin) and login.

## the rails bit
### start rails
```
cd /srv/mapwarper
rails s -b 0.0.0.0 -p 3000&
```
enter [http://localhost:3000](http://localhost:3000) to see if it worked.

### create new user
Now we need to create a new user in the postgress database so type 
```
rails c
user = User.new
user.login = "super"
user.email = "super@superxyz123.com"
user.password = "12345678"
user.password_confirmation = "12345678"
user.save

```
### important laste step!
When you'll type the last command (`user.save`) there'll be a url in the console output, copy it to the browser to activate the user, and try to login to the system.

### finally
add maps to the project by using the interface at [http://localhost:3000](http://localhost:3000),
login using the username and password from the section above
and view them using http://localhost:8000

## contributing 
[contributing](https://github.com/soleboxy/WaysOfTime/blob/master/CONTRIBUTING.md)
