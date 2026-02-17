"use client";

import React, { useMemo, useState } from "react";
import { Box, Grid, Text, Button, VStack, Popover } from "@chakra-ui/react";
import { PlannerEvent, ViewMode } from "@/types";
import PlannerEventCard from "./PlannerEventCard";

interface Props {
  viewMode: ViewMode;
  currentDate: string;
  events: PlannerEvent[];
  onAddEvent: (e: PlannerEvent) => void;
  onUpdateEvent: (e: PlannerEvent) => void;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date: Date) {
  const start = startOfMonth(date);
  const result: Date[] = [];
  const month = start.getMonth();
  let d = new Date(start);
  while (d.getMonth() === month) {
    result.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return result;
}

function monthGridDays(date: Date) {
  const days = daysInMonth(date);
  const firstWeekday = startOfMonth(date).getDay(); // 0 (Sun) - 6 (Sat)
  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  days.forEach((d) => cells.push(d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarView({
  viewMode,
  currentDate,
  events,
  onAddEvent,
  onUpdateEvent,
}: Props) {
  const [selectedEvent, setSelectedEvent] = useState<PlannerEvent | null>(null);

  const monthDays = useMemo(() => {
    const d = new Date(currentDate);
    return monthGridDays(d);
  }, [currentDate]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, PlannerEvent[]> = {};
    events.forEach((e) => {
      const key = e.date ?? currentDate;
      if (!map[key]) map[key] = [];
      map[key].push(e);
    });
    return map;
  }, [events, currentDate]);

  function onCellDrop(ev: React.DragEvent, day: Date) {
    ev.preventDefault();
    const user = ev.dataTransfer.getData("text/user");
    if (!user) return;
    const iso = day.toISOString().slice(0, 10);
    const newEvent: PlannerEvent = {
      id: String(Date.now()),
      title: "Shift",
      start: "09:00",
      end: "17:00",
      user,
      column: "Behandelkamer1",
      color: "#60A5FA",
      date: iso,
    };
    onAddEvent(newEvent);
  }

  return (
    <Box flex="1" overflow="auto" m={6} borderRadius="2xl">
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {/* Weekday headings */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
          <Box
            key={w}
            p={2}
            textAlign="center"
            bg="gray.50"
            border="1px solid"
            borderColor="gray.100"
            rounded="md"
          >
            <Text fontSize="sm" fontWeight="600">
              {w}
            </Text>
          </Box>
        ))}

        {monthDays.map((d, idx) => {
          if (!d) {
            return (
              <Box
                key={`empty-${idx}`}
                minH="120px"
                border="1px solid"
                borderColor="gray.200"
                rounded="md"
                p={2}
                bg="gray.50"
              />
            );
          }

          const iso = d.toISOString().slice(0, 10);
          const dayEvents = eventsByDate[iso] ?? [];
          return (
            <Box
              key={iso}
              minH="120px"
              border="1px solid"
              borderColor="gray.200"
              rounded="md"
              p={2}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onCellDrop(e, d)}
            >
              <Text fontSize="sm" fontWeight="600">
                {d.getDate()}
              </Text>
              <VStack align="stretch" mt={2}>
                {dayEvents.map((ev) => (
                  <Popover.Root
                    key={ev.id}
                    open={selectedEvent?.id === ev.id}
                    onOpenChange={({ open }) =>
                      setSelectedEvent(open ? ev : null)
                    }
                  >
                    <Popover.Trigger asChild>
                      <Box
                        cursor="pointer"
                        onClick={() => setSelectedEvent(ev)}
                      >
                        <PlannerEventCard event={ev} />
                      </Box>
                    </Popover.Trigger>

                    <Popover.Positioner>
                      <Popover.Content>
                        <Popover.CloseTrigger
                          onClick={() => setSelectedEvent(null)}
                        />
                        <Popover.Arrow>
                          <Popover.ArrowTip />
                        </Popover.Arrow>
                        <Popover.Body>
                          <Popover.Title>
                            <Text fontWeight="bold">{ev.title}</Text>
                          </Popover.Title>
                          <Text mt={1}>{ev.user}</Text>
                          <Text fontSize="sm" color="gray.500" mt={1}>
                            {ev.date} — {ev.start} to {ev.end}
                          </Text>
                          <Button
                            size="sm"
                            mt={4}
                            onClick={() => setSelectedEvent(null)}
                          >
                            Close
                          </Button>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover.Positioner>
                  </Popover.Root>
                ))}
              </VStack>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}
