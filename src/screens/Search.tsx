import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlatList, Spinner, Text} from 'native-base';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Header} from '../components/Header';
import useGetMovies from '../hooks/api/useGetMovies';
import {Movie} from '../types/api.type';
import {APP_IMAGES} from '../../assets/images';

function SearchScreen() {
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [movieList, setMovieList] = useState<Array<Movie[]>>([]);

  const navigation = useNavigation();
  const {data, isLoading, isFetched, isError} = useGetMovies(page);

  useEffect(() => {
    if (isFetched && data && !isError) {
      const updated = [...movieList];
      updated[page - 1] = data;
      setMovieList(updated);
      if (data.length < 20) {
        setEndReached(true);
      }
    }
  }, [isFetched, data, isError]);

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

  const renderMovieItem = ({item}: {item: Movie}) => {
    return (
      <Image
        source={{uri: `${Config.IMAGE_ROOT_PATH}${item.poster_path}`}}
        defaultSource={APP_IMAGES.defaultMovie}
        style={styles.movie}
      />
    );
  };

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 100,
  },
  movie: {
    width: '50%',
    resizeMode: 'cover',
    paddingBottom: '80%',
  },
});

export default SearchScreen;
