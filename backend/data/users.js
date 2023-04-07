import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Illia Horban',
        email: 'illia@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Dan Milman',
        email: 'dan@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]
export default users;