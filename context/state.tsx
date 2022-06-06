import { useMantineTheme } from "@mantine/core";
import { createContext, ReactNode, useContext, useState } from "react";

const BingoContext = createContext<any>({
  styles: {},
  mediaList: [],
});

export function useBingo() {
  return useContext(BingoContext);
}

type Props = {
  children: ReactNode;
};

export function BingoProvider({ children }: Props) {
  const theme = useMantineTheme();
  const [styles, setStyles] = useState<any>({
    title: "Anime bingo",
    size: String(3 * 3),
    borderColor: theme.colors.gray[0],
    backgroundColor: theme.colors.gray[9],
    showTitles: true,
    showMediaTitles: true,
  });
  const [mediaList, setMediaList] = useState<any>([]);

  const updateStyles = (newStyles: any) => {
    setStyles({ ...styles, ...newStyles });
  };

  const pushMedia = (media: any) => {
    // If media doesn't already exist in medialist push new media
    if (!mediaList.find((m: any) => m.id === media.id)) {
      setMediaList([...mediaList, media]);
    }
  };

  const removeSelectedMedia = (index: number) => {
    setMediaList(mediaList.filter((_: any, i: number) => i !== index));
  };

  const clearMediaList = () => {
    setMediaList([]);
  };

  const value = {
    styles,
    mediaList,
  };

  return (
    <>
      <BingoContext.Provider
        value={{
          value,
          updateStyles,
          pushMedia,
          clearMediaList,
          removeSelectedMedia,
        }}
      >
        {children}
      </BingoContext.Provider>
    </>
  );
}
