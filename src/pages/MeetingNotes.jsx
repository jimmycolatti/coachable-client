import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
import { baseApiUrl } from "../config"
import React from "react"

//chakra
import {
  Box,
  Container,
  Stack,
  Text,
  Heading,
  Center,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  VStack,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  useToast,
  Checkbox,
  Textarea,
} from "@chakra-ui/react"

//components
// import MeetingNotesForm from "../components/MeetingNotesForm"

const MeetingNotes = () => {
  const [meetingNotes, setMeetingNotes] = useState(null)
  const { userID, sessionID } = useParams()
  const [editToggler, setEditToggler] = useState(false)
  const navigateTo = useNavigate()
  const toast = useToast()

  const {
    isOpen: isSeeNotesOpen,
    onOpen: onSeeNotesOpen,
    onClose: onSeeNotesClose,
  } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  // const editHandler = (e) => {
  //   setEditToggler(() => !editToggler)
  // }

  //getting session details from database using sessionID
  const getMeetingNotes = useCallback(async () => {
    const { data } = await authAxios.get(`
      ${baseApiUrl()}/sessions/${userID}/meeting/${sessionID}
      `)
    setMeetingNotes(() => data)
  }, [userID, sessionID])

  //update notes details in the database
  const updateMeetingNotes = async () => {
    const { data } = await authAxios.post(
      `${baseApiUrl()}/sessions/${userID}/meeting/${sessionID}`,
      meetingNotes
    )
    // console.log(data)
    setMeetingNotes(() => data)
    setEditToggler(() => !editToggler)
  }

  //delete session from the database
  const deleteSession = async () => {
    await authAxios.delete(
      `${baseApiUrl()}/sessions/${userID}/meeting/${sessionID}`
    )
    navigateTo(`/sessions/${userID}`)
    toast({
      title: "Session deleted",
      description: "We've removed a session",
      status: "warning",
      duration: "6000",
      isClosable: true,
    })
  }

  useEffect(() => {
    try {
      getMeetingNotes()
    } catch (error) {
      console.error()
    }
  }, [getMeetingNotes])

  const dateTimeFormatter = (formDate) => {
    let dtFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    let date = new Date(formDate)
    return dtFormat.format(date)
  }

  const changeHandler = (e) => {
    setMeetingNotes({ ...meetingNotes, [e.target.name]: e.target.value })
  }

  const checkHandler = (e) => {
    setMeetingNotes({
      ...meetingNotes,
      [e.target.name]: e.target.checked,
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await updateMeetingNotes()
      await getMeetingNotes()
      onSeeNotesClose()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteHandler = () => {
    try {
      deleteSession()

      navigateTo(`/sessions/${userID}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {meetingNotes && (
        <div key={meetingNotes._id}>
          <Container maxW={"7xl"}>
            <SimpleGrid
              // columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 24 }}
            >
              <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={"header"}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  >
                    {meetingNotes.coachee[0].firstName}{" "}
                    {meetingNotes.coachee[0].lastName}
                  </Heading>
                  <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
                    Session Notes
                  </Text>
                </Box>

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={<StackDivider borderColor={"gray.200"} />}
                >
                  <VStack spacing={{ base: 4, sm: 6 }}>
                    <Text
                      color={"gray.500"}
                      fontSize={"2xl"}
                      fontWeight={"300"}
                    >
                      {meetingNotes.description}
                    </Text>
                  </VStack>

                  <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={"yellow.500"}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Details
                    </Text>

                    <List spacing={2}>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Date:
                        </Text>{" "}
                        {dateTimeFormatter(meetingNotes.date)}
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Complete:
                        </Text>{" "}
                        {meetingNotes.completed ? "Yes" : "No"}
                      </ListItem>
                    </List>
                  </Box>
                  <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={"yellow.500"}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Notes
                    </Text>

                    <List spacing={2}>
                      <ListItem>
                        <Text fontSize={"lg"}>{meetingNotes.notes}</Text>
                      </ListItem>
                    </List>
                  </Box>
                </Stack>

                <Center>
                  <Button
                    onClick={onSeeNotesOpen}
                    rounded={"none"}
                    w={"50%"}
                    mt={8}
                    size={"lg"}
                    py={"7"}
                    bg={"gray.900"}
                    color={"white"}
                    textTransform={"uppercase"}
                    _hover={{
                      transform: "translateY(2px)",
                      boxShadow: "lg",
                    }}
                  >
                    EDIT INFO
                  </Button>
                </Center>
              </Stack>
            </SimpleGrid>
          </Container>
        </div>
      )}

      {meetingNotes && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isSeeNotesOpen}
          onClose={onSeeNotesClose}
        >
          <ModalOverlay />
          <form onSubmit={submitHandler}>
            <ModalContent>
              <ModalHeader>Session Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl pt={6}>
                  <FormLabel>Coachee:</FormLabel>
                  <Text>
                    {`${meetingNotes.coachee[0].firstName}
                  ${meetingNotes.coachee[0].lastName}`}
                  </Text>
                </FormControl>
                <FormControl pt={6}>
                  <FormLabel>Date:</FormLabel>
                  <Text>{dateTimeFormatter(meetingNotes.date)}</Text>
                </FormControl>
                <FormControl pt={6}>
                  <FormLabel>Description: </FormLabel>
                  <Textarea
                    name="description"
                    value={meetingNotes.description}
                    onChange={changeHandler}
                  />
                  <br />
                </FormControl>
                <FormControl pt={6}>
                  <FormLabel>Notes: </FormLabel>
                  <Textarea
                    name="notes"
                    value={meetingNotes.notes}
                    onChange={changeHandler}
                  />
                  <br />
                </FormControl>
                <FormControl pt={6}>
                  <Checkbox
                    name="completed"
                    isChecked={meetingNotes.completed}
                    value={meetingNotes.completed}
                    onChange={checkHandler}
                  >
                    Session complete?
                  </Checkbox>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" colorScheme={"purple"} mr={3}>
                  Submit
                </Button>
                <Button onClick={onSeeNotesClose}>Cancel</Button>
              </ModalFooter>
              <ModalFooter>
                <Button colorScheme={"red"} onClick={deleteHandler}>
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      )}
    </div>

    // <div>
    //   <h1>Meeting Notes</h1>

    //   {!editToggler && (
    //     <div key={meetingNotes._id}>
    //       <p>
    //         Coachee: {meetingNotes.coachee[0].firstName}{" "}
    //         {meetingNotes.coachee[0].lastName}
    //       </p>
    //       <p>Date: {dateTimeFormatter(meetingNotes.date)}</p>
    //       <p>Complete: {meetingNotes.completed ? "Yes" : "No"}</p>
    //       <p>Description: {meetingNotes.description}</p>
    //       <p>Notes: {meetingNotes.notes}</p>
    //       <button onClick={editHandler}>Edit</button>
    //       <button onClick={deleteHandler}>Delete</button>
    //     </div>
    //   )}

    //   {editToggler && (
    //     <div>
    //       <MeetingNotesForm
    //         meetingNotes={meetingNotes}
    //         dateTimeFormatter={dateTimeFormatter}
    //         submitHandler={submitHandler}
    //         changeHandler={changeHandler}
    //         checkHandler={checkHandler}
    //       />
    //       <button onClick={editHandler}>Cancel</button>
    //     </div>
    //   )}
    // </div>
  )
}

export default MeetingNotes
