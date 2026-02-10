import { Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";

export function RatingStars({
  rating,
}: {
  rating: number;
}) {
  const fullStars: number = Math.floor(rating);
  const halfStar: boolean = rating % 1 !== 0;

  return (
    <View style={[
      styles.container,
      { flexDirection: 'row' },
    ]}>
      <Text style={styles.text}>{rating.toFixed(1)}</Text>
      {Array.from(Array(fullStars)).map((_, i) => (
        <IconSymbol key={`full-star-${i}`} name="star.fill" color="#ff0" />
      ))}
      {halfStar && (
        <IconSymbol key="half-star" name="star.lefthalf.fill" color="#ff0" />
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  text: {
    marginTop: 4,
    marginRight: 4,
  }
};