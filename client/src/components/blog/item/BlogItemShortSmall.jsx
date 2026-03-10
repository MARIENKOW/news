import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import DatePharse from "../../DatePharse";
import style from "./BlogItem.module.scss";

export const BlogItemShortSmall = async ({ item, token }) => {
    const date = DatePharse({ date: item?.date });
    return (
        <Link href={BLOG_ROUTE(token) + "/" + item?.id}>
            <Box
                pr={1}
                borderColor={"#fff"}
                borderRight={"1px dotted "}
            >
                <Box display={"flex"} gap={0.5}>
                    {date && (
                        <>
                            <Typography
                                fontWeight={"400"}
                                color="#fff"
                                fontSize={15}
                                component="div"
                            >
                                {date}
                            </Typography>
                            <Typography
                                fontWeight={"400"}
                                color="#fff"
                                fontSize={15}
                                component="div"
                            >
                                |
                            </Typography>
                        </>
                    )}
                    <Typography
                        fontWeight={"400"}
                        color="#fff"
                        fontSize={15}
                        component="div"
                    >
                        {item?.time?.split(":")?.splice(0, 2)?.join(":")}
                    </Typography>
                </Box>
                <Typography
                    className={style.subtitle}
                    fontWeight={"700"}
                    fontSize={15}
                    color='#fff'
                    lineHeight={"15px"}
                    component="div"
                >
                    {item?.title}
                </Typography>
            </Box>
        </Link>
    );
};
