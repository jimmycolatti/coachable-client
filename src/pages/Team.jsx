import { useContext, useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
import React from "react"

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

  const defaultCoacheeFormData = {
    firstName: "",
    lastName: "",
    email: "",
  }

  const [coacheeFormData, setCoacheeFormData] = useState(defaultCoacheeFormData)

  // get id from url
  const { userID } = useParams()

  // get coachees from the database
  const getCoachees = useCallback(async () => {
    const { data } = await authAxios.get(`http://localhost:5005/team/${userID}`)
    // console.log(data)
    setTeam(() => data)
  }, [userID])

  //add a new coachee to the database
  const addCoachee = async () => {
    const { data } = await authAxios.post(
      `http://localhost:5005/team/${userID}`,
      coacheeFormData
    )
    setTeam(() => [...team, data])
  }

  const changeHandler = (e) => {
    setCoacheeFormData({ ...coacheeFormData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      addCoachee()
      setCoacheeFormData(() => defaultCoacheeFormData)
      onClose()
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
  }, [])

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

          <br />
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

      {/*       

      {addToggler && (
        <div>
          <CoacheeForm
            coacheeFormData={coacheeFormData}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
          />
          <button onClick={addHandler}>Cancel</button>
        </div>
      )} */}
    </div>
  )
}

export default Team
