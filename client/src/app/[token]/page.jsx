import { Box } from "@mui/material";
import { BlogItemMain } from "../../components/blog/item/BlogItemMain";
import { BlogsImportant } from "../../components/blog/BlogsImportant";
import BlogsFirst from "../../components/blog/BlogsFirst";
import { BlogsShortSmall } from "../../components/blog/BlogsShortSmall";

export default async function Page({ params }) {
    const { token } = await params;
    return (
        <Box>
            <Box display={"flex"} flexDirection={"column"}>
                <BlogItemMain token={token} />
                <BlogsFirst token={token} />
                <BlogsShortSmall token={token} />
                <BlogsImportant token={token} />
            </Box>
        </Box>
    );
}
