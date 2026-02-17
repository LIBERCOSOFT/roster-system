"use client";

import { PlannerProps } from "@/types";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

export default function ViewModuleToggler({
  viewMode,
  onViewModeChange,
}: PlannerProps) {
  return (
    <>
      <Box
        border="1px solid"
        borderRadius="full"
        borderColor={viewMode === "live" ? "red.500" : "blue.500"}
        m={6}
        bg={viewMode === "live" ? "red.50" : "blue.50"}
      >
        <HStack px={6} py={1}>
          <HStack bg="white" borderRadius="full" border="none" p={1}>
            <Button
              size="sm"
              variant={viewMode === "live" ? "solid" : "ghost"}
              bg={viewMode === "live" ? "red.500" : "transparent"}
              borderRadius="full"
              onClick={() => onViewModeChange("live")}
              py={1}
              px={4}
            >
              Live
            </Button>
            <Button
              size="sm"
              variant={viewMode === "planner" ? "solid" : "ghost"}
              bg={viewMode === "planner" ? "blue.500" : "transparent"}
              borderRadius="full"
              onClick={() => onViewModeChange("planner")}
              py={1}
              px={4}
            >
              Planner
            </Button>
          </HStack>
          <Text fontSize="sm" color="gray.600" ml={4}>
            Description of the {viewMode}
          </Text>
        </HStack>
      </Box>
    </>
  );
}
