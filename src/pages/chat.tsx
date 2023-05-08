import { Button, Space } from "antd";
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
  const [lang, setLang] = useState("en-US");
  const [finishLoading, setFinishLoading] = useState(true);
  const [finishTyping, setFinishTyping] = useState(true);
  const [isStopGenerateBtnClicked, setIsStopGenerateBtnClicked] = useState(false);
  const sendMsg = (msg: string) => {
    setMessages([...messages, { msg: msg, type: MessageType.Sender }]);
    setMsg(msg);
    resetStopGenerateButton();
  };

  const showStopGenerateButton = () => {
    return msg && finishLoading && !finishTyping && !isStopGenerateBtnClicked;
  };

  const resetStopGenerateButton = () => {
    setIsStopGenerateBtnClicked(false);
  };

  return (
    <div className={styles.main}>
      <div>
        <Conversation
          messages={messages}
          setMessages={setMessages}
          msg={msg}
          setFinishLoading={setFinishLoading}
          setFinishTyping={setFinishTyping}
          isStopGenerate={isStopGenerateBtnClicked}
          setStopGenerate={() => {}} 
        />
      </div>
      {
          showStopGenerateButton() && (
          <Button
            className={styles.stopGenerateBtn}
            onClick={() => setIsStopGenerateBtnClicked(true)}>
              Stop Generate
          </Button>
        )
      }
      <Space
        size={"small"}
        direction="horizontal"
        style={{
          width: "100%",
          justifyContent: "center",
          position: "absolute",
          bottom: "20px",
        }}
      >
        <LangSelect setLang={setLang} />
        <InputMsg
          sendMsg={sendMsg}
          lang={lang}
          finishLoading={finishLoading}
          finishTyping={finishTyping}
        />
      </Space>
    </div>
  );
};
export default Chat;
