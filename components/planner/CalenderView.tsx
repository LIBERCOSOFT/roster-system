"use client";

import { Box, Grid, Text } from "@chakra-ui/react";
// import { events } from "@/data";
// import PlannerEventCard from "./PlannerEventCard";

const columns = [
  "Days",
  "Behandelingkamer1",
  "Management",
  "Bijzonderheden-Verlof-Cursus-BZV",
  "Financien",
];

const times = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];

export default function CalendarView() {
  return (
    <Box flex="1" overflow="auto" m={6} borderRadius="2xl">
      <Grid
        templateColumns={`120px repeat(${columns.length - 1}, 1fr)`}
        position="relative"
      >
        {columns.map((col) => (
          <Box
            key={col}
            p={3}
            bg="gray.100"
            borderRight="1px solid"
            borderColor="gray.200"
            fontWeight="medium"
            textAlign="center"
          >
            {col}
          </Box>
        ))}

        {times.map((t) => (
          <>
            <Box
              key={`time-${t}`}
              h="100px"
              borderTop="1px solid"
              borderRight="1px solid"
              borderColor="gray.200"
              px={2}
              py={1}
            >
              <Text fontSize="sm" color="gray.500">
                {t}
              </Text>
            </Box>

            {columns.slice(1).map((col) => (
              <Box
                key={`${t}-${col}`}
                h="100px"
                borderTop="1px solid"
                borderRight="1px solid"
                borderColor="gray.200"
                position="relative"
              />
            ))}
          </>
        ))}

        {/* {events.map((e) => (
          <PlannerEventCard key={e.id} event={e} />
        ))} */}
      </Grid>
    </Box>
  );
}
