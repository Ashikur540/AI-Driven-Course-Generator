export async function getVideoContentID(query: string): Promise<string> {
  try {
    const url = `https://content-youtube.googleapis.com/youtube/v3/search?maxResults=1&part=snippet&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.error) {
      throw new Error(data.error.message);
    }
    const videoID = data?.items[0]?.id?.videoId;
    return videoID ?? "";
  } catch (error) {
    throw error;
  }
}
