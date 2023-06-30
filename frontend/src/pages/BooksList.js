/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utils/Colors';
import axios from 'axios';
import Config from "react-native-config";

const deviceWidth = Dimensions.get('window').width;
const itemWidth = (deviceWidth - 4) / 2;
const limit = 10;
const BooksList = ({navigation}) => {
  const [books, setBooks] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);

  const fetchBooks = async newPage => {
    try {
      // Simulating an API call to fetch books data
      const response = await axios.get(
        `${Config.API_URL}api/v1/books?offset=${
          newPage * limit
        }&limit=${limit}`,
      );
      const data = await response.data;

      if (page === 0) {
        setBooks(data.books);
      } else {
        setBooks([...books, ...data.books]);
      }
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(0);
    fetchBooks(0);
  };

  const handleLoadMore = () => {
    if (!loadingMore && (page + 1) * limit <= totalCount) {
      setLoadingMore(true);
      setPage(page + 1);
      fetchBooks(page + 1);
    }
  };

  React.useEffect(() => {
    fetchBooks(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToBookDetail = item => {
    navigation.navigate('BookDetails', {book: item});
  };

  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }

    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color={colors.red} />
      </View>
    );
  };

  const renderBookItem = ({item}) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigateToBookDetail(item)}>
      <Image source={{uri: item.coverImage}} style={styles.bookImage} />
      <View style={styles.bookDetail}>
        <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <View style={styles.bookPrice}>
          <Text style={styles.percent}>{`${item.discountRate}%`}</Text>
          <Text style={styles.price}>{`${item.price}원`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BookList</Text>
      {books.length ? (
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={item => item._id.toString()}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.red} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 15,
    color: colors.text,
  },
  bookItem: {
    margin: 1,
    width: itemWidth,
  },
  bookImage: {
    width: itemWidth,
    height: 200,
    marginBottom: 8,
  },
  bookDetail: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bookTitle: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    height: 35,
  },
  bookPrice: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percent: {
    color: colors.red,
    fontSize: 14,
    fontWeight: '700',
  },
  price: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BooksList;
