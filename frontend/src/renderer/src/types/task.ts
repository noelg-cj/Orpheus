import { ID, ISODateString } from './common';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
    id: ID;
    projectId: ID;

    title: string;
    description?: string | null;
    status: TaskStatus;
    priority?: TaskPriority;
    setOrder: number;
    dueDate? : ISODateString | null;
    createdAt: ISODateString;
    updatedAt: ISODateString;
    completedAt?: ISODateString | null;

    linkedBranch?: string | null;
    linkedIssueRef?: string | null;
}