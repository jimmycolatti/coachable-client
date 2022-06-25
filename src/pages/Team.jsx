import { useContext, useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
import React from "react"
import { baseApiUrl } from "../config"

//contexts
import UserContext from "../contexts/UserContext"
import CoacheeCard from "../components/CoacheeCard"

//chakra
import {
  SimpleGrid,
  Button,
  useDisclosure,
  FormLabel,
  Input,
  useToast,
  Image,
  Center,
} from "@chakra-ui/react"

//modal create coachee

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
} from "@chakra-ui/react"

const Team = () => {
  const { user } = useContext(UserContext)
  const [team, setTeam] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const toast = useToast()

  const defaultCoacheeFormData = {
    firstName: "",
    lastName: "",
    email: "",
  }

  const [coacheeFormData, setCoacheeFormData] = useState(defaultCoacheeFormData)
  const [isLoadingCoachee, setIsLoadingCoachee] = useState(true)

  // get id from url
  const { userID } = useParams()

  // get coachees from the database
  const getCoachees = useCallback(async () => {
    const { data } = await authAxios.get(`${baseApiUrl()}/team/${userID}`)

    const sortedCoachees = data.sort((a, b) => {
      return a.firstName - b.firstName
    })

    setIsLoadingCoachee(false)
    setTeam(sortedCoachees)
  }, [userID])

  //add a new coachee to the database
  const addCoachee = async () => {
    const { data } = await authAxios.post(
      `${baseApiUrl()}/team/${userID}`,
      coacheeFormData
    )

    const sortedCoachees = [...team, data].sort((a, b) => {
      return a.firstName - b.firstName
    })

    setTeam(sortedCoachees)
  }

  const changeHandler = (e) => {
    setCoacheeFormData({ ...coacheeFormData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await addCoachee()
      await getCoachees()
      setCoacheeFormData(() => defaultCoacheeFormData)
      onClose()
      toast({
        title: "Coachee added",
        description: "We've added a new coachee to your team",
        status: "success",
        duration: "6000",
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    try {
      getCoachees()
    } catch (error) {
      console.error(error)
    }
  }, [getCoachees])

  return (
    <div>
      {user && (
        <div>
          <Button
            px={8}
            bg={"purple.600"}
            color={"white"}
            _hover={{ bg: "purple.700" }}
            margin={"10px"}
            marginTop={"25px"}
            onClick={onOpen}
          >
            Add a Coachee
          </Button>
        </div>
      )}

      <br />

      {/* below is the list of coachees from the team array */}

      {user && team.length > 0 ? (
        <>
          <SimpleGrid columns={3} spacing={"10px"}>
            {team.map((coachee) => {
              return (
                <div key={coachee._id}>
                  <CoacheeCard coachee={coachee} />
                </div>
              )
            })}
          </SimpleGrid>
        </>
      ) : (
        !isLoadingCoachee && (
          <Center>
            <Image
              src={"https://i.gifer.com/yH.gif"}
              alt={"john-travolta-gif"}
            />
          </Center>
        )
      )}

      {/* when 'see details' is clicked the below modal pops up */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={submitHandler}>
          <ModalContent>
            <ModalHeader>Create a new coachee</ModalHeader>
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
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  )
}

export default Team
