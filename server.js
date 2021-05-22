// Dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// require dotenv and call cofig
require('dotenv').config()

const apitoken = process.env.ZENDESK_API_TOKEN

// Schema
const schema = buildSchema(`
# schema here
type Test {
	message: String!
}

type Ticket {
    requester_id: Int!
    assignee_id: Int!
    subject: String
    description: String
    tags: [String]
}
`)

// Resolver
const root = {
    getAllTickets: () => {
        console.log(Tickets)
        return Tickets
    },
    ticketDetail: (requester_id) => {
        const detail = Tickets[requester_id]
        console.log(detail)
        return detail
    }
}

// Express App
const app = express()

// GraphQL Route
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// Start this app
const port = 4000
app.listen(port, () => {
  console.log('Running on port:'+port)
})
