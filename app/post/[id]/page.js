'use client';
import '../../ui/global.css';
import axios from 'axios';
import { useState, useEffect, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import parse from 'html-react-parser';

function SinglePost({ params }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const postId = params.id;
  const url = `https://api.slingacademy.com/v1/sample-data/blog-posts/${postId}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setPost(response.data.blog);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      <ClipLoader
        color={'gray'}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  if (post) {
    return (
      <div className="mx-auto max-w-5xl">
        <header className="mb-14">
          <h1 className="mb-3 mt-0 text-center text-3xl font-bold leading-normal text-slate-900">
            {post.title}
          </h1>
          <div className="text-center">Published: {post.created_at}</div>
          <div className="text-center">Last Updated: {post.updated_at}</div>
          <div className="-mx-7 mt-10 md:mx-0">
            <div class="my-3 text-center">
              <a
                href="#"
                class="m-0.5 inline-block rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700"
              >
                #{post.category}
              </a>
            </div>
            <img
              className="mx-auto w-full max-w-2xl "
              src={post.photo_url}
              width="960"
              height="500"
              alt="This is post picture"
            />
          </div>
        </header>
        <div className=" max-w-none text-slate-800">
          {parse(post.content_html)}
        </div>
      </div>
    );
  } else {
    return <h1>404 Post Not Found</h1>;
  }
}

export default SinglePost;

{
  /* 
    <header class="mb-14">
        {% if tags %}
        <div class="mt-3 text-center">
            {% for tag in tags %}
            <a href="{{ '/tags/' | url }}{{ tag }}" class="inline-block bg-slate-200 rounded-full px-3 py-1 text-sm font-medium text-slate-700 m-0.5">#{{ tag }}</a>
            {% endfor %}
        </div>
        {% endif %}
    </header>
    {% if site.disqusShortname %}
    <div class="mt-10">
        {% if process.environment === "production" %}
        {% include "partials/disqus.njk" %}
        {% else %}
        <div class="italic text-slate-700">Disqus comments only available for production</div>
        {% endif %}
    </div>
    {% endif %}
</article> */
}
