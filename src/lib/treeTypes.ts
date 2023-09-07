export type FolderType = {
    name: string;
    id: string;
    folders?: FolderType[];
    files?: AFile[];
}

export type AFile = {
    name: string;
    id: string;
}

export type TreeStructure = {
    files?: AFile[]
    folders: FolderType[]
}