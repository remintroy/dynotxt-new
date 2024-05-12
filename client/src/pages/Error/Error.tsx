import { Button, Flex, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap={15} align="center" justify="center" style={{ height: "100vh" }}>
      <Text size="xl" fw="bold">
        Error | something went wrong
      </Text>
      <Flex gap={10}>
        <Button size="sm"  onClick={() => navigate("/")}>
          Go to home page
        </Button>
        <Button size="sm"  onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </Flex>
    </Flex>
  );
};

export default Error;
