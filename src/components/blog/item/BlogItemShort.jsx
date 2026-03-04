"use server";

import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import DatePharse from "../../../components/DatePharse";
import style from "./BlogItem.module.scss";

export const BlogItemShort = async ({ item, token }) => {
    return (
        <Link href={BLOG_ROUTE(token) + "/" + item?.id}>
            <Box
                pl={3.2}
                borderColor={"text.primary"}
                borderLeft={"1px dotted "}
            >
                <Box display={"flex"} gap={0.5}>
                    <Typography
                        fontWeight={"400"}
                        color="inherit"
                        fontSize={15}
                        component="div"
                    >
                        <DatePharse date={item?.date} />
                    </Typography>

                    <Typography
                        fontWeight={"400"}
                        color="inherit"
                        fontSize={15}
                        component="div"
                    >
                        {item?.time?.split(":")?.splice(0, 2)?.join(":")}
                    </Typography>
                </Box>
                <Typography
                    className={style.subtitle}
                    fontWeight={"700"}
                    color="inherit"
                    fontSize={15}
                    lineHeight={"15px"}
                    component="div"
                >
                    {item?.title}
                </Typography>
            </Box>
        </Link>
    );
};
