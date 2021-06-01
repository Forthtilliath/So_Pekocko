const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose
    .connect(
        process.env.DATABASE_USER,
        { useNewUrlParser: true, useUnifiedTopology: true },
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
