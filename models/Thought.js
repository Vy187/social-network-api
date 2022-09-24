const { Schema, model } = require(`mongoose`);

const reactionSchema = new Schema(
    {
        reaactionId: {
            type: ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            type: String,
            require: true,
            max_length: 200
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: `User`
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText : {
            type: String,
            require: true,
            max_length: 200
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: `User`
            }
        ],
        reactions: [reactionSchema]
    }
);

thoughtSchema
    .virtual(`reactionCount`)
    .get(() => { return this.reactions.length });

const Thought = model(`thought`, thoughtSchema);

module.exports = Thought;