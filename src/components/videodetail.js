import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";
function Videodetail() {
  const [VideoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
    });
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setVideos(data.items);
      }
    );
  });

  // Sometimes the JSON doesn't have all the videos or title
  // This will able to solve the issue if the fetch JSON doesn't work
  if (!VideoDetail?.snippet) return "Loading...";
  // Object structure
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { likeCount, viewCount },
  } = VideoDetail;
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row", pb: "25px" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography variant="h5" fontWeight="bold" p={2} color="#fff">
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                  pl="5px"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{
                      fontSize: "12px",
                      color: "gray",
                      m1: "5px",
                      pr: "10px",
                    }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Box
        px={2}
        py={{ md: 1, xs: 5 }}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <Videos videos={videos} direction="row" />
      </Box>
    </Box>
  );
}

export default Videodetail;
