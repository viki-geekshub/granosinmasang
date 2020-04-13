
const nodemailer = require('nodemailer');  // Importo el nodemailer que hemos instalado. Es para enviar mails
const env = process.env.NODE_ENV || 'development'; // Le indico que debe ir al entorno de desarrollo y no a ninguno de los otros dos.
const { GMAIL } = require('../config/config.json')[env]; // Me importo el GMAIL del config.json desestructurandolo

let transporter = nodemailer.createTransport({ // Creo la función de transporte, la que se encargará de enviar el mail de confirmación mediante el nodemailer
    service:"Gmail", // Le decimos el servicio con el que lo hará (en lugar del dominio "host", en este caso utilizaremos el servicio de gmail)
    secure: true, // Le decimos que será "true" siempre para gmail
    auth: GMAIL  // Le indicamos desde que mail hará el envío. Le pasamos el objeto GMAIL con las credenciales del mail y la contraseña que hemos guardado previamente en el config.json.
});

module.exports = transporter; // Exporto el transporter

