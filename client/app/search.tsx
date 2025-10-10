import { StyleSheet, Text } from "react-native";
import SearchInput from "./components/common/search-input";
import Layout from "./components/layout/layout";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#32343E",
  },
});
const Search = () => {
  const onSearch = () => {};
  return (
    <Layout>
      <SearchInput
        placeholder={"Search dishes, restaurants"}
        onSearch={onSearch}
      />
      <Text style={styles.title}>Recent Keywords</Text>
    </Layout>
  );
};
export default Search;
