"use client";

import {
  Box,
  HStack,
  Text,
  Icon,
  Menu,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { Element3, Setting2, Notification } from "iconsax-reactjs";
import { FiChevronDown } from "react-icons/fi";

export default function Header() {
  return (
    <Box
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={6}
      py={3}
      position="fixed"
      top={0}
      left="250px"
      right={0}
      zIndex={10}
    >
      <HStack justify="flex-end">
        <IconButton aria-label="Grid view">
          <Element3 size="24" />
        </IconButton>
        <IconButton aria-label="Settings">
          <Setting2 size="24" />
        </IconButton>
        <Box position="relative">
          <IconButton aria-label="Notifications">
            <Notification size="24" />
          </IconButton>
          <Badge
            position="absolute"
            top="8px"
            right="8px"
            colorScheme="red"
            borderRadius="full"
            w="8px"
            h="8px"
            p={0}
          />
        </Box>

        <Menu.Root>
          <Menu.Trigger asChild>
            <HStack cursor="pointer">
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="600">
                  Paul Cornelius
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Paul@dotrot.com
                </Text>
              </Box>
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
    </Box>
  );
}
