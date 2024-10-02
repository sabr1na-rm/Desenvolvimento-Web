const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seuemail@gmail.com', // Insira seu e-mail
        pass: 'suasenha' // Insira a senha do seu e-mail ou senha de aplicativo
    }
});

// Rota para processar o formulário e enviar e-mail
app.post('/send-email', (req, res) => {
    const { name, email } = req.body;
    const verificacacod = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
        from: 'seuemail@gmail.com',
        to: email,
        subject: 'Código de Verificação',
        text: `Olá ${name}, seu código de verificação é: ${verificacacod}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error); // Log detalhado do erro
            return res.status(500).send('Erro ao enviar e-mail: ' + error.message); // Resposta com a mensagem de erro
        }
        console.log('E-mail enviado: ' + info.response);
        res.status(200).send('E-mail enviado com sucesso!');
    });
});

// Configuração do servidor para rodar na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});