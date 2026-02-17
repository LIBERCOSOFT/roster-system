"use client";

import { FilterSortControlsProps } from "@/types";
import { Button, Flex, HStack, Icon, Menu, Text } from "@chakra-ui/react";
import { Filter, People } from "iconsax-reactjs";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { FiChevronDown, FiPlus } from "react-icons/fi";

export default function FilterSortControls({
  currentDate,
  onPrev,
  onNext,
  onToday,
}: FilterSortControlsProps) {
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
            boxSize={8}
            color="gray.600"
            cursor="pointer"
            border="1px solid"
            borderRadius="md"
            borderColor="gray.200"
            _hover={{ bg: "gray.100" }}
            p={1}
          />
          <Icon
            as={Filter}
            boxSize={8}
            color="gray.600"
            cursor="pointer"
            border="1px solid"
            borderRadius="md"
            borderColor="gray.200"
            _hover={{ bg: "gray.100" }}
            p={1}
          />
          <HStack gap={0}>
            <Button
              size="sm"
              variant="outline"
              borderRightRadius={0}
              color="gray.600"
              _hover={{ bg: "gray.100" }}
              onClick={onPrev}
            >
              <BiLeftArrow />
            </Button>
            <Button
              size="sm"
              variant="outline"
              borderRadius={0}
              color="gray.600"
              _hover={{ bg: "gray.100" }}
              onClick={onToday}
            >
              Current Day
            </Button>
            <Button
              size="sm"
              variant="outline"
              borderLeftRadius={0}
              color="gray.600"
              _hover={{ bg: "gray.100" }}
              onClick={onNext}
            >
              <BiRightArrow />
            </Button>
          </HStack>
          <Menu.Root>
            <Menu.Trigger
              cursor="pointer"
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
              px={2}
              py={1}
              border="1px solid"
              borderColor="gray.200"
              bg="transparent"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Text
                fontSize="sm"
                fontWeight="600"
                borderRadius="full"
                px={2}
                py={1}
              >
                This Day
              </Text>
              <Icon as={FiChevronDown} boxSize={4} color="gray.500" />
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="week">This Week</Menu.Item>
                <Menu.Item value="month">This Month</Menu.Item>
                <Menu.Separator />
                <Menu.Item value="year">This Year</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          <Button
            size="sm"
            variant="outline"
            color="gray.600"
            _hover={{ bg: "gray.100" }}
          >
            Publish All
          </Button>
          <Button
            size="sm"
            variant="outline"
            color="gray.600"
            _hover={{ bg: "gray.100" }}
          >
            <Icon as={FiPlus} boxSize={4} color="gray.500" />
            Lock Shift
          </Button>
        </HStack>
      </Flex>
    </>
  );
}
