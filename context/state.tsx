import { useMantineTheme } from "@mantine/core";
import domtoimage from "dom-to-image";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import anilist from "../services/anilist";

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
    scale: 1,
    titleFormat: "userPreferred",
  });
  const [mediaList, setMediaList] = useState<any>([]);
  const [backupExist, setBackupExist] = useState<boolean>(false);
  const [backup, setBackup] = useState<any[]>([]);

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
    setMediaStatus: (id: number, status: boolean) => {
      const newMediaList = [...mediaList];
      const media = newMediaList.find((m: any) => m.id === id);
      if (media) {
        media.isDone = status;
      }
      setMediaList(newMediaList);
    },
    getMediaLink: (content: any): string => {
      switch (content.type) {
        case "ANIME":
          return `https://anilist.co/anime/${content.id}`;
        case "MANGA":
          return `https://anilist.co/manga/${content.id}`;
        default:
          return "";
      }
    },
    clearMediaList: () => {
      setMediaList([]);
    },
    checkBackup: () => {
      if (typeof window !== "undefined") {
        const backup = window.localStorage.getItem("backupList");
        setBackupExist(backup?.length !== 0);
        setBackup(JSON.parse(localStorage.getItem("backupList") || "[]")
        );
      }
    },
    saveBingo() {
      let savedBingo = {
        title: value.styles.title || `${new Date().toLocaleString()} (${new Date().getTime()})`,
        date: new Date().getTime(),
        backup: {
          list: value.mediaList,
          style: value.styles,
        },
      };
      let newBingo = [...backup, savedBingo]
      localStorage.setItem("backupList", JSON.stringify(newBingo));
      setBackup(newBingo)
    },
    deleteSelectedBackup: (selectedBackup: any) => {
      let remainingSlot = backup.filter((m: any) => m.date !== selectedBackup.date); 
      setBackup(remainingSlot);
      localStorage.setItem("backupList", JSON.stringify(remainingSlot));
    },
    restoreBackup: (index: number) => {
      const selectedBackup = backup[index].backup;    
      setStyles(selectedBackup.style);
      setMediaList(selectedBackup.list);
    },
    saveDivAsImage: (element: any, imageFileName: any): Promise<any> => {
      return domtoimage
        .toPng(element, {
          width: element.clientWidth * value.styles.scale,
          height: element.clientHeight * value.styles.scale,
          style: {
            transform: "scale(" + value.styles.scale + ")",
            transformOrigin: "top left",
          },
          cacheBust: true,
        })
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          downloadImage(dataUrl, imageFileName);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    },
    // Search
    searchMedia(search: string, category: string): Promise<any> {
      switch (category) {
        case "anime":
        case "manga":
          return anilist.searchMedia(search, category);
        case "character":
          return anilist.searchCharacter(search);
        case "staff":
          return anilist.searchStaff(search);
        default:
          return Promise.reject("Invalid category");
      }
    },
  };

  const value = {
    styles,
    mediaList,
    backupExist,
    backup
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
