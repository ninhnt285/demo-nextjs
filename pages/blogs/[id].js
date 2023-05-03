import { sendRequest } from '@/lib/fetcher'
import { useRouter } from 'next/router'

import Link from 'next/link'
import Layout from '../../components/Layout'

export default function BlogPage({ blog }) {
  const router = useRouter()

  async function deleteBlog() {
    try {
      const resData = await sendRequest(`/blogs/${blog.id}`, 'DELETE')
      if (resData.success) {
        router.push("/")
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>{blog.title}</h2>

        <div className='button-group'>
          <Link
            className='btn btn-primary me-1'
            href={`/blogs/add?id=${blog.id}`}
          >
            <i className='fa-solid fa-pen-to-square'></i>
          </Link>

          <button className='btn btn-danger' onClick={deleteBlog}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
        </div>
      </div>

      <div className='row mt-4'>
        <p>{blog.content}</p>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const resData = await sendRequest('/blogs')

  const blogs = resData.data;
  const paths = blogs.map((blog) => {
    return {
      params: { id: blog.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resData = await sendRequest(`/blogs/${params.id}`)

  return {
    props: {
      blog: resData.data,
    },
  };
}
