"use client";

import { Box, Button, Flex, HStack, Icon, Menu, Text } from "@chakra-ui/react";
import { Filter, People } from "iconsax-reactjs";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { FiChevronDown, FiPlus } from "react-icons/fi";

interface Props {
  currentDate?: string;
  onPrev?: () => void;
  onNext?: () => void;
  onToday?: () => void;
}

export default function FilterSortControls({
  currentDate,
  onPrev,
  onNext,
  onToday,
}: Props) {
  const date = currentDate ? new Date(currentDate) : new Date();
  const dayLabel = date.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
  });
  const monthLabel = date.toLocaleString(undefined, {
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <Flex justifyContent="space-between" m={6}>
        <HStack bg="white" py={2}>
          <Text
            fontSize="sm"
            fontWeight="600"
            border="1px solid"
            borderRadius="full"
            borderColor="gray.200"
            px={2}
            py={1}
          >
            {dayLabel}
          </Text>
          <Text fontSize="lg" fontWeight="600">
            {monthLabel}
          </Text>
        </HStack>

        <HStack gap={3}>
          <Icon
            as={People}
            boxSize={7}
            color="gray.600"
            cursor="pointer"
            border="1px solid"
            borderRadius="md"
            borderColor="gray.200"
            p={1}
          />
          <Icon as={Filter} boxSize={5} color="gray.600" cursor="pointer" />
          <Button size="sm" variant="outline" onClick={onPrev}>
            <BiLeftArrow />
          </Button>
          <Button size="sm" variant="outline" onClick={onToday}>
            Current Day
          </Button>
          <Button size="sm" variant="outline" onClick={onNext}>
            <BiRightArrow />
          </Button>
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
              <Text fontSize="sm" fontWeight="600">
                This Day
              </Text>
              <Icon as={FiChevronDown} boxSize={4} color="gray.500" />
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
          <Button size="sm" variant="outline">
            Publish All
          </Button>
          <Button size="sm" variant="outline">
            <Icon as={FiPlus} boxSize={4} color="gray.500" />
            Lock Shift
          </Button>
        </HStack>
      </Flex>
    </>
  );
}
