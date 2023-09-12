import { getTFiles } from '$lib/server/getDir.js';
import path from 'path';

export async function load() {
    const filePath = path.join(process.cwd(), "/files");
    const directory = await getTFiles(filePath);
    return {
        directory
    }
}