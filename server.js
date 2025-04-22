const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tu-email@gmail.com',
            pass: 'tu-contraseña-de-app', // Utiliza una contraseña de aplicación para mayor seguridad
        },
    });

    const mailOptions = {
        from: email,
        to: 'salaagolden@gmail.com',
        subject: `Nuevo mensaje de ${nombre}`,
        text: mensaje,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo');
        } else {
            res.status(200).send('Correo enviado correctamente');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
