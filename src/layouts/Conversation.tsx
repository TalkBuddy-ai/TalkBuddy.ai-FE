import { Card } from "antd";
import styles from "../styles/Conversation.module.css";
import Message from "@/components/Message";
import { useFetch } from "@/customHooks/useSwr";

interface ConvProps {
  messages: { msg: string; type: string }[];
  msg: string;
}

const Conversation = (props: ConvProps) => {
  /*if (props.msg) {
    const { data } = useFetch({
      url: "/chats",
      payload: { prompt: props.msg },
    });
    console.log(data);
  }*/

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
