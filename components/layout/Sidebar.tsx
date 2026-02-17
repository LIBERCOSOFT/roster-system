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
import { Home, Calendar, HamburgerMenu } from "iconsax-reactjs";
import Image from "next/image";

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Startpagina" },
    {
      icon: Calendar,
      label: "Rooster",
      subItems: [
        "Mijn Rooster",
        "Planner",
        "Instellingen",
        "My to do Protocols",
        "Document Management",
        "Department News",
      ],
    },
    { icon: Calendar, label: "Knowledge Base" },
    { icon: Calendar, label: "General News" },
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
        <IconButton aria-label="Menu">
          <HamburgerMenu size="24" />
        </IconButton>
      </Flex>

      <VStack align="stretch">
        {menuItems.map((item) =>
          item.subItems ? (
            <Accordion.Root key={item.label} collapsible>
              <Accordion.Item value={item.label} borderBottomRadius={0}>
                <Accordion.ItemTrigger>
                  <Box
                    display="flex"
                    alignItems="center"
                    px={2}
                    py={3}
                    borderRadius="md"
                    // _hover={{ bg: "gray.700" }}
                    cursor="pointer"
                    width="100%"
                  >
                    <Icon as={item.icon} mr={3} />
                    <Text fontWeight="medium" flex="1" textAlign="left">
                      {item.label}
                    </Text>
                    <Accordion.ItemIndicator></Accordion.ItemIndicator>
                  </Box>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <VStack align="stretch">
                      {item.subItems.map((subItem) => (
                        <Text
                          key={subItem}
                          py={2}
                          borderRadius="md"
                          // _hover={{ bg: "gray.700" }}
                          cursor="pointer"
                          // color={
                          //   subItem === "Planner" ? "blue.300" : "gray.300"
                          // }
                          // fontWeight={subItem === "Planner" ? "bold" : "normal"}
                        >
                          {subItem}
                        </Text>
                      ))}
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
              // _hover={{ bg: "gray.700" }}
              cursor="pointer"
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
