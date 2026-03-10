"use client";

import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import DatePharse from "../../../components/DatePharse";

const BlogFullItem = ({ Blog }) => {
    const date = DatePharse({ date: Blog?.date });

    return (
        <Box>
            <Box
                component={"img"}
                sx={{ width: "100%" }}
                alt="BlogImage"
                src={Blog?.img?.path || "../default.png"}
            />
            <Grid
                pl={2}
                pr={2}
                spacing={1.2}
                sx={{ mb: "20px" }}
                container
                columns={10}
            >
                <Grid size={{ xs: 10, sm: 5 }}>
                    {/* <CardMedia
                           sx={{ height: "auto", width: "100%" }}
                           image={Blog?.img?.path || "../default.png"}
                           title="BlogImage"
                        /> */}
                </Grid>
                <Grid
                    size={{ xs: 10, sm: 5 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        fontWeight={"900"}
                        sx={{ fontSize: 24 }}
                        lineHeight={"26px"}
                    >
                        {Blog?.title}
                    </Typography>
                </Grid>
                <Grid
                    size={{ xs: 10, sm: 5 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {Blog?.subtitle && (
                        <Typography
                            fontWeight={"400"}
                            sx={{ fontSize: 20 }}
                            lineHeight={"26px"}
                        >
                            {Blog?.subtitle}
                        </Typography>
                    )}
                </Grid>
                <Grid size={{ xs: 10, sm: 5 }}>
                    <Box display={"flex"} gap={0.5}>
                        <Typography
                            fontWeight={"400"}
                            color="inherit"
                            fontSize={15}
                            component="div"
                        >
                            Опубликовано:
                        </Typography>
                        {date && (
                            <>
                                <Typography
                                    fontWeight={"400"}
                                    color="inherit"
                                    fontSize={15}
                                    component="div"
                                >
                                    {date}
                                </Typography>
                                <Typography
                                    fontWeight={"400"}
                                    color="inherit"
                                    fontSize={15}
                                    component="div"
                                >
                                    |
                                </Typography>
                            </>
                        )}
                        <Typography
                            fontWeight={"400"}
                            color="inherit"
                            fontSize={15}
                            component="div"
                        >
                            {Blog?.time?.split(":")?.splice(0, 2)?.join(":")}
                        </Typography>
                    </Box>
                </Grid>
                <Box dangerouslySetInnerHTML={{ __html: Blog?.body }} />
            </Grid>
        </Box>
    );
};

export default BlogFullItem;
