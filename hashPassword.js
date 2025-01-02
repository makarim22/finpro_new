const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = [  
    { username: 'john_doe', password: 'password123' },  
    { username: 'jane_smith', password: 'password456' },  
    { username: 'alice_jones', password: 'password789' },  
    { username: 'bob_brown', password: 'password321' },  
    { username: 'charlie_black', password: 'password654' },  
];  

async function hashPasswords() {  
    for (const user of users) {  
        const hashedPassword = await bcrypt.hash(user.password, 10);  
        console.log(`Username: ${user.username}, Hashed Password: ${hashedPassword}`);  
    }  
}  

hashPasswords();