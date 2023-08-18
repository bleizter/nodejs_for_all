# nodejs_for_all
node js connection to mariadb, postgresql and mongodb

### untuk mongodb
1. check versi mongodb pada device yang digunakan
    a. buka shell script kemudian run -> db.runCommand( { buildInfo: 1 } )
    b. check driver yg cocok di https://mongoosejs.com/docs/compatibility.html
2. npm i mongoose version

# running
1. clone
2. buat file .env di root dan sesuaikan dengan konfigurasi pada device masing-masing (format .env sama seperti .env.example)
3. npm install
4. untuk running (npm run dev), pakai nodemon juga bisa
