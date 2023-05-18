import { NextPage } from "next";
import { useState } from "react";
import { fetchResponse } from "@/pages/api/chat";
import { transcribe } from "@/pages/api/transcribe";
import { Button, Input } from "antd";
import styles from "../styles/transcribe.module.css";
import { processText } from "@/utils";

const Home: NextPage = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [meetingMinutes, setMeetingMinutes] = useState("");
  const acceptedFileFormats = ".m4a, .mp3, .webm, .mp4, .mpga, .wav, .mpeg"
  const scripts = {
    summary: " تلخيص هذا النص " ,
    meetingMinutes: " استنتاج محضر الاجنماع و نقاط العمل عليها من هذا النص "
  };
  const errorMessage = "Something went wrong, Try again later.";

  const onChangeFile = (target: any) => {
    const file = target.files[0];
    if (target.files) {
      // check if the size is less than 25MB
      if (file.size > 25 * 1024 * 1024) {
        alert("Please upload an audio file less than 25MB");
        return;
      } else {
        const data = new FormData();
        data.append("file", file);
        setFormData(data);
      }
    }
  }

  const onTranscribe = async() => {
    setLoading(true);
    setMeetingMinutes("");
    setTranscribedText("");
    try {
      let response = await transcribe("/transcribe", formData);
      response && setTranscribedText(response)
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const generateMeetingMinutes = async () => {
    try {
      setGenerateLoading(true);
      let chunks = [], i = 0
      const chunkSize = 2000;
      if (transcribedText && transcribedText.length > chunkSize) {
        while (i <= transcribedText.length) {
          let chunk = transcribedText.slice(i, i + chunkSize);
          i += chunkSize;
          chunks.push(chunk)
        } 
        let promises = []
        for (let i = 0; i < chunks.length; i++) {
          let message = `${scripts.summary} '${chunks[i]}'`;
          let response = fetchResponse("/chats", message);
          promises.push(response)
        }
        Promise.all(promises)
        .then(async (values) => {
          setMeetingMinutes(values.join(" "));
          let message = `${scripts.meetingMinutes} ${values.join(" ")}`;
          let response = await fetchResponse("/chats", message);
          if (!response) {
            response = errorMessage;
          }
          setMeetingMinutes(response);
        });
      } else {
        let message = `${scripts.meetingMinutes} ${transcribedText}`;
        let response = await fetchResponse("/chats", message);
        if (!response) {
          response = errorMessage;
        }
        setMeetingMinutes(response);
      }
    } catch {
      setMeetingMinutes(errorMessage);
    } finally {
      setGenerateLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        Choose File to transcribe
      </label>
      <Input
        type="file"
        className={styles.file}
        accept={acceptedFileFormats}
        onChange={({ target }) => onChangeFile(target)}
      />
      <div className={styles.buttonWrapper}>
        <Button onClick={onTranscribe} type="primary" className={styles.button}>
          Transcribe
        </Button>
        <Button onClick={generateMeetingMinutes} type="default" className={styles.button}>
          Generate meeting minutes
        </Button>
      </div>
      {
        loading && (
          <div> Processing file ... </div>
        )
      }
      {
        transcribedText && (
          <>
            <h4>Video Script</h4>
            <div className={styles.text}>
              {transcribedText}
            </div>
          </>
        )
      }
      <br/>
      {
        generateLoading && (
          <div> Generating Metting minutes ... </div>
        )
      }
      {
        meetingMinutes && (
          <>
            <h4>Minutes of meeting</h4>
            <div className={styles.text}>
              {processText(meetingMinutes)}
            </div>
          </>
        )
      }
    </div>
  );
};

export default Home;