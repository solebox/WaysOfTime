#!/usr/bin/bash
function create_user {
	local login=$1
	local email=$2
	local password=$3
	echo "creating user with login info:  $email , password $password"
	echo "please confirm his registration by starting the rails server and going to: "
	echo "User.new(:login=>\"$login\",:email=>\"$email\",:password=>\"$password\",:password_confirmation=>\"$password\").save" | bundle exec rails c 2>&1 |grep Confirm |awk -F'\"' '{print $2}'
}
