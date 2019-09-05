'use strict'

const mailer = require('nodemailer');

function sendEmail(content, mail) {
    return new Promise(function (resolve, reject) {
        let transporter = mailer.createTransport(mail.user);
        transporter.sendMail(content, function (err, result) {
            if (err) {
                let log = `Send Email Failed: \n${JSON.stringify(err)}`
                console.log(log);
                mail.report.subject = `[ ʧ�� ] ${getDate(-1)} ����ͳ�Ʒ���״̬����`
                mail.report.text = log;
                return reject(err);
            } else {
                let log = `Send Email Success: \n${JSON.stringify(result)}`
                console.log(log);
                mail.report.subject = `[ �ɹ� ] ${getDate(-1)} ����ͳ�Ʒ���״̬����`
                mail.report.text = log;
                return resolve(result);
            }
        })
    })
}



let mail = {
    sendTime: '0 0 6 * * *',
    user: {
        service: 'QQex',
        port: 465,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    },
    message: {
        from: '',
        to: [],
        cc: [],
        subject: ``
    },
    report: {
        from: '',
        to: [''],
        subject: ``,
        text: ''
    }
}

module.exports = sendEmail;