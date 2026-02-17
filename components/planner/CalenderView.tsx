"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Text, Button, VStack, Popover } from "@chakra-ui/react";
import { CalendarViewProps, PlannerEvent, ViewMode } from "@/types";
import PlannerEventCard from "./PlannerEventCard";
import FilterSortControls from "./FilterSortControls";
import { COLUMNS, TIME_SLOTS } from "@/utils";

export default function CalendarView({
  viewMode,
  events,
  onAddEvent,
}: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<PlannerEvent | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );

  useEffect(() => {
    if (viewMode === "live") {
      setCurrentDate(new Date().toISOString().slice(0, 10));
    } else {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      d.setDate(1);
      setCurrentDate(d.toISOString().slice(0, 10));
    }
  }, [viewMode]);

  const todaysEvents = useMemo(
    () => events.filter((e) => e.date === currentDate),
    [events, currentDate],
  );

  const eventsByCell = useMemo(() => {
    const map: Record<string, Record<string, PlannerEvent[]>> = {};
    COLUMNS.forEach((col) => {
      map[col.id] = {};
      TIME_SLOTS.forEach((slot) => {
        map[col.id][slot] = [];
      });
    });
    todaysEvents.forEach((event) => {
      const colId = event.column || "treatment";
      const start = event.start;
      if (map[colId] && map[colId][start]) {
        map[colId][start].push(event);
      }
    });
    return map;
  }, [todaysEvents]);

  const onCellDrop = (
    ev: React.DragEvent,
    columnId: string,
    timeSlot: string,
  ) => {
    ev.preventDefault();
    const user = ev.dataTransfer.getData("text/user");
    if (!user) return;
    const newEvent: PlannerEvent = {
      id: String(Date.now()),
      title: "Shift",
      start: timeSlot,
      end: getEndTime(timeSlot),
      user,
      column: columnId,
      color: "#3182CE",
      date: currentDate,
    };
    onAddEvent(newEvent);
  };

  const getEndTime = (start: string): string => {
    const [h, m] = start.split(":").map(Number);
    const endHour = h + 1;
    return `${endHour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const EventPopover = ({ event }: { event: PlannerEvent }) => (
    <Popover.Root
      open={selectedEvent?.id === event.id}
      onOpenChange={({ open }) => setSelectedEvent(open ? event : null)}
    >
      <Popover.Trigger asChild>
        <Box cursor="pointer">
          <PlannerEventCard event={event} />
        </Box>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger onClick={() => setSelectedEvent(null)} />
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Body>
            <Popover.Title>
              <Text fontWeight="bold">{event.title}</Text>
            </Popover.Title>
            <Text mt={1}>{event.user}</Text>
            <Text fontSize="sm" color="gray.500" mt={1}>
              {event.date} — {event.start} to {event.end}
            </Text>
            <Button size="sm" mt={4} onClick={() => setSelectedEvent(null)}>
              Close
            </Button>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );

  return (
    <VStack align="stretch" flex="1" h="full">
      <FilterSortControls
        currentDate={currentDate}
        onPrev={() => {
          const d = new Date(currentDate);
          d.setDate(d.getDate() - 1);
          setCurrentDate(d.toISOString().slice(0, 10));
        }}
        onNext={() => {
          const d = new Date(currentDate);
          d.setDate(d.getDate() + 1);
          setCurrentDate(d.toISOString().slice(0, 10));
        }}
        onToday={() => setCurrentDate(new Date().toISOString().slice(0, 10))}
      />

      <Box
        flex="1"
        overflow="auto"
        m={6}
        borderRadius="2xl"
        bg="white"
        shadow="sm"
      >
        <Grid
          templateColumns={`100px repeat(${COLUMNS.length}, 1fr)`}
          gap={0}
          bg="gray.50"
          borderBottom="1px solid"
          borderColor="gray.200"
          position="sticky"
          top={0}
          zIndex={1}
        >
          <Box p={3} fontWeight="bold" color="gray.600">
            Time
          </Box>
          {COLUMNS.map((col) => (
            <Box
              key={col.id}
              p={3}
              textAlign="center"
              borderLeft="1px solid"
              borderColor="gray.200"
              fontWeight="600"
            >
              {col.label}
            </Box>
          ))}
        </Grid>

        {TIME_SLOTS.map((time) => (
          <Grid
            key={time}
            templateColumns={`100px repeat(${COLUMNS.length}, 1fr)`}
            gap={0}
            borderBottom="1px solid"
            borderColor="gray.100"
            minH="60px"
          >
            <Box p={2} bg="gray.50" fontWeight="500" color="gray.700">
              {time}
            </Box>

            {COLUMNS.map((col) => {
              const cellEvents = eventsByCell[col.id]?.[time] || [];
              const showAll = cellEvents.length > 2;
              const displayedEvents = showAll
                ? cellEvents.slice(0, 2)
                : cellEvents;

              return (
                <Box
                  key={`${col.id}-${time}`}
                  p={1}
                  borderLeft="1px solid"
                  borderColor="gray.200"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onCellDrop(e, col.id, time)}
                  bg="white"
                  _hover={{ bg: "gray.50" }}
                  transition="background 0.1s"
                >
                  {displayedEvents.map((ev) => (
                    <EventPopover key={ev.id} event={ev} />
                  ))}
                  {showAll && (
                    <Popover.Root>
                      <Popover.Trigger asChild>
                        <Text
                          fontSize="xs"
                          color="blue.500"
                          fontWeight="medium"
                          cursor="pointer"
                          mt={1}
                          textAlign="center"
                        >
                          See all
                        </Text>
                      </Popover.Trigger>
                      <Popover.Positioner>
                        <Popover.Content>
                          <Popover.CloseTrigger />
                          <Popover.Arrow>
                            <Popover.ArrowTip />
                          </Popover.Arrow>
                          <Popover.Body>
                            <VStack align="stretch" gap={2}>
                              {cellEvents.map((ev) => (
                                <Box
                                  key={ev.id}
                                  onClick={() => setSelectedEvent(ev)}
                                >
                                  <PlannerEventCard event={ev} />
                                </Box>
                              ))}
                            </VStack>
                          </Popover.Body>
                        </Popover.Content>
                      </Popover.Positioner>
                    </Popover.Root>
                  )}
                </Box>
              );
            })}
          </Grid>
        ))}
      </Box>
    </VStack>
  );
}
