import { Box, Grid } from "@mui/material";
import ErrorElement from "../ErrorElement";
import BlogService from "../../services/BlogService";
import BlogItemFIrst from "./item/BlogItemFIrst";

const blog = new BlogService();

export default async function BlogsFirst({ token }) {
    let data: any[];
    let error: unknown;
    try {
        const body = await blog.getFirst();
        data = body?.data;
    } catch (e) {
        console.log(e);
        error = e;
    }

    if (error) return <ErrorElement />;

    if (!data || data.length === 0) return "";

    return (
        <Box mr={1.3} ml={1.3}>
            <Grid container columns={2} spacing={1.3}>
                {data.map((Blog, i) => (
                    <Grid key={"BF" + Blog?.id} size={{ xs: 2, md: 2 }}>
                        <BlogItemFIrst i={i} token={token} Blog={Blog} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
