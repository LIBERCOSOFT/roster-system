"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import NavigationHeader from "@/components/layout/NavigationHeader";
import Sidebar from "@/components/layout/Sidebar";
import ViewModuleToggler from "@/components/planner/ViewModuleToggler";
import { ViewMode } from "@/types";
import { Box, Flex } from "@chakra-ui/react";
import FilterSortControls from "@/components/planner/FilterSortControls";
import CalendarView from "@/components/planner/CalenderView";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("live");

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
          <FilterSortControls />
          <CalendarView />
        </Box>
      </Box>
    </Flex>
  );
}
