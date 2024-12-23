const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para manejar JSON y archivos estáticos
app.use(express.json());
app.use(express.static('public'));

// Ruta para obtener las obras
app.get('/api/obras', (req, res) => {
    fs.readFile('obras.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error leyendo las obras.');
        }
        const obras = JSON.parse(data);
        res.json(obras);
    });
});

// Ruta para subir nuevas obras
app.post('/api/obras', (req, res) => {
    const nuevaObra = req.body;

    fs.readFile('obras.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error leyendo las obras.');
        }

        const obras = JSON.parse(data);
        obras.push(nuevaObra);

        fs.writeFile('obras.json', JSON.stringify(obras), (err) => {
            if (err) {
                return res.status(500).send('Error guardando la obra.');
            }
            res.status(201).send('Obra subida correctamente.');
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
