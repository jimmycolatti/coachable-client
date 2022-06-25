import { useState, useEffect, useContext, useCallback } from "react"
import { useParams } from "react-router-dom"
import { authAxios } from "../customAxios/authAxios"
import { baseApiUrl } from "../config"

//contexts
import UserContext from "../contexts/UserContext"

//chakra UI
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
} from "@chakra-ui/react"

const Profile = () => {
  const { setUser } = useContext(UserContext)
  const [editToggler, setEditToggler] = useState(false)

  const defaultUserFormData = {
    imgURL: "https://i.stack.imgur.com/l60Hf.png",
    firstName: "",
    lastName: "",
    email: "",
  }
  const [userFormData, setUserFormData] = useState(defaultUserFormData)

  // get id from url
  const { userID } = useParams()

  // get profile information from the database
  const getUserInfo = useCallback(async () => {
    const { data } = await authAxios.get(`${baseApiUrl()}/profile/${userID}`)
    setUserFormData(() => data)
  }, [userID])

  //update user information in the database
  const updateUserInfo = async () => {
    const { data } = await authAxios.post(
      `${baseApiUrl()}/profile/${userID}`,
      userFormData
    )
    // console.log(data)
    setUser(() => data)
    setUserFormData(() => data)
    setEditToggler(() => !editToggler)
  }

  const changeHandler = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      updateUserInfo()
    } catch (error) {
      console.error(error)
    }
  }

  // const editHandler = (e) => {
  //   setEditToggler(() => !editToggler)
  // }

  const toast = useToast()

  useEffect(() => {
    try {
      getUserInfo()
    } catch (error) {
      console.error(error)
    }
  }, [getUserInfo])

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>

        <form onSubmit={submitHandler}>
          <FormControl id="imgURL">
            {/* <FormLabel>Profile Picture</FormLabel> */}
            <Stack direction={["column", "row"]} spacing={6}>
              <Center w="full">
                <Avatar
                  size="xl"
                  src={userFormData.imgURL}
                  referrerPolicy={"no-referrer"}
                >
                  {/* <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  /> */}
                </Avatar>
              </Center>

              {/* <Center w="full">
                <Button w="full">Change Picture</Button>
              </Center> */}
            </Stack>
          </FormControl>

          <br />

          <FormControl id="firstName" isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={userFormData.firstName}
              _value={{ color: "gray.500" }}
              onChange={changeHandler}
            />
          </FormControl>

          <br />

          <FormControl id="lastName" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={userFormData.lastName}
              _value={{ color: "gray.500" }}
              onChange={changeHandler}
            />
          </FormControl>

          <br />

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="text"
              name="email"
              value={userFormData.email}
              _value={{ color: "gray.500" }}
              onChange={changeHandler}
            />
          </FormControl>

          <br />

          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              onClick={() => {
                toast({
                  title: "Changes complete",
                  description: "We've updated your account for you.",
                  status: "success",
                  duration: "6000",
                  isClosable: true,
                })
              }}
              type="submit"
              bg={"purple.600"}
              color={"white"}
              w="full"
              _hover={{
                bg: "purple.700",
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>

    // <div>

    //   <h1>Profile - User info</h1>

    //   {user && !editToggler && (
    //     <div>
    //       <img src={user.imgURL} alt={user.firsName + user.lastName} />
    //       <p>First Name: {userFormData.firstName}</p>
    //       <p>Last Name: {userFormData.lastName}</p>
    //       <p>Email: {userFormData.email}</p>
    //       <button onClick={editHandler}>Edit</button>
    //     </div>
    //   )}

    //   {editToggler && (
    //     <div>
    //       <UserForm
    //         userFormData={userFormData}
    //         submitHandler={submitHandler}
    //         changeHandler={changeHandler}
    //       />
    //       <button onClick={editHandler}>Cancel</button>
    //     </div>
    //   )}
    // </div>
  )
}

export default Profile
