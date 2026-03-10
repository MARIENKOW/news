"use server";

import { Box, Typography } from "@mui/material";

import BlogService from "../../services/BlogService";
import { BlogsImportantClient } from "./BlogsImportantClient";

const blog = new BlogService();

export const BlogsImportant = async ({ token }) => {
    let data: any[];
    let error: unknown;

    try {
        const body = await blog.getImportant();
        data = body?.data?.data || [];
    } catch (e) {
        console.log(e);
    }

    return (
        <Box>
            <Box bgcolor={"secondary.main"} position={"sticky"} top={48}>
                <Typography
                    fontWeight={700}
                    fontSize={17}
                    pt={0.4}
                    color='#fff'
                    pb={0.4}
                    pl={2.2}
                    pr={2.2}
                >
                    Важное и интeресное
                </Typography>
            </Box>
            <BlogsImportantClient initData={data} token={token} />
        </Box>
    );
};
