"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import NavigationHeader from "@/components/layout/NavigationHeader";
import Sidebar from "@/components/layout/Sidebar";
import ViewModuleToggler from "@/components/planner/ViewModuleToggler";
import { ViewMode } from "@/types";
import { Box, Flex } from "@chakra-ui/react";
import CalendarView from "@/components/planner/CalenderView";
import RosterTable from "@/components/planner/RosterTable";
import { events as sampleEvents } from "@/data";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("live");
  const [events, setEvents] = useState(sampleEvents);

  const handleViewModeChange = (mode: ViewMode): void => {
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

          <Flex>
            <RosterTable />
            <CalendarView
              viewMode={viewMode}
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
