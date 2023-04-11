import { Avatar, Card, Space, Tag } from "antd";
import styles from "../styles/Conversation.module.css";
import { UserOutlined } from "@ant-design/icons";
import Message from "@/components/Message";

interface ConvProps {
  msg: string;
}

const Conversation = (props: ConvProps) => {
  return (
    <div className={styles.container}>
      <Card
        style={{ width: 630, height: 530 }}
        bordered={false}
        className={styles.card}
      >
        {
          //for testing only, here we should call message component
          <>
            <Space size={"middle"} style={{ marginBottom: 10 }}>
              <Avatar icon={<UserOutlined />} />
              <Tag
                style={{
                  backgroundColor: "white",
                  width: 500,
                  height: 30,
                  marginBottom: 10,
                }}
              >
                {props.msg}
              </Tag>
            </Space>
            <Space size={"middle"}>
              <Avatar
                style={{ backgroundColor: "#2A9978" }}
                icon={<UserOutlined />}
              />
              <Tag style={{ width: 500, height: 30 }} color={"#2A9978"}>
                Hi, How can I help you?
              </Tag>
            </Space>
          </>
        }
      </Card>
    </div>
  );
};
export default Conversation;
