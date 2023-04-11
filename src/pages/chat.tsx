import { Select, Space } from "antd";
import styles from "@/styles/Chat.module.css";
import Conversation from "@/layouts/Conversation";
import InputMsg from "@/components/Input";
import { useState } from "react";
import LangSelect from "@/components/LangSelect";

const Chat = () => {
  const [msg, setMsg] = useState("");

  const sendMsg = (msg: string) => {
    setMsg(msg);
  };

  return (
    <div className={styles.main}>
      <div>
        <Conversation msg={msg} />
      </div>
      <Space
        size={"small"}
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <LangSelect />
        <InputMsg sendMsg={sendMsg} />
      </Space>
    </div>
  );
};
export default Chat;
