"use client";

import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import { Box, Typography } from "@mui/material";
import DatePharse from "../../DatePharse";
import style from "./BlogItem.module.scss";

const BlogItemAll = ({ Blog, token }) => {
    const data = Blog;
    return (
        <Link href={BLOG_ROUTE(token) + "/" + Blog?.id}>
            <Box display={"flex"} flexDirection={"column"} gap={0.4}>
                <Box
                    sx={{
                        aspectRatio: "135 / 76",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
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
                        fontWeight={"700"}
                        sx={{ fontSize: 18 }}
                        lineHeight={"20px"}
                        variant="h3"
                        component="div"
                    >
                        {data?.title}
                    </Typography>
                    {data?.subtitle ? (
                        <Typography
                            className={style.subtitle}
                            fontWeight={"400"}
                            sx={{
                                fontSize: 14,
                                lineHeight: "16px",
                            }}
                            // variant="h3"
                            // component="div"
                        >
                            {data?.subtitle}
                        </Typography>
                    ) : (
                        <Box
                            dangerouslySetInnerHTML={{ __html: data?.body }}
                            sx={{ overflow: "hidden", maxHeight: 200 }}
                        />
                    )}
                </Box>
            </Box>
        </Link>
    );
};

export default BlogItemAll;
