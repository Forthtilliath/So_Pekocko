const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose
    .connect(
        'mongodb+srv://superadmin:8mnmvqUj6CTvtjGi@cluster0.1qjb5.mongodb.net/So_Pekocko?retryWrites=true&w=majority',
        // 'mongodb+srv://admin:HA6PTCyysB45ZvL8@cluster0.1qjb5.mongodb.net/So_Pekocko?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true },
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
