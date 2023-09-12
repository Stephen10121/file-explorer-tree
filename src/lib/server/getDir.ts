import fs from "fs";

async function fileInfo(fileLocation: string) {
    try {
    let stats = await fs.promises.stat(fileLocation);
    let data = {
        dateCreated: stats.birthtime.toString().split(":")[0].slice(0, -3),
        size: stats.size
    }
    return data;
    } catch (err) {
        console.log(err);
        return { status: 500 };
    }
};

async function getFiles(directoryPath: string) {
    let size = 0
    try {
        await fs.promises.access(directoryPath);
    } catch (err) {
        try {
            await fs.promises.mkdir(directoryPath);
            const tfiles = await getTFiles(directoryPath);
            size += tfiles.size;
            return {files: tfiles.allFiles, fileSize: size};
        } catch (err) {
            throw err;
        }
    }
    const tfiles = await getTFiles(directoryPath);
    size += tfiles.size;
    return {files: tfiles.allFiles, fileSize: size};
}

export async function getTFiles(directoryPath: string) {
    let size = 0;
    let allFiles: any = {
        G_files: []
    }
    const files = await fs.promises.readdir(directoryPath, { withFileTypes: true });
    for (const item of files) {
        if (item.isDirectory()) {
            const { files, fileSize } = await getFiles(`${directoryPath}/${item.name}`);
            allFiles[item.name] = files;
            size += fileSize;
        } else {
            const currentFileInfo = await fileInfo(`${directoryPath}/${item.name}`);
            //@ts-ignore
            if (currentFileInfo.status) continue;
            //@ts-ignore
            size += currentFileInfo.size;
            allFiles.G_files.push({ name: item.name, metadata: currentFileInfo });
        }
    }
    return { allFiles, size };
}