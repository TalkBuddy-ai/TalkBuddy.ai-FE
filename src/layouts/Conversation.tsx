import { Avatar, Card, Space, Tag } from "antd";
import styles from "../styles/Conversation.module.css";
import { UserOutlined } from "@ant-design/icons";
import Message from "@/components/Message";

const Conversation = () => {
  return (
    <div className={styles.container}>
      <Card
        style={{ width: 630, height: 500 }}
        bordered={false}
        className={styles.card}
      >
        {
          //for testing only, here we should call message component
          <>
            <Space>
              <Avatar icon={<UserOutlined />} />
              <Tag
                style={{
                  backgroundColor: "white",
                  width: 500,
                  height: 30,
                  marginBottom: 10,
                }}
              >
                Hi there
              </Tag>
            </Space>
            <Space>
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
