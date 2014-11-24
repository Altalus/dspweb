supernova
=========

A front end to the Darkstar FFXI emulator

Setting Up
==========

There are a few minor steps to get this UI up and running.

* Install nodejs and npm
* Run `git clone https://github.com/DarkstarProject/dspweb.git`
* Go into the dspweb directory and run `npm install`
* Edit `lib/db-pool.js` and point to the darkstar database installation
* Brand your server, edit `app.js` and modify the `app.locals` variable at the bottom.  See below for the options.

> Make sure that you are using a username/password that has access to the dspdb database

app.locals
==========

<pre>
site: {
    name: "Your guild name here",
    message: "A message that you want to display to everyone on the index page!"
}
</pre>

Accessing
=========

You should be able to access your server on port 3000.  For example, if your server is 192.168.1.1 then you should be able to access http://192.168.1.1:3000.  You can login using your same account credentials that you use to login through your launcher.

If you would like to change the port, you can set the port manually in the `bin/www` file and change the port from 3000 to another port.
