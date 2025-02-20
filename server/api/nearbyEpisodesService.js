import redisClient from "../config/redisClient.js";

export const getOfferEpisodes = async (data, seasons) => {
  const { seriesName, seasonNumber, episodeNumber } = data;

  const episodeIndex = parseInt(episodeNumber, 10) - 1;


  try {
    for (let i = episodeIndex - 2; i <= episodeIndex + 2; i++) {
      if (i >= 0 && i < Object.keys(seasons.episodes).length) {
        const episode = seasons.episodes[i.toString()];
        const title = episode.title;
        const episodeNum = i + 1;
        const cacheKey = `${seriesName}:season:${seasonNumber}:episode:${episodeNum}`;
        await redisClient.setEx(cacheKey, 3600, title);
      }
    }
  } catch (error) {
    console.error("Error in storing episodes:", error);
  }
};
