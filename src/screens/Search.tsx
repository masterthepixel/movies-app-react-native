import {useNavigation} from '@react-navigation/native';
import {Box, FlatList, Spinner, Text} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';

import {APP_IMAGES} from '../../assets/images';
import {Header} from '../components';
import useGetMovies from '../hooks/api/useGetMovies';
import {SearchScreenNavigationProp} from '../navigation/RootNavigator';
import {Movie} from '../types/api.type';

function SearchScreen() {
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [movieList, setMovieList] = useState<Movie[][]>([]);

  const navigation = useNavigation<SearchScreenNavigationProp>();
  const {data, isLoading, isFetched, isError} = useGetMovies(page);
  useEffect(() => {
    if (isFetched && data && !isError) {
      movieList[page - 1] = data;
      setMovieList(movieList);
      if (data.length < 20) {
        setEndReached(true);
      }
    }
  }, [isFetched, data, isError, movieList, page]);

  const getMovieList = useMemo(() => {
    let list: Movie[] = [];
    for (let i = 0; i < page; i++) {
      list = list.concat(movieList[i] || []);
    }
    return list;
  }, [movieList, page]);

  const loadMoreMovies = () => {
    if (endReached || isLoading) {
      return;
    }
    setPage(page + 1);
  };

  const onPressMovieItem = (item: Movie) => {
    navigation.navigate('Details', {movieId: item.id});
  };

  const renderMovieItem = ({item}: {item: Movie}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressMovieItem(item)}
        style={styles.movieItemWrapper}>
        <Image
          source={{uri: `${Config.IMAGE_ROOT_PATH}${item.poster_path}`}}
          defaultSource={APP_IMAGES.defaultMovie}
          style={styles.movie}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Box flex={1}>
      <Header title="Pop Movies" />
      <FlatList
        ListEmptyComponent={isLoading ? null : <Text>No movies</Text>}
        ListFooterComponent={
          endReached ? <Text>End reached</Text> : <Spinner mt={5} />
        }
        data={getMovieList}
        renderItem={renderMovieItem}
        numColumns={2}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreMovies}
        contentContainerStyle={styles.scroll}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 100,
  },
  movieItemWrapper: {
    width: '50%',
  },
  movie: {
    width: '100%',
    paddingBottom: '160%',
    resizeMode: 'cover',
  },
});

export default SearchScreen;
