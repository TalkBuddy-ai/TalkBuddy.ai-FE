import { Input } from "antd";
import styles from "@/styles/Chat.module.css";
import { AudioFilled, SendOutlined } from "@ant-design/icons";
import { useState } from "react";

const InputMsg = () => {
  const [msg, setMsg] = useState("");
  const [audioStatus, setStatus] = useState(false);

  const startRecording = () => {
    setStatus(!audioStatus);
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
        suffix={
          <>
            {" "}
            <AudioFilled
              onClick={() => startRecording()}
              style={{
                fontSize: "18px",
                color: audioStatus ? "Green" : "Black",
              }}
            />
            <SendOutlined
              onClick={() => alert(msg)}
              style={{ fontSize: "18px" }}
            />
          </>
        }
      />
    </div>
  );
};
export default InputMsg;
