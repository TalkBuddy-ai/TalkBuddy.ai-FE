import { processText } from "@/utils";
import { MessageType, message } from "@/utils/types";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTypewriter } from "react-simple-typewriter";
import styled from "styled-components";

const { Paragraph } = Typography;

interface MessageProps {
  message: message;
  setFinishTyping: (value: boolean) => void;
  setFinishLoading: (value: boolean) => void;
  isStopGenerate: boolean;
  setStopGenerate: (value: boolean) => void
}

const StyledAvatar = styled((props) => <Avatar {...props} />)`
  background-color: ${(props) =>
    props.type === MessageType.Receiver ? "#2A9978" : "default"};
`;

const StyledTag = styled((props) => <Tag {...props} />)`
  background-color: ${(props) =>
    props.type === MessageType.Sender ? "white" : "#e9f4f1"};
  white-space: initial;
  font-size: 15px;
  border: 0;
`;

const StyledParagraph = styled((props) => <Paragraph {...props} />)`
  font-size: 15px;
  margin-bottom: 0px !important;
`;

const Message = (props: MessageProps) => {
  const [currentText, setCurrentText] = useState("");
  const [text, helper] = useTypewriter({
    words: !props.isStopGenerate ? [props.message?.msg] : [""],
    typeSpeed: 30,
    loop: 1,
    onType: () => {
      if (!props.isStopGenerate) {
        props.setFinishTyping(false);
        setCurrentText(text);
      }
    },
  });
  const { isDone } = helper;

  useEffect(() => {
    if (isDone) props.setFinishTyping(true);
  }, [isDone]);

  useEffect(() => {
    if (props.isStopGenerate) {
      props.setFinishTyping(true);
      props.setFinishLoading(true);
      props.setStopGenerate(true);
    }
  }, [props.isStopGenerate]);

  return (
    <div>
      <Space size={"middle"} style={{ marginBottom: 10 }}>
        <StyledAvatar icon={<UserOutlined />} type={props.message.type} />
        <StyledTag type={props.message.type}>
          <StyledParagraph>
            {props.message.type === MessageType.Receiver
              ? processText(currentText)
              : props.message.msg}
          </StyledParagraph>
        </StyledTag>
      </Space>
    </div>
  );
};
export default Message;
