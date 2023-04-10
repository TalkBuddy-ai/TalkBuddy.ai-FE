import { Select, Space } from "antd";
import styles from "@/styles/Chat.module.css";
import Conversation from "@/layouts/Conversation";
import InputMsg from "@/components/Input";

const Chat = () => {
  return (
    <div className={styles.main}>
      <div>
        <Conversation />
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
        <InputMsg />
      </Space>
    </div>
  );
};
export default Chat;
