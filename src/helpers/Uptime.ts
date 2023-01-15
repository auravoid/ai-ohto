import { fetch } from 'node-fetch-native';
const { KEY_UPTIME_URL } = process.env;

export async function postUptime(ping: number) {
    await fetch((KEY_UPTIME_URL as string) + ping);
}
