export type ViewMode = 'live' | 'planner';

export type PlannerEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  user: string;
  column: string;
  color: string;
};
