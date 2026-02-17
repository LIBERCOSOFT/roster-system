"use client";

import { Box, HStack, Text, Icon, Menu, IconButton } from "@chakra-ui/react";
import { Setting2, Notification, Category } from "iconsax-reactjs";
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
        <IconButton
          aria-label="Grid view"
          color="#5653FC"
          borderRadius="md"
          bg="#F6FAFD"
        >
          <Category size="24" />
        </IconButton>
        <IconButton
          aria-label="Settings"
          color="#2D3648"
          borderRadius="md"
          bg="#F6FAFD"
        >
          <Setting2 size="24" />
        </IconButton>
        <Box position="relative">
          <IconButton
            aria-label="Notifications"
            color="#2D3648"
            borderRadius="md"
            bg="#F6FAFD"
            fontWeight="bold"
          >
            <Notification size="24" />
          </IconButton>
          <Box
            position="absolute"
            top="3"
            right="3"
            w="2.5"
            h="2.5"
            bg="red.500"
            borderRadius="full"
            border="2px solid white"
            transform="translate(25%, -25%)"
            zIndex="1"
          />
        </Box>

        <Menu.Root>
          <Menu.Trigger ml={20}>
            <HStack cursor="pointer">
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="600">
                  Paul Cornelius
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Paul@dotrot.com
                </Text>
              </Box>
              <Icon as={FiChevronDown} boxSize={4} ml={4} color="gray.500" />
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
