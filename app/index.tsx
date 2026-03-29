import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const WEB_APP_URL =
  "https://docs.google.com/spreadsheets/d/1oJZmTKLeDjLaBN1N17BNGW4f6XINL9jowCnZgPq4QO0/export?format=csv&gid=0&range=B2:B4";
// "https://docs.google.com/spreadsheets/d/1UkfNOGlLoeFtdoAJD22kSbhJdXVEG-31BeK2Asirglg/export?format=csv&gid=0&range=B2:B4";

const fetchSheetData = async () => {
  const res = await fetch(WEB_APP_URL);
  const text = await res.text();
  return text.split("\n");
};

const useSheetData = () => {
  const [data, setData] = useState<string[] | undefined>(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const refetch = useCallback(async () => {
    setIsFetching(true);
    try {
      const fetchedData = await fetchSheetData();
      setData(fetchedData);
    } catch (e) {
      const error = e instanceof Error ? e : Error(String(e));
      setError(error);
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, []);
  const isLoading = data === undefined;

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, isFetching, error, refetch };
};

export default function HomeScreen() {
  const { data, isLoading, error, isFetching, refetch } = useSheetData();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            style={styles.list}
            data={data}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          />
          <Pressable
            accessibilityRole='button'
            disabled={isFetching}
            onPress={refetch}
            style={({ pressed }) => [
              styles.button,
              isFetching && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}>
            <Text style={styles.buttonText}>Refresh</Text>
          </Pressable>
        </>
      )}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  list: {
    flex: 0,
    flexGrow: 0,
  },
  item: {
    textAlign: "center",
  },
  button: {
    minWidth: 140,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#0a7ea4",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#b00020",
  },
});
