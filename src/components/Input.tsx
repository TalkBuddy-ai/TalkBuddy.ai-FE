import { Input } from "antd";
import styles from "@/styles/Chat.module.css";
import { AudioFilled, SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface InputProps {
  sendMsg: (msg: string) => void;
  lang: string;
}

const InputMsg = (props: InputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (isRecording) {
      handleListing();
    } else {
      stopHandle();
    }
  }, [isRecording]);

  const handleRecording = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Browser does not support converting audio to text");
    } else {
      setIsRecording(!isRecording);
    }
  };

  const send = () => {
    if (isRecording) {
      const fullMessage = `${msg}${transcript}`;
      props.sendMsg(fullMessage);
    } else {
      props.sendMsg(msg);
    }
    setMsg("");
    resetTranscript();
  };

  const handleListing = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: props.lang,
    });
  };
  const stopHandle = () => {
    SpeechRecognition.stopListening();
    const fullMessage = `${msg}${transcript}`;
    setMsg(fullMessage);
  };

  return (
    <div>
      <Input
        type="text"
        id="msg"
        name="msg"
        placeholder="Send a message .."
        className={styles.input}
        value={msg || transcript}
        onChange={(e) => setMsg(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            props.sendMsg(msg);
            setMsg("");
            resetTranscript();
          }
        }}
        suffix={
          <>
            {" "}
            <AudioFilled
              onClick={() => handleRecording()}
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
