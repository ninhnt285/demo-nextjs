import { useState, useEffect } from 'react'
import { useCurrentUser } from '@/lib/auth'
import { sendRequest } from '@/lib/fetcher'

import Link from 'next/link';
import Layout from '../components/Layout'

export default function Home() {
  const { user } = useCurrentUser()
  const [blogs, setBlogs] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const resData = await sendRequest('/blogs')
        setBlogs(resData.data)
      } catch (err) {
        setBlogs(false)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs();
  }, []);

  return (
    <Layout>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>All Blogs</h2>
        { user && 
        <Link className='btn btn-primary' href='/blogs/add'>
          <i className='fa-solid fa-plus'></i> Add
        </Link>}
      </div>

      <div className='row mt-3'>
        {blogs ? (
          blogs.map((blog) => {
            return (
              <div key={blog.id} className='col-lg-4 col-md-6 my-2'>
                <div className='card'>
                  <div className='card-header'>
                    <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </div>

                  <div className='card-body'>
                    <p>
                      {blog.content.length > 100
                        ? blog.content.substring(0, 100) + '...'
                        : blog.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No blogs found!</p>
        )}
      </div>
    </Layout>
  );
}
