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
