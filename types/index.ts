export type ViewMode = 'live' | 'planner';

export type PlannerEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  user: string;
  column: string;
  color: string;
  date?: string; // ISO date string, optional for time-only events
};
