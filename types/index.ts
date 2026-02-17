export type ViewMode = 'live' | 'planner';

export type PlannerEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  user: string;
  column: string;
  color: string;
  date?: string;
};


// INTERFACES
export interface PlannerProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export interface FilterSortControlsProps {
  currentDate?: string;
  onPrev?: () => void;
  onNext?: () => void;
  onToday?: () => void;
}

export interface CalendarViewProps {
  viewMode: ViewMode;
  events: PlannerEvent[];
  onAddEvent: (e: PlannerEvent) => void;
  onUpdateEvent: (e: PlannerEvent) => void;
}