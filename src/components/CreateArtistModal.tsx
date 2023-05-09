import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

export default function CreateArtistModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [artistName, setArtistName] = useState("");
  const [artistImage, setArtistImage] = useState("");
  const [artistBio, setArtistBio] = useState("");
  const [artistRecordLabel, setArtistRecordLabel] = useState("");
  const initialRef = React.useRef(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/createArtist", {
        name: artistName,
        image: artistImage,
        bio: artistBio,
        recordLabel: artistRecordLabel,
      });

      console.log("Created new artist:", res.data);
      onClose();
    } catch (error) {
      console.error("Error creating artist:", error);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-800 rounded-md px-5 py-5 hover:bg-blue-700 hover:transition-all hover:duration-300 hover:scale-105 text-black"
        onClick={onOpen}
      >
        Create Artist
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Artist Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Artist Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Artist name"
                onChange={(e) => setArtistName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Artist Image</FormLabel>
              <Input
                placeholder="Artist Image"
                onChange={(e) => setArtistImage(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Artist Bio</FormLabel>
              <Input
                placeholder="Artist Bio"
                onChange={(e) => setArtistBio(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Artist Record Label</FormLabel>
              <Input
                placeholder="Artist Record Label"
                onChange={(e) => setArtistRecordLabel(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
