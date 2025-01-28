import { hash } from 'bcrypt';

export const doHash = (value, saltValue) => {
    const result = hash(value, saltValue);
    return result;
}