import os from 'os';

/**
 *
 * @description - A function to format a date
 * @param uglyDate {number} - A UNIX timestamp
 * @returns {string} - A prettier date
 */
export function prettyDate(uglyDate: number): string {
    const date = new Date(uglyDate * 1000);
    const days = date.getUTCDate() - 1,
        hours = date.getUTCHours(),
        minutes = date.getUTCMinutes(),
        seconds = date.getUTCSeconds();
    const segments = [];
    if (days > 0) segments.push(days + ' day' + (days === 1 ? '' : 's'));
    if (hours > 0) segments.push(hours + ' hour' + (hours === 1 ? '' : 's'));
    if (minutes > 0)
        segments.push(minutes + ' minute' + (minutes === 1 ? '' : 's'));
    if (seconds > 0)
        segments.push(seconds + ' second' + (seconds === 1 ? '' : 's'));
    return segments.join(', ');
}

/**
 *
 * @description - A function to translate Discord ID to Timestamp
 * @param id {number} - A Discord ID
 * @param type {string} - The type of ID
 * // Types:
 * // - short-date
 * // - long-date
 * // - short-time
 * // - long-time
 * // - short-datetime
 * // - long-datetime
 * // - relative
 * @returns {string} - A Discord timestamp
 */
export function idToTimestamp(id: number, type: string) {
    if (
        ![
            'short-time',
            'long-time',
            'short-date',
            'long-date',
            'short-datetime',
            'long-datetime',
            'relative',
        ].includes(type)
    ) {
        throw new Error('Invalid type');
    }

    if (isNaN(id)) {
        throw new Error('ID is not a number');
    }

    const epoch = 1420070400000;
    const date = BigInt(id) >> 22n;
    const timestamp = Math.floor(
        (new Date(Number(date) + epoch) as unknown as number) / 1000
    );

    // Return the timestamp
    switch (type) {
        case 'short-time':
            return `<t:${timestamp}:t>`;
        case 'long-time':
            return `<t:${timestamp}:T>`;
        case 'short-date':
            return `<t:${timestamp}:d>`;
        case 'long-date':
            return `<t:${timestamp}:D>`;
        case 'short-datetime':
            return `<t:${timestamp}:f>`;
        case 'long-datetime':
            return `<t:${timestamp}:F>`;
        case 'relative':
            return `<t:${timestamp}:R>`;
    }
}

/**
 *
 * @description - A function to translate Date to Timestamp
 * @param date {Date} - A Date
 * @param type {string} - The type of ID
 * // Types:
 * // - short-date
 * // - long-date
 * // - short-time
 * // - long-time
 * // - short-datetime
 * // - long-datetime
 * // - relative
 * @returns {string} - A Discord timestamp
 */
export function dateToTimestamp(date: number, type: string): string {
    if (
        ![
            'short-time',
            'long-time',
            'short-date',
            'long-date',
            'short-datetime',
            'long-datetime',
            'relative',
        ].includes(type)
    ) {
        throw new Error('Invalid type');
    }
    if (isNaN(date)) {
        throw new Error('Date is not a number');
    }

    const timestamp = Math.floor(date / 1000);

    switch (type) {
        case 'short-time':
            return `<t:${timestamp}:t>`;
        case 'long-time':
            return `<t:${timestamp}:T>`;
        case 'short-date':
            return `<t:${timestamp}:d>`;
        case 'long-date':
            return `<t:${timestamp}:D>`;
        case 'short-datetime':
            return `<t:${timestamp}:f>`;
        case 'long-datetime':
            return `<t:${timestamp}:F>`;
        case 'relative':
            return `<t:${timestamp}:R>`;
        default:
            return `<t:${timestamp}:t>`;
    }
}

/**
 * @description - A function get the CPU usage
 * @returns {number} - The CPU usage
 */
export function getCpuPercentage() {
    const cpus = os.cpus();
    let totalIdle = 0,
        totalTick = 0;
    for (let i = 0, len = cpus.length; i < len; i++) {
        const cpu = cpus[i];
        for (const type in cpu.times) {
            // @ts-ignore TODO: Fix this
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    }
    return 100 - Math.floor((totalIdle / totalTick) * 100);
}

/**
 *
 * @description - Convert bytes to a human readable string
 * @param bytes {number} - The bytes to convert
 * @returns {string} - The human readable string
 */
export function toSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(
        Math.floor(Math.log(bytes) / Math.log(1024)) as unknown as string
    );
    if (i === 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}

/**
 * @description - Get the memory usage
 * @returns {string} - The memory usage
 */
export function getMemory() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return toSize(used * 1024 * 1024);
}
