import fs from 'fs/promises';

export const readJSON = async <T>(filePath: string): Promise<T> => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export const writeJSON =async <T>(filePath: string, data: T): Promise<void> => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}