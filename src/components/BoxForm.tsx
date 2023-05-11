import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

export default function BoxForm() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSearchSubmit}
      mt={4}
      w="50rem"
      className="m-3"
    >
      <InputGroup>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search artists, tracks, or genres"
          bg="white"
          color="black"
          _placeholder={{ color: "gray.500" }}
          borderRadius="md"
        />
        <InputRightElement width="4.5rem">
          <Button
            type="submit"
            colorScheme="blue"
            size="sm"
            borderRadius="md"
            h="1.75rem"
            mt="0.125rem"
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
