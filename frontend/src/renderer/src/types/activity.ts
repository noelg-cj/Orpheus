import type { ID, ISODateString } from './common';

export type ActivityType =
  | "task_created"
  | "task_completed"
  | "task_updated"
  | "project_created"
  | "project_opened"
  | "git_commit"
  | "git_branch_checked_out"
  | "git_pushed"
  | "git_pulled";

export type Activity = {
    id: ID;
    projectID: ID | null;
    type: ActivityType;
    timestamp: ISODateString;
    payload: Record<string, any>;
}

export type ActivityFile = {
    version: 1;
    activities: Activity[];
}