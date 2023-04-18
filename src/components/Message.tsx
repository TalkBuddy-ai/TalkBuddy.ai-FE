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
    props.type === MessageType.Sender ? "white" : "#2A9978"};
  width: 500px;
  height: 30px;
  margin-bottom: 10px;
`;

const Message = (props: MessageProps) => {
  return (
    <div>
      <Space size={"middle"} style={{ marginBottom: 10 }}>
        <StyledAvatar icon={<UserOutlined />} type={props.message.type} />
        <StyledTag type={props.message.type}>
          <Paragraph>
            {props.message.type === MessageType.Receiver ? (
              <Typewriter
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
          </Paragraph>
        </StyledTag>
      </Space>
    </div>
  );
};
export default Message;
