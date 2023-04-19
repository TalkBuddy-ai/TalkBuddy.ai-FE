import { Space } from "antd";
import styles from "@/styles/Chat.module.css";
import Conversation from "@/layouts/Conversation";
import InputMsg from "@/components/Input";
import { useState } from "react";
import LangSelect from "@/components/LangSelect";
import { MessageType } from "@/utils/types";

const Chat = () => {
  const [messages, setMessages] = useState([
    { msg: "", type: MessageType.Sender },
  ]);
  const [msg, setMsg] = useState("");
  const [lang, setLang] = useState("");

  const sendMsg = (msg: string) => {
    setMessages([...messages, { msg: msg, type: MessageType.Sender }]);
    setMsg(msg);
  };

  return (
    <div className={styles.main}>
      <div>
        <Conversation messages={messages} setMessages={setMessages} msg={msg} />
      </div>
      <Space
        size={"small"}
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <LangSelect setLang={setLang} />
        <InputMsg sendMsg={sendMsg} lang={lang} />
      </Space>
    </div>
  );
};
export default Chat;
