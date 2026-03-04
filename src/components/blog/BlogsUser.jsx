"use server";

import BlogService from "../../services/BlogService";
import { BlogsUserClient } from "../../components/blog/BlogUserClient";
import ErrorElement from "../../components/ErrorElement";
import { Empty } from "../../components/Empty";

const blog = new BlogService();

export default async function BlogsUser() {
    let data;
    let error;
    try {
        const body = await blog.getAll();
        data = body.data;
    } catch (e) {
        console.log(e);
        error = e;
    }
    if (error) return <ErrorElement />;

    if (!data) return <Empty />;
    return <BlogsUserClient data={data} />;
}
