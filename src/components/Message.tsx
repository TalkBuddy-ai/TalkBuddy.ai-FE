import { message } from "@/utils/types";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Tag, Typography } from "antd";
import Typewriter from "typewriter-effect";

const { Paragraph } = Typography;

interface MessageProps {
  message: message;
}

const Message = (props: MessageProps) => {
  return (
    <div>
      <Space size={"middle"} style={{ marginBottom: 10 }}>
        <Avatar
          icon={<UserOutlined />}
          style={{
            backgroundColor:
              props.message.type === "receiver" ? "#2A9978" : "default",
          }}
        />
        <Tag
          style={{
            backgroundColor:
              props.message.type === "sender" ? "white" : "#2A9978",
            width: 500,
            height: 30,
            marginBottom: 10,
            fontSize: 15,
          }}
        >
          <Paragraph>
            {props.message.type === "receiver" ? (
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
        </Tag>
      </Space>
    </div>
  );
};
export default Message;
