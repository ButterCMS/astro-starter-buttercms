
import React, { useEffect, useState } from "react"
import { butterCMS } from "../utils/buttercmssdk";
import placeholder from '../images/placeholder.png'
import Spinner from './Spinner'
import NotFoundSection from './NotFoundSection'

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [blogPosts, setBlogPosts] = useState([]);
    const [categoriess, setCategories] = useState([]);
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!import.meta.env.PUBLIC_APITOKEN) {
            window.location.replace("/404");
        }
    }, [import.meta.env.PUBLIC_APITOKEN])


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlQuery = urlParams.get("q");
        setIsLoading(true)

        const loadData = async () => {
            try {
                const posts = await butterCMS.post.search(urlQuery)
                const categories = await butterCMS.category.list();
                setCategories(categories.data.data)
                setBlogPosts(posts.data.data)
                setQuery(urlQuery)
                // setIsLoading(false)
            } catch (error) {
                setError(true)
            }
            setIsLoading(false);
        }

        loadData()

    }, [query]);

    if (loading) return (<Spinner />)
    if (error) return (<NotFoundSection />)


    return (
        <>

            <section id="blog-header" className="single-post-nav">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h2>Search Results</h2>
                                <ul className="breadcrumb-nav">
                                    <li><a href="/">Home</a></li>
                                    <li>
                                        <a href="/blog">Blog</a>
                                    </li>
                                    <li>Search: {query}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="blog-posts">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8 blog-roll-cards">
                            <div className="row">

                                <>
                                    {blogPosts.length === 0 && !loading ? <div>No blog posts found matching this query.</div> :
                                        <>{blogPosts.map((post) => {
                                            return (
                                                <div className="col-12 col-lg-6">
                                                    <div className="blog-roll-card">
                                                        <div className="blog-roll-card-meta">
                                                            <h2 className="blog-roll-card-header">
                                                                <a href="#">{post.title}</a>
                                                            </h2>
                                                            <ul className="blog-roll-card-meta-info">
                                                                <li>
                                                                    <a href="#">
                                                                        <img
                                                                            src={
                                                                                post.author
                                                                                    .profile_image ||
                                                                                placeholder
                                                                            }
                                                                            alt="#"
                                                                        />
                                                                        {post.author.first_name}{" "}
                                                                        {post.author.last_name}
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:void(0)">
                                                                        <i className="lni lni-calendar" />{" "}
                                                                        {new Date(
                                                                            post.published
                                                                        ).toLocaleString()}
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    {post.tags.map((tag) => {
                                                                        return (
                                                                            <a
                                                                                href={`/blog/tag/${tag.slug}`}
                                                                            >
                                                                                <i className="lni lni-tag" />{" "}
                                                                                {tag.name}{" "}
                                                                            </a>
                                                                        );
                                                                    })}
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        {post.featured_image && (
                                                            <div className="single-post-thumbnail">
                                                                <img
                                                                    src={post.featured_image}
                                                                    alt={
                                                                        post.featured_image_alt
                                                                    }
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="blog-roll-card-body">
                                                            <p>{post.summary}</p>
                                                        </div>
                                                        <div className="blog-roll-card-footer text-center">
                                                            <a
                                                                href={`/blog/${post.slug}`}
                                                                className="main-btn btn-hover"
                                                            >
                                                                Read More
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        </>

                                    }
                                </>

                            </div>
                        </div>

                        <aside className="col-12 col-lg-4">
                            <div className="sidebar blog-grid-page">
                                <div className="widget search-widget">
                                    <h5 className="widget-title">Search This Site</h5>
                                    <form action={`/blog/search`} method="get">
                                        <input type="text" name="q" placeholder="Search Here..." />
                                        <button type="submit" ><i className="lni lni-search-alt"></i></button>
                                    </form>
                                </div>
                            </div>

                            <div className="widget categories-widget">
                                <h5 className="widget-title">Categories</h5>
                                <ul className="categories-list">
                                    {categoriess.map((category, index) => {
                                        return <li key={index}>
                                            <a href={`/blog/category/${category.slug}`}>
                                                {category.name}
                                            </a>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section >

        </>
    )
}

export default SearchPage;