import { compare, hash } from 'bcrypt';

export const doHash = (value, saltValue) => {
    const result = hash(value, saltValue);
    return result;
}

export const doHashValidation = (value, hashedValue) => {
    // console.log(value, hashedValue)
    const result = compare(value, hashedValue);
    return result;
}