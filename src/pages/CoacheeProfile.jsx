import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
import { baseApiUrl } from "../config"
import React from "react"

//components
// import CoacheeForm from "../components/CoacheeForm"

//chalra delete alert

//chakra
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  Badge,
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
  Input,
  ModalFooter,
  useToast,
} from "@chakra-ui/react"

const CoacheeProfile = () => {
  const defaultCoacheeFormData = {
    firstName: "",
    lastName: "",
    email: "",
  }

  const [coacheeFormData, setCoacheeFormData] = useState(defaultCoacheeFormData)
  const { userID, coacheeID } = useParams()
  const [coachee, setCoachee] = useState(null)
  const [editToggler, setEditToggler] = useState(false)
  const navigateTo = useNavigate()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  // const editHandler = (e) => {
  //   setEditToggler(() => !editToggler)
  // }

  //getting coachee details from database using coacheeID
  const getCoacheeDetails = useCallback(async () => {
    const { data } = await authAxios.get(
      `${baseApiUrl()}/team/${userID}/coachee/${coacheeID}`
    )
    setCoachee(() => data)
    setCoacheeFormData(() => data)
  }, [userID, coacheeID])

  //update coachee details in the database
  const updateCoacheeDetails = async () => {
    const { data } = await authAxios.post(
      `${baseApiUrl()}/team/${userID}/coachee/${coacheeID}`,
      coacheeFormData
    )
    setCoachee(() => data)
    setEditToggler(() => !editToggler)
  }

  //delete coachee from the database
  const deleteCoachee = async () => {
    await authAxios.delete(
      `${baseApiUrl()}/team/${userID}/coachee/${coacheeID}`
    )
    navigateTo(`/team/${userID}`)
    toast({
      title: "Coachee deleted",
      description: "We've removed the rep from your team",
      status: "warning",
      duration: "6000",
      isClosable: true,
    })
  }

  useEffect(() => {
    try {
      getCoacheeDetails()
    } catch (error) {
      console.error(error)
    }
  }, [getCoacheeDetails])

  const changeHandler = (e) => {
    setCoacheeFormData({ ...coacheeFormData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      updateCoacheeDetails()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteHandler = () => {
    try {
      deleteCoachee()

      navigateTo(`/team/${userID}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {coachee && (
        <div key={coachee._id}>
          <Container maxW={"7xl"}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 24 }}
            >
              <Flex>
                <Image
                  rounded={"md"}
                  alt={"rep image"}
                  src={
                    "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                  }
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                />
              </Flex>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={"header"}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  >
                    {`${coachee.firstName} ${coachee.lastName}`}
                  </Heading>
                  {coachee.disciplinary.pep && (
                    <Badge
                      rounded="full"
                      px="4"
                      ml="3"
                      mt="2"
                      mb="2"
                      fontSize="1.2em"
                      colorScheme="orange"
                    >
                      PEP
                    </Badge>
                  )}
                  {coachee.disciplinary.cap && (
                    <Badge
                      rounded="full"
                      px="4"
                      ml="3"
                      mt="2"
                      mb="2"
                      fontSize="1.2em"
                      colorScheme="red"
                    >
                      CAP
                    </Badge>
                  )}
                </Box>

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={<StackDivider borderColor={"gray"} />}
                >
                  <Box>
                    {/* <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={"yellow.500"}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Rep Details
                    </Text> */}

                    <List spacing={2}>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Email:
                        </Text>{" "}
                        {coachee.email}
                      </ListItem>
                    </List>
                  </Box>
                </Stack>
                <Button
                  onClick={onOpen}
                  rounded={"none"}
                  w={"full"}
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
                  Edit INFO
                </Button>
              </Stack>
            </SimpleGrid>
          </Container>
        </div>
      )}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={submitHandler}>
          <ModalContent>
            <ModalHeader>Update details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl pt={6}>
                <FormLabel>First Name: </FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={coacheeFormData.firstName}
                  onChange={changeHandler}
                />
                <br />
              </FormControl>
              <FormControl pt={6}>
                <FormLabel>Last Name: </FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={coacheeFormData.lastName}
                  onChange={changeHandler}
                />
                <br />
              </FormControl>
              <FormControl pt={6}>
                <FormLabel>Email: </FormLabel>
                <Input
                  type="text"
                  name="email"
                  value={coacheeFormData.email}
                  onChange={changeHandler}
                />
                <br />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme={"purple"} mr={3}>
                Submit
              </Button>
              <Button onClick={onClose} mr={3}>
                Cancel
              </Button>
            </ModalFooter>
            <ModalFooter>
              <Button colorScheme={"red"} onClick={deleteHandler}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>

    // <div>
    //   {coachee && (
    //     <div key={coachee._id}>
    //       <h1>{coachee.firstName}'s Profile</h1>

    //       {/* {!editToggler && (
    //         <div>
    //           <p>First Name: {coachee.firstName}</p>
    //           <p>Last Name: {coachee.lastName}</p>
    //           <p>Email: {coachee.email}</p>
    //           <button onClick={editHandler}>Edit</button>
    //           <button onClick={deleteHandler}>Delete</button>
    //         </div>
    //       )} */}

    //       {/* {editToggler && (
    //         <div>
    //           <CoacheeForm
    //             coacheeFormData={coacheeFormData}
    //             submitHandler={submitHandler}
    //             changeHandler={changeHandler}
    //           />
    //           <button onClick={editHandler}>Cancel</button>
    //         </div>
    //       )} */}
    //     </div>
    //   )}
    // </div>
  )
}

export default CoacheeProfile
