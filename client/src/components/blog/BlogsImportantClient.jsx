"use client";

import { Box } from "@mui/material";
import { BlogItemImportant } from "./item/BlogItemImportant";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback } from "react";
import BlogService from "../../services/BlogService";

const blog = new BlogService();

export const BlogsImportantClient = ({ initData, token }) => {
    const scrollRef = useRef(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["blogs-important"],
            queryFn: ({ pageParam = 1 }) => blog.getImportant(pageParam),
            initialData: {
                pages: [{ data: { data: initData || [] } }],
                pageParams: [1],
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) =>
                lastPage?.data?.data?.length ? allPages.length + 1 : undefined,
        });

    // подгружаем когда скролл дошёл до конца
    const handleScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 50;
        if (isEnd && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const blogs = data?.pages?.flatMap((page) => page?.data?.data) ?? [];

    return (
        <Box
            ref={scrollRef}
            onScroll={handleScroll}
            p={1}
            gap={2}
            display="flex"
            maxWidth="100%"
            overflow="scroll"
            sx={{ scrollbarWidth: "none" }} // скрыть скроллбар
        >
            {blogs.map((Blog) => (
                <BlogItemImportant
                    key={"BIC" + Blog?.id}
                    token={token}
                    item={Blog}
                />
            ))}

            {isFetchingNextPage && (
                <Box
                    display="flex"
                    alignItems="center"
                    px={2}
                    color="text.secondary"
                    minWidth={60}
                >
                    ...
                </Box>
            )}
        </Box>
    );
};
