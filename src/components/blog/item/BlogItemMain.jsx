"use server";

import Typography from "@mui/material/Typography";
import { Grid, Button, Box } from "@mui/material";
import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import BlogService from "../../../services/BlogService";
import ErrorElement from "../../../components/ErrorElement";
import style from "./BlogItem.module.scss";

const blogMain = new BlogService();

export const BlogItemMain = async ({ token }) => {
    let data;
    let error;
    try {
        const body = await blogMain.getMain();
        data = body.data;
    } catch (e) {
        console.log(e);
        error = e;
    }
    if (error) return <ErrorElement />;

    if (!data) return "";
    return (
        <Link href={BLOG_ROUTE(token) + "/" + data?.id}>
            <Grid container columns={10}>
                <Grid size={10}>
                    <Box
                        width="100%"
                        src={data?.img?.path || "../default.png"}
                        alt="BlogImageMain"
                        component={"img"}
                    />
                </Grid>
                <Grid
                    p={2}
                    size={10}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: "center",

                        // alignItems: "center",
                    }}
                >
                    <Typography
                        fontWeight={"900"}
                        sx={{ fontSize: { md: 42, xs: 24 } }}
                        variant="h3"
                        component="div"
                        mb={1}
                    >
                        {data?.title}
                    </Typography>
                    {data?.subtitle ? (
                        <Typography
                            className={style.subtitle}
                            fontWeight={"400"}
                            sx={{
                                fontSize: { md: 24, xs: 17 },
                                lineHeight: { md: "28px", xs: "22px" },
                            }}
                            variant="h3"
                            component="div"
                        >
                            {data?.subtitle}
                        </Typography>
                    ) : (
                        <Typography
                            component={"div"}
                            dangerouslySetInnerHTML={{ __html: data?.body }}
                            variant="body2"
                            color="text.secondary"
                            sx={{ overflow: "hidden", maxHeight: 200 }}
                        />
                    )}
                </Grid>
            </Grid>
        </Link>
    );
};
