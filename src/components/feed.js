import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from ".";

import { fetchFromAPI } from "../utils/fetchFromAPI";

// Contains two parts of the youtube
// Sidebar & Video feed
const Feed = () => {
  const [selectCated, setSelectCated] = useState("New");
  const [videos, setVideos] = useState([]);
  // lifecyle hooks
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectCated}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectCated]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar selectCated={selectCated} setSelectCated={setSelectCated} />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#3d3d3d" }}
        >
          Copyright: 2023 Trong D.
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectCated}
          <span style={{ color: "#F31503" }}> videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
