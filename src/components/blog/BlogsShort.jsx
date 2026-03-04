"use server";

import { Box } from "@mui/material";
import { BlogItemShort } from "./item/BlogItemShort";

export const BlogsShort = async ({ data, token }) => {
    return (
        <Box display={"flex"} flexDirection={"column"} gap={4} m={1.5}>
            {data.map((item) => (
                <BlogItemShort token={token} key={item?.id} item={item} />
            ))}
        </Box>
    );
};
