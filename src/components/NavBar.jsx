import { NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { signInWithGoogle, auth } from "../config/Fire"

//context
import UserContext from "../contexts/UserContext"

//chakra ui - google login button
import { FcGoogle } from "react-icons/fc"

//chakra ui
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"

// const styles = {
//   display: "flex",
//   justifyContent: "space-around",
// }

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user, setUser } = useContext(UserContext)

  const navigateTo = useNavigate()

  const logoutHandler = (e) => {
    setUser(() => null)
    auth.signOut()
    navigateTo("/")
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            {/* <Box>
              <Image src={"../images/rocket-512.webp"} alt="logo" />
            </Box> */}
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink to="/">Home</NavLink>

              {user ? (
                <>
                  <NavLink to={`team/${user._id}`}>Team</NavLink>

                  <NavLink to={`sessions/${user._id}`}>Sessions</NavLink>
                </>
              ) : (
                <></>
              )}
            </HStack>
          </HStack>

          {/* when you click the avatar at the top right of the browser */}

          {user ? (
            <Flex alignItems={"center"}>
              <Menu>
                <Text
                  variant={"solid"}
                  as="i"
                  color={"gray"}
                  size={"sm"}
                  mr={"4"}
                >
                  Hi, {user.firstName}!
                </Text>

                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"md"}
                    src={user.imgURL}
                    referrerPolicy={"no-referrer"}
                  />
                  {/* <img src={user.imgURL} alt="" /> */}
                </MenuButton>
                <MenuList>
                  <NavLink to={`profile/${user._id}`}>
                    <MenuItem>Profile</MenuItem>
                  </NavLink>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <>
              <Button
                // w={"full"}
                // maxW={"md"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
                onClick={signInWithGoogle}
              >
                <Text>Sign in with Google</Text>
              </Button>
              {/* <button onClick={signInWithGoogle}>Log In With Google</button> */}
            </>
          )}
        </Flex>

        {/* when the broswer is collapsed */}

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink to="/">Home</NavLink>

              {user ? (
                <>
                  <NavLink to={`profile/${user._id}`}>Profile</NavLink>

                  <NavLink to={`team/${user._id}`}>Team</NavLink>

                  <NavLink to={`sessions/${user._id}`}>Sessions</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="login">Login</NavLink>

                  <button onClick={signInWithGoogle}>Log In With Google</button>
                </>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>

    // <div style={styles}>
    //   <NavLink to="/">Home</NavLink>

    //   {/* If we have an authenticated user, then they are allowed to see the below links */}
    //   {user ? (
    //     <>
    //       <NavLink to={`profile/${user._id}`}>Profile</NavLink>

    //       <NavLink to={`team/${user._id}`}>Team</NavLink>

    //       <NavLink to={`sessions/${user._id}`}>Sessions</NavLink>

    //       <NavLink onClick={logoutHandler} to="/">
    //         Logout
    //       </NavLink>
    //     </>
    //   ) : (
    //     <>
    //       {/* <NavLink to="login" style={activeStyle}>
    //         Login
    //       </NavLink> */}

    //       <button onClick={signInWithGoogle}>Log In With Google</button>
    //     </>
    //   )}
    // </div>
  )
}

export default NavBar
