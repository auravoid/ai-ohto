import fetch from 'node-fetch-native';
const { KEY_WEEBYAPI } = process.env;

export async function fetchGif(type: string) {
    const response = await fetch(`https://weebyapi.xyz/gif/${type}`, {
        method: 'GET',
        headers: {
            Authorization: ('Bearer ' + KEY_WEEBYAPI) as string,
        },
    });

    return await response.json();
}
