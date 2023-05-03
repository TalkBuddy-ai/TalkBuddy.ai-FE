import { Card, List } from "antd";
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
    const fetchData = async () => {
      let response = await fetchResponse("/chats", props.msg);
      if (!response) {
        response = "Something went wrong. Try again.";
      }
      props.setMessages([
        ...props.messages,
        { msg: response, type: MessageType.Receiver },
      ]);
    };
    if (props.msg) {
      fetchData();
    }
  }, [props.msg]);

  return (
    <div className={styles.container}>
      <List
        className={styles.chatWrapper}
        itemLayout="horizontal"
        dataSource={props.messages}
        renderItem={(item, key) => (
          <>
            {item.msg && (
              <List.Item
                style={{
                  backgroundColor:
                    item.type === MessageType.Sender ? "white" : "#e9f4f1",
                  paddingLeft: "12px",
                  borderBlockEnd: "1px solid #94ccbb",
                }}
              >
                <Message message={item} key={key} />
              </List.Item>
            )}
          </>
        )}
      />
    </div>
  );
};
export default Conversation;
