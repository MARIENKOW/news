"use client";

import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import { Box, Typography } from "@mui/material";
import DatePharse from "../../DatePharse";
import style from "./BlogItem.module.scss";

const BlogItemFIrst = ({ Blog, token, i }) => {
    const date = DatePharse({ date: Blog?.date });

    return (
        <Link href={BLOG_ROUTE(token) + "/" + Blog?.id}>
            <Box
                display={"flex"}
                bgcolor={i % 2 ? "secondary.main" : "primary.main"}
            >
                <Box
                    sx={{ aspectRatio: "320 / 180", width: "42%" }}
                    alt="blogShortImg"
                    component={"img"}
                    src={Blog?.img?.path || "default.png"}
                />
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    p={1.5}
                >
                    <Typography
                        className={style.subtitle}
                        fontWeight={"700"}
                        color="inherit"
                        fontSize={16}
                        lineHeight={"20px"}
                        component="div"
                    >
                        {Blog?.title}
                    </Typography>
                </Box>
            </Box>
        </Link>
    );
};

export default BlogItemFIrst;
