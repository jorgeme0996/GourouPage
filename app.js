const  express         = require("express"),
       app             = express(),
       bodyParser      = require("body-parser"),
       nodemailer      = require("nodemailer");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html')
});

app.post('/contacto', (req, res)=>{
    const body = req.body;

    const output = `
      <h1>Tienes una nueva solicitud!!!!<h1>
      <h3> Detalles de la solicitud de: ${body.nombre} </h3> 
      <ul>
          <li>Nombre: ${body.nombre}</li>
          <li>Teléfono: ${body.tel}</li>
          <li>Descripción: ${body.descripcion}</li>
      </ul>
    `;
    
    let transporter = nodemailer.createTransport({
        host: 'kepler-oilgas.com.mx',
        port: 587,
        secure: false,
        tls:{
            rejectUnauthorized: false
        },
        auth: {
            user: 'contacto@kepler-oilgas.com.mx',
            pass: '?ra91f9V'
        }
    })

    let mailOptions = {
        from: '"Nueva Solicitud" <jorgeme0996@gmail.com>', // sender address
        to: 'jorgeme0996@gmail.com', // list of receivers
        subject: 'Nuevo Contacto', // Subject line
        html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });

    res.sendFile(__dirname + '/views/contacto.html')
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Esta vivo")
});