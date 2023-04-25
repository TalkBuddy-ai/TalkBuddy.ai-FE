import { Select } from "antd";
import styles from "../styles/Chat.module.css";

const LangSelect = () => {
  return (
    <Select
      showSearch
      className={styles.langSelect}
      bordered={false}
      defaultValue="en-US"
      onChange={(value) => props.setLang(value)}
      placeholder="Select Language"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
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
  );
};
export default LangSelect;
