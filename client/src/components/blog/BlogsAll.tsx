import { Box } from "@mui/material";
import BlogService from "../../services/BlogService";
import { BlogsUser } from "./BlogsUser";
import BlogItemAll from "./item/BlogItemAll";

const blog = new BlogService();

export default async function BlogsAll({ token }) {
    let data: any[];
    try {
        const body = await blog.getAll();
        data = body?.data?.data;
    } catch (e) {
        console.log(e);
    }
    return (
        <Box mr={1.2} ml={1.2}>
            <BlogsUser
                token={token}
                ItemComponent={BlogItemAll}
                initialData={data}
            />
        </Box>
    );
}
