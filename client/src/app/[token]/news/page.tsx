import BlogService from "../../../services/BlogService";
import { BlogsUser } from "../../../components/blog/BlogsUser";
import ErrorElement from "../../../components/ErrorElement";
import { Box } from "@mui/material";
const blog = new BlogService();

export default async function Page({ params }) {
    const { token } = await params;
    let data: any[];
    try {
        const body = await blog.getAll();
        data = body?.data?.data;
    } catch (e) {
        console.log(e);
    }

    return (
        <Box mr={2} ml={2}>
            <BlogsUser token={token} initialData={data} />
        </Box>
    );
}
