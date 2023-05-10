import { Input } from "antd";
import styles from "@/styles/Chat.module.css";
import {
  AudioFilled,
  SendOutlined,
  LoadingOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { APP_ID } from "@/utils/constants";

interface InputProps {
  sendMsg: (msg: string) => void;
  lang: string;
  finishLoading: boolean;
  finishTyping: boolean;
}

const InputMsg = (props: InputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
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
      const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(APP_ID);
      SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
    } else {
      setIsRecording(!isRecording);
    }
  };

  const handleDelete = () => {
    setMsg("");
    resetTranscript();
    setRecorded(false);
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
    setRecorded(false);
  };

  const handleListing = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: props.lang,
    });
  };
  const stopHandle = () => {
    SpeechRecognition.stopListening();
    if (transcript) {
      setRecorded(true);
    }
    const fullMessage = `${msg}${transcript}`;
    setMsg(fullMessage);
  };

  const handleChange = (e: any) => {
    setMsg(e.target.value);
    if (!e.target.value) {
      setMsg("");
      resetTranscript();
      setRecorded(false);
    }
  };

  return (
    <div>
      <Input
        type="text"
        id="msg"
        name="msg"
        placeholder="Send a message .."
        className={styles.input}
        value={isRecording ? `${msg}${transcript}` : msg}
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            props.sendMsg(msg);
            setMsg("");
            resetTranscript();
            setRecorded(false);
          }
        }}
        suffix={
          <>
            {!recorded ? (
              <AudioFilled
                onClick={() => handleRecording()}
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                  color: isRecording ? "Green" : "Black",
                }}
              />
            ) : (
              <CloseOutlined
                onClick={() => handleDelete()}
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                  color: "red",
                }}
              />
            )}
            {props.finishTyping && props.finishLoading ? (
              <SendOutlined
                onClick={() => send()}
                style={{ fontSize: "20px" }}
              />
            ) : (
              <LoadingOutlined style={{ fontSize: "20px" }} />
            )}
          </>
        }
      />
    </div>
  );
};
export default InputMsg;
