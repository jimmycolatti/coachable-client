import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Badge,
} from "@chakra-ui/react"

import { Link } from "react-router-dom"

const CoacheeCard = ({ coachee }) => {
  const IMAGE =
    "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {coachee.firstName} {coachee.lastName}
            {coachee.disciplinary.pep && (
              <Badge
                rounded="full"
                px="2"
                ml="3"
                mb="2"
                fontSize="0.8em"
                colorScheme="orange"
              >
                PEP
              </Badge>
            )}
            {coachee.disciplinary.cap && (
              <Badge
                rounded="full"
                px="2"
                ml="3"
                mb="2"
                fontSize="0.8em"
                colorScheme="red"
              >
                CAP
              </Badge>
            )}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={500} fontSize={"l"} color={"gray.600"}>
              <Link to={`coachee/${coachee._id}`}>See Details</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}

export default CoacheeCard
