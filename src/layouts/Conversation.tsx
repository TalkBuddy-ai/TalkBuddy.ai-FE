import { Card } from "antd";
import styles from "../styles/Conversation.module.css";
import Message from "@/components/Message";
import { message } from "@/utils/types";

interface ConvProps {
  messages: message[];
  msg: string;
}

const Conversation = (props: ConvProps) => {
  return (
    <div className={styles.container}>
      <Card
        style={{ width: 630, height: 530 }}
        bordered={false}
        className={styles.card}
      >
        {props.messages.map((message) => {
          if (message.msg) return <Message message={message} />;
          return;
        })}
      </Card>
    </div>
  );
};
export default Conversation;
