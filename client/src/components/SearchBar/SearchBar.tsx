import Box from "@mui/material/Box";
import SearchInput from "./SearchInput";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddButton from "../Button/AddButton";
import { Episode } from "../../types/types";
import style from "./SearchBar.module.css";
import { getEpisodeTitle } from "../../api/series/series.api";

interface Props {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ title, setTitle }: Props) {
  //Input labels value
  const [seriesInput, setSeriesInput] = useState("");
  const [seasonInput, setSeasonInput] = useState("");
  const [episodeInput, setEpisodeInput] = useState("");

  //Visibility of the input labels
  const [showSeasonInput, setShowSeasonInput] = useState(false);
  const [showEpisodeInput, setShowEpisodeInput] = useState(false);

  const handleSeriesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSeriesInput(event.target.value);

    if (event.target.value) {
      setShowSeasonInput(true);
    } else {
      setShowSeasonInput(false);
      setShowEpisodeInput(false);
    }
  };

  const handleSeasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSeasonInput(event.target.value); 

    if (event.target.value) {
      setShowEpisodeInput(true);
    } else {
      setShowEpisodeInput(false);
    }
  };
  const handleEpisodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEpisodeInput(event.target.value);
  };

  const handleAddEpisode = async () => {
    const seriesEpisode: Episode = {
      seriesName: seriesInput,
      seasonNumber: seasonInput,
      episodeNumber: episodeInput,
    };
    try {
      const episodeTitle = await getEpisodeTitle(seriesEpisode);
      setTitle(episodeTitle);
    } catch (error) {
      console.error("error in search title", error);
    }
  };

  return (
    <Box className={style["search-bar-container"]}>
      <SearchInput
        value={seriesInput}
        onChange={handleSeriesChange}
        placeholder="Search series"
        showNextInput={showSeasonInput}
      />
      {showSeasonInput && (
        <SearchInput
          value={seasonInput}
          onChange={handleSeasonChange}
          placeholder="Search season"
          showNextInput={showEpisodeInput}
        />
      )}
      {showEpisodeInput && (
        <>
          <SearchInput
            value={episodeInput}
            onChange={handleEpisodeChange}
            placeholder="Search episode"
          />
          <AddButton onClick={handleAddEpisode} />
        </>
      )}
      <h3>title is : {title}</h3>
    </Box>
  );
}
