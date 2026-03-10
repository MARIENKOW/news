"use client";

import { Box, Grid, CircularProgress } from "@mui/material";
import BlogItemUser from "./item/BlogItemUser";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import BlogService from "../../services/BlogService";
import ErrorElement from "../ErrorElement";

const blog = new BlogService();

export const BlogsUser = ({
    initialData,
    token,
    ItemComponent = BlogItemUser,
}) => {
    const { ref, inView } = useInView({ threshold: 0.1 });

    const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["blogs"],
            queryFn: ({ pageParam = 1 }) => blog.getAll(pageParam),
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

    const blogs = data?.pages.flatMap((page) => page?.data?.data) ?? [];

    if (!data || data.length === 0) return "";

    return (
        <Box display="flex" flexDirection="column" gap={7}>
            <Grid container columns={2} spacing={1.3}>
                {blogs.map((Blog) => (
                    <Grid key={ItemComponent === BlogItemUser?'bU'+Blog?.id:'bU2'+Blog?.id} size={{ xs: 2, md: 2 }}>
                        <ItemComponent token={token} Blog={Blog} />
                    </Grid>
                ))}
                {error && <ErrorElement />}

                <Box ref={ref} display="flex" justifyContent="center" py={2}>
                    {isFetchingNextPage && <CircularProgress />}
                </Box>
            </Grid>
        </Box>
    );
};
