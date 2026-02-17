"use client";

import { Box, VStack, Text, Badge } from "@chakra-ui/react";

export default function RosterTable() {
  return (
    <Box
      w="320px"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      p={4}
    >
      <Text fontWeight="bold" mb={4}>
        Roster
      </Text>
      <VStack align="stretch">
        <Box
          p={3}
          border="1px solid"
          borderColor="gray.200"
          rounded="lg"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("text/user", "Elijah Oyin")
          }
        >
          <Text fontWeight="medium">Elijah Oyin</Text>
          <Badge colorScheme="red">On leave</Badge>
        </Box>

        <Box
          p={3}
          border="1px solid"
          borderColor="gray.200"
          rounded="lg"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/user", "Diane Lane")}
        >
          <Text fontWeight="medium">Diane Lane</Text>
          <Badge colorScheme="red">On leave</Badge>
        </Box>
      </VStack>
    </Box>
  );
}
