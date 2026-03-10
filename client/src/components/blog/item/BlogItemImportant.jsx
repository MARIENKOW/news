"use client";

import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";

export const BlogItemImportant = ({ item }) => {
    const { token } = useParams();
    return (
        <Link href={BLOG_ROUTE(token) + "/" + item?.id}>
            <Grid
                width={"165px"}
                spacing={2}
                sx={{ mb: "20px" }}
                container
                columns={2}
            >
                <Grid size={{ xs: 2, sm: 2 }}>
                    <CardMedia
                        sx={{
                            width: "100%",
                            aspectRatio: 32 / 18,
                        }}
                        image={item?.img?.path || "../default.png"}
                        title="BlogImage"
                    />
                </Grid>
                <Grid
                    size={{ xs: 2, sm: 2 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        fontWeight={"600"}
                        fontSize={14}
                        lineHeight={"16px"}
                        color="inherit"
                    >
                        {item?.title}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    );
};
