import { View, Text, ScrollView } from "react-native";
import Layout from "./components/layout/layout";
import SearchInput from "./components/common/search-input";

const Address = () => {
  return (
    <Layout
      header={{ title: "选择地址", rightNode: <Text>新增收货地址</Text> }}
    >
      <ScrollView>
        <SearchInput placeholder="搜索小区/写字楼/学校等" />
      </ScrollView>
    </Layout>
  );
};
export default Address;
