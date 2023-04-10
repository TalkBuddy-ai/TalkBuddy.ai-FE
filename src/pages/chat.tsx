import { Select, Space } from "antd";
import styles from "@/styles/Chat.module.css";
import Conversation from "@/layouts/Conversation";
import InputMsg from "@/components/Input";
import { useState } from "react";

const Chat = () => {
  const [msg, setMsg] = useState("");

  const sendMsg = (msg: string) => {
    setMsg(msg);
  };

  return (
    <div className={styles.main}>
      <div>
        <Conversation msg={msg} />
      </div>
      <Space
        size={"small"}
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Select
          showSearch
          className={styles.langSelect}
          bordered={false}
          placeholder="Select Language"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "English",
            },
            {
              value: "2",
              label: "Arabic",
            },
          ]}
        />
        <InputMsg sendMsg={sendMsg} />
      </Space>
    </div>
  );
};
export default Chat;
