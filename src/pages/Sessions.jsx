import { useContext, useEffect, useState, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
import { baseApiUrl } from "../config"
import React from "react"

//chakra table
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Select,
  Textarea,
  Checkbox,
} from "@chakra-ui/react"

//modal create sessions
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useToast,
  useDisclosure,
  FormLabel,
  Input,
} from "@chakra-ui/react"

import { EditIcon } from "@chakra-ui/icons"

//contexts
import UserContext from "../contexts/UserContext"

const Sessions = () => {
  const { user } = useContext(UserContext)
  const [team, setTeam] = useState([])
  const [sessions, setSessions] = useState([])
  const [addToggler, setAddToggler] = useState(false)

  const {
    isOpen: isCreateSessionOpen,
    onOpen: onCreateSessionOpen,
    onClose: onCreateSessionClose,
  } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const toast = useToast()

  const defaultSessionFormData = {
    date: new Date(),
    coachee: [],
    description: "",
    notes: "",
    completed: false,
  }

  const [sessionFormData, setSessionFormData] = useState(defaultSessionFormData)

  // get id from url
  const { userID } = useParams()

  // get sessions and coachees from the database
  const getSessions = useCallback(async () => {
    const { data } = await authAxios.get(`${baseApiUrl()}/sessions/${userID}`)
    setSessions(() => data.sessions)
    setTeam(() => data.team)
  }, [userID])

  //add a new session to the database
  const addSession = async () => {
    const { data } = await authAxios.post(
      `${baseApiUrl()}/sessions/${userID}`,
      sessionFormData
    )
    const sortedSessions = [...sessions, data].sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })

    setSessions(sortedSessions)
    addHandler()
  }

  const changeHandler = (e) => {
    setSessionFormData({ ...sessionFormData, [e.target.name]: e.target.value })
  }

  const checkHandler = (e) => {
    setSessionFormData({
      ...sessionFormData,
      [e.target.name]: e.target.checked,
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await addSession()
      await getSessions()
      setSessionFormData(() => defaultSessionFormData)
      onCreateSessionClose()
      toast({
        title: "Session created",
        description: "We've created a new session",
        status: "success",
        duration: "6000",
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const addHandler = (e) => {
    setAddToggler(() => !addToggler)
    setSessionFormData(() => defaultSessionFormData)
  }

  useEffect(() => {
    try {
      getSessions()
    } catch (error) {
      console.error(error)
    }
  }, [getSessions])

  const dateFormatter = (formDate) => {
    let dtFormat = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    let date = new Date(formDate)
    return dtFormat.format(date)
  }

  const timeFormatter = (formDate) => {
    let dtFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
    let date = new Date(formDate)
    return dtFormat.format(date)
  }

  const findCoacheeById = (coacheesIds) => {
    const foundCoachees = team.filter((coachee) => {
      return coacheesIds.includes(coachee._id)
    })
    return foundCoachees
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
      .join(", ")
  }

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
            onClick={onCreateSessionOpen}
          >
            Create a Session
          </Button>
        </div>
      )}

      <br />

      {/* below is the list of sessions from the sessions array */}

      {user && (
        <>
          <TableContainer mt={10}>
            <Table variant="striped" colorScheme="purple">
              <TableCaption>List of all coaching sessions.</TableCaption>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Coachee</Th>
                  <Th>Description</Th>
                  <Th>Complete</Th>
                  <Th>Notes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sessions.map((s) => {
                  return (
                    <Tr key={s._id}>
                      <Td>{dateFormatter(s.date)}</Td>
                      <Td>{timeFormatter(s.date)}</Td>
                      <Td>{findCoacheeById(s.coachee)}</Td>
                      <Td>{s.description}</Td>
                      <Td>{s.completed ? "Yes" : "No"}</Td>
                      <Td>
                        <Link to={`meeting/${s._id}`}>
                          <EditIcon />
                        </Link>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Coachee</Th>
                  <Th>Description</Th>
                  <Th>Complete</Th>
                  <Th>Notes</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </>
      )}

      {/* when 'create a sessions' is clicked the below modal pops up  */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isCreateSessionOpen}
        onClose={onCreateSessionClose}
      >
        <ModalOverlay />
        <form onSubmit={submitHandler}>
          <ModalContent>
            <ModalHeader>Create a new session</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl pt={6}>
                <FormLabel>Date and Time: </FormLabel>
                <Input
                  type="datetime-local"
                  name="date"
                  value={sessionFormData.date}
                  onChange={changeHandler}
                />
                <br />
              </FormControl>
              <FormControl pt={6}>
                <FormLabel>Coachee: </FormLabel>
                <Select
                  placeholder="Select one"
                  name="coachee"
                  value={sessionFormData.coachee}
                  onChange={changeHandler}
                >
                  {team.map((coachee) => {
                    return (
                      <option key={coachee._id} value={coachee._id}>
                        {`${coachee.firstName} ${coachee.lastName}`}
                      </option>
                    )
                  })}
                </Select>
                <br />
              </FormControl>
              <FormControl pt={6}>
                <FormLabel>Description: </FormLabel>
                <Textarea
                  name="description"
                  value={sessionFormData.description}
                  onChange={changeHandler}
                />
                <br />
              </FormControl>
              <FormControl pt={6}>
                <FormLabel>Notes: </FormLabel>
                <Textarea
                  name="notes"
                  value={sessionFormData.notes}
                  onChange={changeHandler}
                />
                <br />
              </FormControl>
              <FormControl pt={6}>
                <Checkbox
                  name="completed"
                  isChecked={sessionFormData.completed}
                  value={sessionFormData.completed}
                  onChange={checkHandler}
                >
                  Check if the session is complete
                </Checkbox>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme={"purple"} mr={3}>
                Submit
              </Button>
              <Button onClick={onCreateSessionClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      {/* {user && !addToggler && (
        <div>
          
          {sessions.map((s) => {
            return (
              <div key={s._id}>
                <p>Date: {dateFormatter(s.date)}</p>
                <p>Time: {timeFormatter(s.date)}</p>
                <p>Coachee: {findCoacheeById(s.coachee)}</p>
                <p>Description: {s.description}</p>
                <p>Complete: {s.completed ? "Yes" : "No"}</p>
                <Link to={`meeting/${s._id}`}>See Notes</Link>
                <hr />
              </div>
            )
          })}
        </div>
      )} */}

      {/* {addToggler && (
        <div>
          <SessionForm
            sessionFormData={sessionFormData}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            checkHandler={checkHandler}
            dateAdapter={AdapterDateFns}
            team={team}
          />
          <br />
          <button onClick={addHandler}>Cancel</button>
        </div>
      )} */}
    </div>
  )
}

export default Sessions
