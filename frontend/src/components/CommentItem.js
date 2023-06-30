/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {CommentIcon, LikeIcon, MoreIcon, VerifiedIcon} from '../assets';
import {colors} from '../utils/Colors';

const CommentItem = ({comment}) => {
  const {
    username,
    image,
    verified,
    timestamp,
    commentText,
    likeCount,
    commentCount,
    replies,
  } = comment;
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.infoContainer}>
          <Image source={image} />
          <Text style={styles.username}>{username}</Text>
          {verified && <VerifiedIcon />}
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
        <MoreIcon />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.commentText}>{commentText}</Text>

        <View style={styles.likeCommentContainer}>
          <View style={styles.likeContainer}>
            <LikeIcon />
            <Text style={styles.likeCount}>{likeCount}</Text>
          </View>
          {commentCount ? (
            <View style={styles.likeContainer}>
              <CommentIcon />
              <Text style={styles.likeCount}>{commentCount}</Text>
            </View>
          ) : null}
        </View>

        {replies && replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  timestamp: {
    marginLeft: 5,
    fontSize: 12,
    color: colors.darkGrey,
  },
  descriptionContainer: {
    paddingLeft: 45,
  },
  commentText: {
    marginTop: 5,
    fontSize: 14,
  },
  likeCommentContainer: {
    flexDirection: 'row',
    marginTop: 10,
    color: colors.darkGrey,
  },
  repliesContainer: {
    marginHorizontal: -10,
    marginTop: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  likeCount: {
    marginLeft: 4,
  },
});

export default CommentItem;
