import { LatLng } from "react-native-maps/lib/sharedTypes";
import React, { useMemo, useRef, useState } from "react";
import { addressDataSet } from "@/constants/dataset";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ThemedView } from "@/components/themed-view";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

type Address = {
  title: string;
  description: string | null;
  latLng: LatLng;
};

export default function MapScreen() {
  const [addresses] = useState<Address[]>(addressDataSet);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['35%', '55%'], []);

  const openAddressSheet = (address: Address) => {
    setSelectedAddress(address);
    bottomSheetRef.current?.present();
  };

  const closeAddressSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  return (
    <ThemedView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.2396318,
          longitude: -1.5548414,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={() => closeAddressSheet()}
      >
        {addresses.map((address, index) => (
          <Marker
            key={index}
            coordinate={address.latLng}
            title={address.title}
            description={address.description ?? undefined}
            onPress={() => openAddressSheet(address)}
          />
        ))}
      </MapView>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        onDismiss={() => setSelectedAddress(null)}
      >
        <BottomSheetView style={styles.sheetContent}>
          <View>
            <Image
              source={{
                uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
              }}
              style={styles.sheetImage}
            />

            <Text style={styles.sheetTitle}>
              {selectedAddress?.title ?? 'Adresse'}
            </Text>
            <Text style={styles.sheetDescription}>
              {(selectedAddress?.description ?? '').length > 0 ? selectedAddress?.description : 'Aucune description.'}
            </Text>
            <Text style={styles.sheetLoremIpsum}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  sheetContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sheetImage: {
    height: 150,
    objectFit: 'contain',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sheetDescription: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  sheetLoremIpsum: {
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 20,
  },
});
