"use client";

import { Box, HStack, Text, Icon, Menu, Flex } from "@chakra-ui/react";
import { FiChevronDown, FiPlus } from "react-icons/fi";

export default function NavigationHeader() {
  return (
    <Flex
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      py={3}
      px={6}
      left="250px"
      justifyContent="space-between"
    >
      <Text fontSize="xl" fontWeight="bold">
        Planner
      </Text>

      <HStack gap={5}>
        <Menu.Root>
          <Menu.Trigger
            cursor="pointer"
            borderRadius="md"
            _hover={{ bg: "gray.100" }}
            px={2}
            py={1}
            border="none"
            bg="transparent"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon as={FiChevronDown} boxSize={4} color="gray.500" />
            <Text fontSize="sm" fontWeight="600">
              Open Days
            </Text>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="profile">Profile</Menu.Item>
              <Menu.Item value="settings">Settings</Menu.Item>
              <Menu.Separator />
              <Menu.Item value="logout">Logout</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>

        <Menu.Root>
          <Menu.Trigger
            cursor="pointer"
            borderRadius="md"
            _hover={{ bg: "gray.100" }}
            px={2}
            py={1}
            border="none"
            bg="transparent"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <HStack cursor="pointer">
              <Icon as={FiPlus} boxSize={4} color="gray.500" />
              <Text fontSize="sm" fontWeight="600">
                Nieuw
              </Text>
              <Icon as={FiChevronDown} boxSize={4} color="gray.500" />
            </HStack>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="profile">Profile</Menu.Item>
              <Menu.Item value="settings">Settings</Menu.Item>
              <Menu.Separator />
              <Menu.Item value="logout">Logout</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </HStack>
    </Flex>
  );
}
