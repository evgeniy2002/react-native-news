import axios from 'axios';
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';
import { Loading } from '../components/Loading';

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 15px;
`;

const PostText = styled.Text`
  font-size: 14px;
  line-height: 20px;
`;

export const FullPost = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const { id, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title,
    });
    axios
      .get('https://6313b8fffc9dc45cb4e551ab.mockapi.io/articles/' + id)
      .then((res) => setData(res.data))
      .catch((err) => Alert.alert('Ошибка', 'Не удалось получить статьи'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ padding: 10 }}>
      <PostImage
        source={{
          uri: data.imageUrl,
        }}
      />
      <PostText>{data.text}</PostText>
    </View>
  );
};
