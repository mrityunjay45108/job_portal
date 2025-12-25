import { Modal, Button, Textarea, Text, Avatar, Group } from '@mantine/core';

interface MessageModalProps {
  opened: boolean;
  onClose: () => void;
  name: string;
  avatar?: string;
}

const MessageModal = ({ opened, onClose, name, avatar }: MessageModalProps) => {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={<Text size="lg" fw={700}>Send Message</Text>}
      centered
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      radius="md"
    >
      <Group mb="md">
        <Avatar src={avatar} radius="xl" size="md" />
        <Text fw={500}>{name}</Text>
      </Group>

      <Textarea
        placeholder="Type your message here..."
        label="Your Message"
        minRows={4}
        autosize
        data-autofocus
      />

      <Button fullWidth mt="md" color="brightSun.4" onClick={onClose}>
        Send Message
      </Button>
    </Modal>
  );
};

export default MessageModal;