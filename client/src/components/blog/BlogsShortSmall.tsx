"use server";

import { Box, Typography } from "@mui/material";

import BlogService from "../../services/BlogService";
import { BlogsImportantClient } from "./BlogsImportantClient";
import Link from "next/link";
import { SHORT_ROUTE } from "../../configs/routerLinks";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BlogItemShortSmall } from "./item/BlogItemShortSmall";

const blog = new BlogService();

export const BlogsShortSmall = async ({ token }) => {
    let data: any[];
    let error: unknown;

    try {
        const body = await blog.getShortSmall();
        data = body?.data || [];
    } catch (e) {
        console.log(e);
        e = error;
    }

    return (
        <Box mt={1}>
            <Box bgcolor={"primary.main"} position={"sticky"} top={48}>
                <Typography
                    fontWeight={700}
                    fontSize={17}
                    pt={0.4}
                    pb={0.4}
                    pl={2.2}
                    pr={2.2}
                    color="#fff"
                >
                    последние новости
                </Typography>
            </Box>
            <Box bgcolor={'#000'}>
                <Box
                    pr={2}
                    pl={3}
                    pt={3}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={3}
                >
                    {data?.map((el) => (
                        <BlogItemShortSmall key={'BSS'+el.id} item={el} token={token} />
                    ))}
                </Box>
                <Link href={SHORT_ROUTE(token)}>
                    <Box
                        display={"flex"}
                        pb={3}
                        pt={3}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={0.5}
                    >
                        <Typography
                            fontSize={18}
                            fontWeight={600}
                            color="primary"
                        >
                            последние новости
                        </Typography>
                        <ArrowForwardIcon color="primary" />
                    </Box>
                </Link>
            </Box>
        </Box>
    );
};
