import BlogService from "../../../services/BlogService";
import { BlogsShort } from "../../../components/blog/BlogsShort";
import ErrorElement from "../../../components/ErrorElement";
import { Box } from "@mui/material";
const blog = new BlogService();

export default async function Page({ params }) {
    const { token } = await params;
    let data: any[];
    try {
        const body = await blog.getShort();
        data = body?.data?.data;
    } catch (e) {
        console.log(e);
    }

    return (
        <Box>
            <BlogsShort token={token} initialData={data} />
        </Box>
    );
}
