import { AppShell, Burger, Flex, Group, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened, desktop: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hidden={opened} size="sm" />
          Logo
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Flex direction="row" align="center" justify="space-between">
          <Text>Navbar</Text>
          <Burger opened={opened} onClick={toggle} hidden={!opened} size="sm" />
        </Flex>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>Alt layout – Navbar and Aside are rendered on top on Header and Footer</AppShell.Main>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
}
