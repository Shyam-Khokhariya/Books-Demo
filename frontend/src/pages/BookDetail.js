/* eslint-disable prettier/prettier */
import React, {useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {colors} from '../utils/Colors';
import {BackIcon, ImageIcon} from '../assets';
import {SliderBox} from 'react-native-image-slider-box';
import CommentItem from '../components/CommentItem';

const BookDetails = ({route, navigation}) => {
  const commentRef = useRef(null);
  const {book} = route.params;

  const [comments, setComments] = React.useState([
    {
      id: 1,
      image: require('../assets/user1.png'),
      username: '안녕 나 응애 ',
      verified: true,
      timestamp: '1일전',
      commentText:
        '어머 제가 있던 테이블이 제일 반응이 좋았나보네요🤭  우짤래미님도 아시겠지만 저도 일반인 몸매 그 이상도 이하도 아니잖아요?! 그런 제가 기꺼이 도전해봤는데 생각보다 괜찮았어요! 오늘 중으로 라이브 리뷰 올라온다고 하니 꼭 봐주세용~!',
      likeCount: 5,
      commentCount: 5,
      replies: [
        {
          id: 2,
          image: require('../assets/user2.png'),
          username: 'ㅇㅅㅇ',
          verified: false,
          timestamp: '1일전',
          commentText: '오 대박! 라이브 리뷰 오늘 올라온대요? 챙겨봐야겠다',
          likeCount: 5,
          commentCount: 0,
          replies: [],
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = React.useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentItem = {
        id: comments.length + 1,
        image: require('../assets/user1.png'),
        verified: true,
        username: '샤얌 ',
        timestamp: '방금',
        commentText: newComment,
        likeCount: 0,
        commentCount: 0,
        replies: [],
      };

      setComments(prevComments => [...prevComments, newCommentItem]);
      setNewComment('');
      commentRef?.current?.scrollToEnd();
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  const renderHeader = useMemo(
    () => (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{book.title}</Text>
        </View>
        <SliderBox
          images={[book.coverImage, ...book.images]}
          sliderBoxHeight={400}
        />
        <View style={styles.detailContainer}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.description}>{book.description}</Text>
          <View style={styles.bookPrice}>
            <Text style={styles.percent}>{`${book.discountRate}%`}</Text>
            <Text style={styles.price}>{`${book.price}원`}</Text>
          </View>
        </View>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <View>
      <FlatList
        ref={commentRef}
        data={comments}
        style={styles.containerStyle}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CommentItem comment={item} />}
        ListHeaderComponent={renderHeader}
      />
      <View style={styles.bottomInputContainer}>
        <ImageIcon />
        <TextInput
          style={styles.inputContainer}
          placeholder="댓글을 남겨주세요."
          onSubmitEditing={handleAddComment}
          value={newComment}
          onChangeText={text => setNewComment(text)}
        />

        <TouchableOpacity
          style={styles.submitContainer}
          onPress={handleAddComment}
          disabled={newComment.trim() === ''}>
          <Text style={styles.submitText}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerStyle: {
    backgroundColor: colors.white,
    marginBottom: 50,
  },
  headerContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  detailContainer: {
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: colors.grey,
  },
  description: {
    fontWeight: '400',
    color: colors.text,
    fontSize: 12,
    marginVertical: 10,
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
  bottomInputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: colors.white,
    left: 0,
    right: 0,
    paddingLeft: 10,
  },
  inputContainer: {
    height: 48,
    paddingLeft: 10,
    width: '80%',
  },
});
