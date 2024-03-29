import { fetch } from 'node-fetch-native';
import { CommandMap } from '@/Commands';
const { KEY_CDN, KEY_CDN_URL } = process.env;

export async function postCommands() {
    const commands = await CommandMap;
    const data = JSON.stringify(commands, null, 4);
    fetch(KEY_CDN_URL as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': KEY_CDN as string,
        },
        body: data,
    }).then((res) => {
        if (res.status !== 200) {
            console.error('Failed to post commands to the CDN!');
            console.error(res);
        }
    });

    console.info('Commands have been posted to the CDN!');
}
