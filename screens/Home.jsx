import React from 'react';
import axios from 'axios';
import {
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';

export const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://6313b8fffc9dc45cb4e551ab.mockapi.io/articles')
      .then((res) => setItems(res.data))
      .catch((err) => Alert.alert('Ошибка', 'Не удалось получить статьи'))
      .finally(() => setIsLoading(false));
    // .catch((err) => Alert.alert('Ошибка', 'Не удалось получить статьи'));
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
            <Post title={item.title} image={item.imageUrl} createdAt={item.createdAt} />
          </TouchableOpacity>
        )}
      />

      {/* <StatusBar theme="auto" /> */}
    </View>
  );
};
