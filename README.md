supernova
=========

A front end to the Darkstar FFXI emulator

Setting Up
==========

There are a few minor steps to get this UI up and running.

* Install nodejs and npm
* Run `git clone https://github.com/DarkstarProject/dspweb.git`
* Go into the dspweb directory and run `npm install`
* Edit `conf/config.js` and setup the `db` section.
* Edit `conf/config.js` and setup the `site` section

> Make sure that you are using a username/password that has access to the dspdb database

Configuration
=============
The `conf/config.js` file should be something like below.  Eventually we'll transition this a wiki page and fully describe the options.

<pre>
module.exports = {
    db: {
        connectionLimit : 10,
        database        : 'dspdb',
        host            : 'localhost',
        port            : 3306,
        user            : 'root',
        password        : ''
    },
    site: {
        name: "Guild Name",
        message: "Message to display on the index page!"
    }
};
</pre>

Accessing
=========

You should be able to access your server on port 3000.  For example, if your server is 192.168.1.1 then you should be able to access http://192.168.1.1:3000.  You can login using your same account credentials that you use to login through your launcher.

If you would like to change the port, you can set the port manually in the `bin/www` file and change the port from 3000 to another port.
