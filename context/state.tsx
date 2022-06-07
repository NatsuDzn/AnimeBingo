import { useMantineTheme } from "@mantine/core";
import domtoimage from "dom-to-image";
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

  const downloadImage = (blob: any, fileName: any) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.download = fileName;
    fakeLink.href = blob;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
  };

  const bingoMethods = {
    updateStyles: (newStyles: any) => {
      setStyles({ ...styles, ...newStyles });
    },
    pushMedia: (media: any) => {
      // If media doesn't already exist in medialist push new media
      if (!mediaList.find((m: any) => m.id === media.id)) {
        setMediaList([...mediaList, media]);
      }
    },
    removeSelectedMedia: (id: number) => {
      setMediaList(mediaList.filter((m: any) => m.id !== id));
    },
    moveMedia: (source: number, destination: number) => {
      const newMediaList = [...mediaList];
      const [removed] = newMediaList.splice(source, 1);
      newMediaList.splice(destination, 0, removed);
      setMediaList(newMediaList);
    },
    clearMediaList: () => {
      setMediaList([]);
    },
    checkBackup: () => {
      if (typeof window !== "undefined") {
        const backup = window.localStorage.getItem("backup");
        setBackupExist(backup !== null);
        setBackup(JSON.parse(backup || "{}"));
      }
    },
    backupBingo: () => {
      localStorage.setItem(
        "backup",
        JSON.stringify({
          list: value.mediaList,
          style: value.styles,
          date: new Date().getTime(),
        })
      );
      bingoMethods.checkBackup();
    },
    deleteBackup: () => {
      localStorage.removeItem("backup");
      bingoMethods.checkBackup();
    },
    restoreBackup: () => {
      setStyles(backup.style);
      setMediaList(backup.list);
    },
    saveDivAsImage: async (element: any, imageFileName: any) => {
      domtoimage
        .toPng(element, { cacheBust: true })
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          downloadImage(dataUrl, imageFileName);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    },
  };

  const value = {
    styles,
    mediaList,
    backup: {
      backupExist,
      ...backup,
    },
  };

  useEffect(() => {
    bingoMethods.checkBackup();
    console.log("ok");
  }, [backupExist]);

  return (
    <>
      <BingoContext.Provider
        value={{
          value,
          bingoMethods,
        }}
      >
        {children}
      </BingoContext.Provider>
    </>
  );
}
