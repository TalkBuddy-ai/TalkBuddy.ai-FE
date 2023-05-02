import { MessageType, message } from "@/utils/types";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Tag, Typography } from "antd";
import Typewriter from "typewriter-effect";
import styled from "styled-components";

const { Paragraph } = Typography;

interface MessageProps {
  message: message;
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
  return (
    <div>
      <Space size={"middle"} style={{ marginBottom: 10 }}>
        <StyledAvatar icon={<UserOutlined />} type={props.message.type} />
        <StyledTag type={props.message.type}>
          <StyledParagraph>
            {props.message.type === MessageType.Receiver ? (
              <Typewriter
                options={{
                  delay: 50,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(props.message.msg)
                    .start()
                    .pauseFor(1000);
                }}
              />
            ) : (
              props.message.msg
            )}
          </StyledParagraph>
        </StyledTag>
      </Space>
    </div>
  );
};
export default Message;
