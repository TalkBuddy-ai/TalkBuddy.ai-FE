import { Input } from "antd";
import styles from "@/styles/Chat.module.css";
import { AudioFilled, SendOutlined } from "@ant-design/icons";
import { useState } from "react";

interface InputProps {
  sendMsg: (msg: string) => void;
}

const InputMsg = (props: InputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [msg, setMsg] = useState("");

  const startRecording = () => {
    setIsRecording(!isRecording);
  };

  const send = () => {
    props.sendMsg(msg);
    setMsg("");
  };

  return (
    <div>
      <Input
        type="text"
        id="msg"
        name="msg"
        placeholder="Send a message .."
        className={styles.input}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            props.sendMsg(msg);
            setMsg("");
          }
        }}
        suffix={
          <>
            {" "}
            <AudioFilled
              onClick={() => startRecording()}
              style={{
                fontSize: "18px",
                color: isRecording ? "Green" : "Black",
              }}
            />
            <SendOutlined onClick={() => send()} style={{ fontSize: "18px" }} />
          </>
        }
      />
    </div>
  );
};
export default InputMsg;
