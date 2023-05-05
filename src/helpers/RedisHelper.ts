// Import redis and set it up
import { createClient } from 'redis';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const client = createClient({
    url: `redis://default:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
});

client.connect();

client.on('connect', () => {
    console.log('Connected to Redis server');
});

client.on('error', (err) => {
    console.error('Error connecting to Redis server:', err);
});

/**
 * @description - Helper to set a key value pair in redis must be JSON
 * @param key {any} - The key to set
 * @param value {any} - The value to set
 * @returns The value of the key
 */
export async function set(key: string, value: string) {
    const response = await client
        .set(`bot:${key}`, value)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw new Error(err);
        });
    return response;
}

/**
 * @description - Helper to get a value from redis
 * @param key {string} - The key to get
 * @returns The value of the key
 */
export async function get(key: string) {
    const value = await client
        .get(`bot:${key}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw new Error(err);
        });
    return value;
}
/**
 * @description - Helper to delete a key value pair from redis
 * @param key {string} - The key to delete
 * @returns The value of the key
 */
export async function del(key: string) {
    const value = await client
        .del(key)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw new Error(err);
        });
    return value;
}

/**
 * @description - Helper to append a value to a key in redis
 * @param key {string} - The key to append to
 * @param value {string} - The value to append
 * @returns The value of the key
 */
export async function append(key: string, value: string) {
    const response = await client
        .append(`bot:${key}`, value)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw new Error(err);
        });
    return response;
}

/**
 *
 * @description - Helper to get all keys that match a pattern
 * @param {string} key - The key to search
 * @returns {array} - The keys that match the search
 */
export async function search(key: string) {
    const response = await client
        .keys(`bot:${key}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw new Error(err);
        });
    return response;
}

/**
 *
 * @description - Helper to get a JSON object from redis
 * @param {string} key - The key to get
 * @returns {object} - The JSON object
 */
export async function getJSON(key: string) {
    const value = await client.json
        .get(`bot:${key}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw new Error(err);
        });
    return value;
}

/**
 *
 * @description - Helper to set a JSON object in redis
 * @param {string} key - The key to set
 * @param {object} value - The JSON object to set
 * @returns {object} - The JSON object
 */
export async function setJSON(key: string, value: object) {
    const response = await client.json
        .set(`bot:${key}`, `$`, value as any)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw new Error(err);
        });
    return response;
}
