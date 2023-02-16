const mongoose = require("mongoose"),
    User = require("./models/user"),
    usersController = require("./controllers/usersController");

mongoose.connect(
    "mongodb://127.0.0.1:27017/recipe_db",
    { useNewUrlParser: true }
);

mongoose.connection;

let contacts = [
    {
        name: {
            first: "Jon",
            last: "Wexler"
        },
        email: "jon@jonwexler.com",
        password: "boba1",
        zipCode: 10016
    },
    {
        name: {
            first: "Chef",
            last: "Egglant"
        },
        email: "eggplant@recipeapp.com",
        password: "boba2",
        zipCode: 20331
    },
    {
        name: {
            first: "Professor",
            last: "Souffle"
        },
        email: "souffle@recipeapp.com",
        password: "boba2",
        zipCode: 19103
    }
];

// Delete all signs from collection

// Subscriber.deleteMany()
//     .exec()
//     .then(() => {
//         console.log("Subscriber data is empty!");
//     });

let commands = [];

contacts.forEach((c) => {
    commands.push(usersController.create(
        usersController.validate(
            {
                name: {
                    first: c.name.first,
                    last: c.name.last,
                },
                email: c.email,
                password: c.password,
                zipCode: c.zipCode,
            },    
        )
    ));
});

Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });
