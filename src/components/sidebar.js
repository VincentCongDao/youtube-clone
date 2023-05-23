import React from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

function sidebar({ selectCated, setSelectCated }) {
  return (
    <Stack
      direction="row"
      sx={{
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => setSelectCated(category.name)}
          style={{
            background: category.name === selectCated && "#FC1503",
            color: "white",
          }}
          key={category.name}
        >
          <span
            style={{
              color: category.name === selectCated ? "white" : "red",
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectCated ? "1" : "0.8",
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
}

export default sidebar;
