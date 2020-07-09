import { normalize, schema } from 'normalizr';

// Define a users schema
const words = new schema.Entity('words')
export const wordSchema = [words]
export const userSchema= new
schema.Entity('users', {
    words: [wordSchema]
});

// Define your comments schema



// Define your article