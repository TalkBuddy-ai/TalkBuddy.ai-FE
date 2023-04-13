import { Card } from "antd";
import styles from "../styles/Conversation.module.css";
import Message from "@/components/Message";
import { MessageType, message } from "@/utils/types";
import { useEffect, useState } from "react";
import { fetchResponse } from "@/pages/api/fetchResponse";

interface ConvProps {
  messages: message[];
  setMessages: (value: message[]) => void;
  msg: string;
}

const Conversation = (props: ConvProps) => {
  useEffect(() => {
    if (props.msg) {
      fetchResponse("/chats", props.msg, (resp: any) => {
        props.setMessages([
          ...props.messages,
          { msg: resp, type: MessageType.Receiver },
        ]);
      });
    }
  }, [props.msg]);

  return (
    <div className={styles.container}>
      <Card
        style={{ width: 630, height: 530 }}
        bordered={false}
        className={styles.card}
      >
        {props.messages.map((message, key) => {
          if (message.msg) return <Message message={message} key={key} />;
          return;
        })}
      </Card>
    </div>
  );
};
export default Conversation;
