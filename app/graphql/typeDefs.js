module.exports = `
    type Query {
        member(id: Int!): Member
    }

    type Member {
        first_name: String,
        last_name: String,
        email: String,
        role: String,
        incomes: [Income]
    }

    type Income {
        intern_ref: String,
        label: String,
        amount: Float,
        date: String
    }
`