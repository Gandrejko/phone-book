import React, {FC} from 'react';
import {View, Image, StyleSheet} from 'react-native';

type AvatarProps = {
  img: any;
  width: number;
  height: number;
};

export const Avatar: FC<AvatarProps> = ({img, width, height}) => {
  return (
    <View style={[styles.container, {width, height, borderRadius: width}]}>
      <Image style={styles.image} source={img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'gray',
  },
  image: {
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    flex: 1,
  },
});

export default Avatar;
