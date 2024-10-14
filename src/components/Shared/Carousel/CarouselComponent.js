import { View } from "react-native";
import { Image } from "@rneui/base";
import { styles } from "./Carousel.styles";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { useState } from "react";

export function CarouselComponent(props) {
  const { images, width, height, hideDots } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    return <Image source={{ uri: item }} style={{ height, width }} />;
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotContainer}
        dotStyle={styles.dot}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        vertical={false}
        onSnapToItem={index => setActiveIndex(index)}
      />
      {!hideDots && pagination()}
    </View>
  );
}
