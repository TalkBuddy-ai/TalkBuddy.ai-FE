import { Select } from "antd";
import styles from "../styles/Chat.module.css";

interface LangProps {
  setLang: (Language: string) => void;
}

const LangSelect = (props: LangProps) => {
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
          value: "en-US",
          label: "English",
        },
        {
          value: "ar-SA",
          label: "Arabic",
        },
      ]}
    />
  );
};
export default LangSelect;
