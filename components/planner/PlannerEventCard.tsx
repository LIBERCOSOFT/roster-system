"use client";

import { Box, Text, Popover } from "@chakra-ui/react";
import { PlannerEvent } from "@/types";

const pxPerMinute = 1.2;
const startHour = 11;

function minutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export default function PlannerEventCard({ event }: { event: PlannerEvent }) {
  const top = (minutes(event.start) - startHour * 60) * pxPerMinute + 48;
  const height = (minutes(event.end) - minutes(event.start)) * pxPerMinute;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Box
          position="absolute"
          left="120px"
          top={`${top}px`}
          h={`${height}px`}
          w="220px"
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
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Body>
            <Text fontWeight="bold">{event.title}</Text>
            <Text>{event.user}</Text>
            <Text fontSize="sm">
              {event.start} – {event.end}
            </Text>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
