"use client";

import { Box, CircularProgress } from "@mui/material";
import { BlogItemShort } from "./item/BlogItemShort";
import { useInView } from "react-intersection-observer";
import BlogService from "../../services/BlogService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ErrorElement from "../ErrorElement";

const blog = new BlogService();

export const BlogsShort = ({ initialData, token }) => {
    const { ref, inView } = useInView({ threshold: 0.1 });

    const { data, fetchNextPage, error, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["blogsShort"],
            queryFn: ({ pageParam = 1 }) => blog.getShort(pageParam),
            initialData: {
                pages: [{ data: { data: initialData || [] } }],
                pageParams: [1],
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                const items = lastPage?.data?.data;
                return items?.length ? allPages.length + 1 : undefined;
            },
        });

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage]);

    console.log(error);

    console.log(data);
    const blogs = data?.pages?.flatMap((page) => page?.data?.data) ?? [];
    console.log(blogs);

    if (!data || data.length === 0) return "";

    return (
        <Box display={"flex"} flexDirection={"column"} gap={4} m={1.5}>
            {blogs.map((item) => (
                <BlogItemShort token={token} key={"BS"+item?.id} item={item} />
            ))}
            {error && <ErrorElement />}
            <Box ref={ref} display="flex" justifyContent="center" py={2}>
                {isFetchingNextPage && <CircularProgress />}
            </Box>
        </Box>
    );
};
