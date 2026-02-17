"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import NavigationHeader from "@/components/layout/NavigationHeader";
import Sidebar from "@/components/layout/Sidebar";
import ViewModuleToggler from "@/components/planner/ViewModuleToggler";
import { ViewMode } from "@/types";
import { Box, Flex } from "@chakra-ui/react";
import FilterSortControls from "@/components/planner/FilterSortControls";
import CalendarView from "@/components/planner/CalenderView";
import RosterTable from "@/components/planner/RosterTable";
import { events as sampleEvents } from "@/data";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("live");
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );
  const [events, setEvents] = useState(sampleEvents);

  useEffect(() => {
    // switch default date depending on view mode
    if (viewMode === "live") {
      setCurrentDate(new Date().toISOString().slice(0, 10));
    } else {
      // planner: default to next month start
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      d.setDate(1);
      setCurrentDate(d.toISOString().slice(0, 10));
    }
  }, [viewMode]);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box ml="250px" flex="1">
        <Header />
        <Box mt="60px">
          <NavigationHeader />
          <ViewModuleToggler
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
          <FilterSortControls
            currentDate={currentDate}
            onPrev={() => {
              const d = new Date(currentDate);
              d.setMonth(d.getMonth() - 1);
              setCurrentDate(d.toISOString().slice(0, 10));
            }}
            onNext={() => {
              const d = new Date(currentDate);
              d.setMonth(d.getMonth() + 1);
              setCurrentDate(d.toISOString().slice(0, 10));
            }}
            onToday={() =>
              setCurrentDate(new Date().toISOString().slice(0, 10))
            }
          />
          <Flex>
            <RosterTable />
            <CalendarView
              viewMode={viewMode}
              currentDate={currentDate}
              events={events}
              onAddEvent={(e) => setEvents((prev) => [...prev, e])}
              onUpdateEvent={(updated) =>
                setEvents((prev) =>
                  prev.map((p) => (p.id === updated.id ? updated : p)),
                )
              }
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
