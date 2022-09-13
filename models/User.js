const  { Schema, model } = require(`mongoose`);

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            require: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            unique: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: `Thought`
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: `User`
            }
        ]
    }
);

userSchema
    .virtual(`friendCount`)
    .get(() => { return this.friends.length });

const User = model(`user`, userSchema);

module.exports = User;