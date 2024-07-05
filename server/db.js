const mongoose = require('mongoose')

var mongoURL = 'mongodb+srv://zainarfeen87:XNyh5tjYgOKY4MBT@sample.fh9zpdj.mongodb.net'

// stripe - client: pk_test_51OHpwDAQGIQYXRjhC0POSJmj8TZeI2gYYfjaT5519G3FVwZTPZgtkzvynRuKXe7DNGYs2cAjMyNVsDqJUlHtlaob009k9O137T
// stripe - server: sk_test_51OHpwDAQGIQYXRjhU8d2ScTIOlO7r0QVb7WRVYAZOls49h7gDijeyL3CBKb0MlXkVBPhyffpHwdI6cqbAVP2Dme300e33VMM48

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Database connection failed')
})

connection.on('connected', () => {
    console.log('Database connected successfully')
})

module.exports = mongoose;