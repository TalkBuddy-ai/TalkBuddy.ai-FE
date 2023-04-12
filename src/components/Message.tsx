import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Tag } from "antd";

interface MessageProps {
  message: { msg: string; type: string };
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
          }}
        >
          {props.message.msg}
        </Tag>
      </Space>
    </div>
  );
};
export default Message;
