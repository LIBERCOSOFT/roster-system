"use client";

import {
  Box,
  VStack,
  Text,
  Accordion,
  Flex,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import {
  Calendar,
  HamburgerMenu,
  ArrowUp2,
  Category2,
  DocumentText,
  Stickynote,
  Document,
  Notepad2,
  MenuBoard,
} from "iconsax-reactjs";
import Image from "next/image";
import React, { useState } from "react";
import { BiBorderNone } from "react-icons/bi";

const Sidebar = () => {
  const [activeSubItem, setActiveSubItem] = useState<string | null>("Planner");
  const [activeMainItem, setActiveMainItem] = useState<string>("Rooster");

  const handleTopItemClick = (item: any) => {
    setActiveMainItem(item.label);
    setActiveSubItem(null);
  };

  const isTopItemActive = (item: any) => {
    if (item.subItems) {
      // Check if any subitem's label matches activeSubItem
      return item.subItems.some((sub: any) => sub.label === activeSubItem);
    }
    return activeMainItem === item.label;
  };

  const menuItems = [
    { icon: Category2, label: "Startpagina" },
    {
      icon: BiBorderNone,
      label: "Rooster",
      subItems: [
        { icon: DocumentText, label: "Mijn Rooster" },
        { icon: Stickynote, label: "Planner" },
        { icon: Stickynote, label: "Instellingen" },
      ],
    },
    { icon: Stickynote, label: "My to do Protocols" },
    { icon: Document, label: "Document Management" },
    { icon: Notepad2, label: "Department News" },
    { icon: MenuBoard, label: "Knowledge Base" },
    { icon: DocumentText, label: "General News" },
  ];

  return (
    <Box
      w="250px"
      h="100vh"
      p={4}
      position="fixed"
      left={0}
      top={0}
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
    >
      <Flex mb={8} justify="space-between">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={150}
          height={50}
          style={{ marginBottom: "20px" }}
        />
        <IconButton
          aria-label="Menu"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          color="#2D3648"
        >
          <HamburgerMenu size="24" />
        </IconButton>
      </Flex>

      <VStack align="stretch">
        {menuItems.map((item) =>
          item.subItems ? (
            <Accordion.Root
              key={item.label}
              collapsible
              defaultValue={["Rooster"]}
            >
              <Accordion.Item value={item.label} borderBottom={0}>
                <Accordion.ItemTrigger>
                  <Box
                    display="flex"
                    alignItems="center"
                    px={2}
                    borderRadius="md"
                    cursor="pointer"
                    width="100%"
                    onClick={() => handleTopItemClick(item)}
                    color={isTopItemActive(item) ? "#5653FC" : "inherit"}
                  >
                    <Icon as={item.icon} mr={3} />
                    <Text fontWeight="medium" flex="1" textAlign="left">
                      {item.label}
                    </Text>
                    <Accordion.ItemIndicator>
                      <Icon
                        as={ArrowUp2}
                        transition="transform 0.2s"
                        transform={undefined}
                      />
                    </Accordion.ItemIndicator>
                  </Box>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <VStack align="stretch" gap={0} mt={2} ml={8}>
                      {item.subItems.map((subItem: any) => {
                        const isActive = activeSubItem === subItem.label;
                        return (
                          <Flex
                            key={subItem.label}
                            py={2}
                            pl={3}
                            borderLeft="2px solid"
                            borderColor={isActive ? "#5653FC" : "gray.200"}
                            color={isActive ? "#5653FC" : "gray.600"}
                            cursor="pointer"
                            _hover={{
                              color: "blue.500",
                              borderColor: "blue.500",
                            }}
                            onClick={() => setActiveSubItem(subItem.label)}
                          >
                            <Icon as={subItem.icon} mr={3} />
                            <Text>{subItem.label}</Text>
                          </Flex>
                        );
                      })}
                    </VStack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          ) : (
            <Box
              key={item.label}
              display="flex"
              alignItems="center"
              px={2}
              py={3}
              borderRadius="md"
              cursor="pointer"
              onClick={() => handleTopItemClick(item)}
              color={isTopItemActive(item) ? "#5653FC" : "inherit"}
              _hover={{
                color: "blue.500",
                borderColor: "blue.500",
              }}
            >
              <Icon as={item.icon} mr={3} />
              <Text fontWeight="medium">{item.label}</Text>
            </Box>
          ),
        )}
      </VStack>
    </Box>
  );
};

export default Sidebar;
