const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Punkt końcowy dla dodawania notatek
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    // Tutaj dodaj logikę dodawania notatki do bazy danych
    // Przykładowo, można skorzystać z ORM, takiego jak Sequelize lub Mongoose

    // Po dodaniu notatki, zwróć odpowiedź
    res.json({ success: true, message: 'Note added successfully' });
});

// Uruchom serwer na określonym porcie
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
