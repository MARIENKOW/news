"use client";

import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import { Box, Typography } from "@mui/material";
import DatePharse from "../../DatePharse";
import style from "./BlogItem.module.scss";

const BlogItemUser = ({ Blog, token }) => {
    const date = DatePharse({ date: Blog?.date });

    return (
        <Link href={BLOG_ROUTE(token) + "/" + Blog?.id}>
            <Box display={"flex"} gap={1.4}>
                <Box
                    sx={{ aspectRatio: "135 / 76", width: "37%" }}
                    alt="blogShortImg"
                    component={"img"}
                    src={Blog?.img?.path || "default.png"}
                />
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                >
                    <Typography
                        className={style.subtitle}
                        fontWeight={"600"}
                        color="inherit"
                        fontSize={15}
                        lineHeight={"15px"}
                        component="div"
                    >
                        {Blog?.title}
                    </Typography>
                    <Box display={"flex"} gap={0.5}>
                        {date && (
                            <>
                                <Typography
                                    fontWeight={"300"}
                                    color="inherit"
                                    fontSize={12}
                                    component="div"
                                >
                                    {date}
                                </Typography>
                                <Typography
                                    fontWeight={"300"}
                                    color="inherit"
                                    fontSize={12}
                                    component="div"
                                >
                                    |
                                </Typography>
                            </>
                        )}
                        <Typography
                            fontWeight={"300"}
                            color="inherit"
                            fontSize={12}
                            component="div"
                        >
                            {Blog?.time?.split(":")?.splice(0, 2)?.join(":")}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Link>
    );
};

export default BlogItemUser;
