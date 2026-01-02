import { Menu, Avatar, Switch } from "@mantine/core";
import {
  IconMessageCircle,

  IconUserCircle,
  IconFileText,
  IconLogout2,
} from "@tabler/icons-react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  return (
    <Menu shadow="md" width={220} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div
          className="flex items-center gap-2 cursor-pointer"
          
        >
          <span>Mrityunjay</span>
          <Avatar src="avatar2.png" alt="profile" size="md" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          to="/profile"
          leftSection={<IconUserCircle size={16} />}
        >
          Profile
        </Menu.Item>

        <Menu.Item leftSection={<IconMessageCircle size={16} />}>
          Messages
        </Menu.Item>

        <Menu.Item leftSection={<IconFileText size={16} />}>
          Resume
        </Menu.Item>

        <Menu.Item
          leftSection={<MoonIcon size={16} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(event) =>
                setChecked(event.currentTarget.checked)
              }
              size="md"
              onLabel={<SunIcon size={14} />}
              offLabel={<MoonIcon size={14} />}
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item color="red" leftSection={<IconLogout2 size={16} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
