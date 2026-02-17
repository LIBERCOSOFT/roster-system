"use client";

import { Box, Text } from "@chakra-ui/react";
import { PlannerEvent } from "@/types";

export default function PlannerEventCard({ event }: { event: PlannerEvent }) {
  return (
    <Box
      bg="white"
      borderLeft={`4px solid ${event.color}`}
      rounded="md"
      shadow="sm"
      p={2}
      cursor="pointer"
    >
      <Text fontWeight="medium" fontSize="sm">
        {event.title}
      </Text>
      <Text fontSize="xs" color="gray.500">
        {event.start} – {event.end}
      </Text>
      <Text fontSize="xs">{event.user}</Text>
    </Box>
  );
}
