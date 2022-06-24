//Need to import two things to use context on any page/components
// import { useContext } from "react"
// import UserContext from "../contexts/UserContext"

// chakra cta with annotation
import { Box, Heading, Container, Text, Stack, Image } from "@chakra-ui/react"

const Home = () => {
  // //Get the user value from the UserContext
  // const { user } = useContext(UserContext)

  // console.log(user)

  return (
    <>
      <Container maxW={"3xl"} marginTop={"-50px"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <b>
              What is <br />
              <Text as={"span"} color={"purple.600"}>
                Coach<Text as={"u"}>able</Text>?
              </Text>
            </b>
          </Heading>
          <Text color={"gray.500"}>
            Coachable is a platform where leaders and mentors can track the
            progress of each of their coachees. Manage individual's personal
            files and notes, schedule one-on-one meetings, and even chat.
          </Text>
          <Box>
            <Image
              src="https://www.techface.ch/wp-content/uploads/2020/03/output-onlinepngtools-3.png"
              alt="homepage-image"
            />
          </Box>
          {/* <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"orange.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "orange.500",
              }}
            >
              Get Started
            </Button>

            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue("gray.800", "gray.300")}
                w={71}
                position={"absolute"}
                right={-71}
                top={"10px"}
              />
              <Text
                fontSize={"lg"}
                fontFamily={"Caveat"}
                position={"absolute"}
                right={"-125px"}
                top={"-15px"}
                transform={"rotate(10deg)"}
              >
                Starting at $15/mo
              </Text>
            </Box>
          </Stack> */}
        </Stack>
      </Container>
    </>

    // <div>
    //   <h1>
    //     {user ? `Welcome ${user.firstName || user.email}!!!` : "Coachable"}
    //   </h1>
    // </div>
  )
}

export default Home
