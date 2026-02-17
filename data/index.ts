import { PlannerEvent } from "@/types";

export const events: PlannerEvent[] = [
  {
    id: "1",
    title: "Surgery",
    start: "11:00",
    end: "13:00",
    user: "Haico de Gast",
    column: "Behandelkamer1",
    date: new Date().toISOString().slice(0, 10),
    color: "#F97316",
  },
  {
    id: "2",
    title: "Pijnspecialist",
    start: "11:00",
    end: "12:00",
    user: "Diane Lane",
    column: "Behandelkamer1",
    date: new Date().toISOString().slice(0, 10),
    color: "#22C55E",
  },
];
