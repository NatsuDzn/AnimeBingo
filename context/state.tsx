import { useMantineTheme } from "@mantine/core";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [backupExist, setBackupExist] = useState<boolean>(false);
  const [backup, setBackup] = useState<any>(null);

  const updateStyles = (newStyles: any) => {
    setStyles({ ...styles, ...newStyles });
  };

  const pushMedia = (media: any) => {
    // If media doesn't already exist in medialist push new media
    if (!mediaList.find((m: any) => m.id === media.id)) {
      setMediaList([...mediaList, media]);
    }
  };

  const removeSelectedMedia = (id: number) => {
    setMediaList(mediaList.filter((m: any) => m.id !== id));
  };

  const clearMediaList = () => {
    setMediaList([]);
  };

  const checkBackup = () => {
    if (typeof window !== "undefined") {
      const backup = window.localStorage.getItem("backup");
      setBackupExist(backup !== null);
      setBackup(JSON.parse(backup || "{}"));
    }
  };

  const backupBingo = () => {
    localStorage.setItem(
      "backup",
      JSON.stringify({
        list: value.mediaList,
        style: value.styles,
        date: new Date().getTime(),
      })
    );
    checkBackup();
  };

  const deleteBackup = () => {
    localStorage.removeItem("backup");
    checkBackup();
  };

  const restoreBackup = () => {
    setStyles(backup.style);
    setMediaList(backup.list);
  }

  const value = {
    styles,
    mediaList,
    backup: {
      backupExist,
      ...backup,
    },
  };

  useEffect(() => {
    checkBackup();
  }, [backupExist]);

  return (
    <>
      <BingoContext.Provider
        value={{
          value,
          updateStyles,
          pushMedia,
          clearMediaList,
          removeSelectedMedia,
          backupBingo,
          deleteBackup,
          restoreBackup,
        }}
      >
        {children}
      </BingoContext.Provider>
    </>
  );
}
