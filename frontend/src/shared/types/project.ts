import { ID, ISODateString } from './common';

export type Project = {
    id: ID;
    name: string;
    color?: string | null;
    icon?: string | null;
    path: string;
    git: {
        isRepo: boolean;
        defaultBranch?: string | null;
        lastKnownBranch?: string | null;
        remoteUrl?: string | null;
    }
    editor: {
        command: string;
        args?: string[] | null;
    }

    createdAt: ISODateString;
    updatedAt: ISODateString;
    lastOpenedAt?: ISODateString | null;

    pinned: boolean;
    archived: boolean;

    templateID: ID | null;
}

