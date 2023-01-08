import { readdir } from 'fs/promises';
import { join } from 'path';

export async function* globScripts(path: string): AsyncGenerator<string> {
    const files = await readdir(path, { withFileTypes: true });
    for (const file of files) {
        const childPath = join(path, file.name);
        if (file.isDirectory()) {
            yield* globScripts(childPath);
        } else if (file.name.endsWith('.js') || file.name.endsWith('.ts')) {
            yield childPath;
        }
    }
}

export async function mapScripts<Ret>(
    path: string,
    mapper: (item: string) => Promise<Ret>
): Promise<Ret[]> {
    const files = globScripts(path);
    const array = [] as Promise<Ret>[];
    for await (const file of files) {
        array.push(mapper(file));
    }
    return await Promise.all(array);
}
