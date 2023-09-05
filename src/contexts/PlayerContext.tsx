import { createContext, useState, ReactNode, useContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayerState: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
};

// export const PlayerContext = createContext("");

// export const PlayerContext = createContext({
//   episodeList: [],
//   currentEpisodeIndex: 0,
// });

export const PlayerContext = createContext({} as PlayerContextData);

//no app.tsx eu preciso encapsular todos os componentes
//que terão acesso a esse player.

type PlayerContextProviderProps = {
  children: ReactNode;
};
// esse children pode ser qualquer coisa que se colocaria dentro do jsx
// e quando ele pode ser qualquer coisa como tags HTML botamos a propriedade
// dele como ReactNode que vem de dentro do próprio react
export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, SetEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    SetEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    SetEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  // se estiver tocando da pause se estiver em pause da play
  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  // aqui ele pega outras formas de parar o audio como a barra de espaço por exemplo
  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }
  // limpa o player
  function clearPlayerState() {
    SetEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        isPlaying,
        isLooping,
        isShuffling,
        playNext,
        playPrevious,
        togglePlay,
        toggleLoop,
        setPlayingState,
        hasNext,
        hasPrevious,
        toggleShuffle,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
