import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { sendRequest } from '@/lib/fetcher'
import { getCurrentUser } from '@/lib/auth'

import Layout from '@/components/Layout';

export default function AddBlog() {
  const router = useRouter()
  const { id } = router.query;

  const [blog, setBlog] = useState(false)
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchData() {
      if (id) {
        setLoading(true)
        try {
          const resData = await sendRequest(`/blogs/${id}`)
          setBlog(resData.data);
        } catch (err) {
          setBlog(false);
        } finally {
          setLoading(false)
        }
      }
    }

    if (!getCurrentUser()) {
      router.push("/auth/login")
    }

    fetchData();
  }, [id]);

  async function onSubmit() {
    try {
      let url = "/blogs"
      let method = "POST"
      let body = {title: blog.title ?? "", content: blog.content ?? ""}

      if (id) {
        url = `/blogs/${id}`
        method = 'PUT'
      }
      const resData = await sendRequest(url, method, body)
      if (!resData.success)  {
        setErrors(resData.data)
      } else {
        router.push(`/blogs/${resData.data.id}`)
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  if (id && loading) {
    return <Layout></Layout>;
  }

  return (
    <Layout>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>{blog ? 'Edit Blog' : 'Add Blog'}</h2>
      </div>

      <div className='card'>
        <div className='card-header'>Blog Details</div>

        <div className='card-body'>
            <div className='row mb-3'>
              <label
                htmlFor='title'
                className='col-md-4 col-form-label text-md-end'
              >
                Title
              </label>

              <div className='col-md-6'>
                <input
                  id='title'
                  type='text'
                  className={"form-control" + (errors && errors.title ? " is-invalid" : "")}
                  name='title'
                  defaultValue={blog.title}
                  onChange={(e) => setBlog({...blog, title: e.target.value})}
                  required
                  autoFocus
                />
                {errors && errors.title ? (
                <span className='invalid-feedback' role='alert'>
                  <strong>{errors.title}</strong>
                </span>) : null}
              </div>
            </div>

            <div className='row mb-3'>
              <label
                htmlFor='content'
                className='col-md-4 col-form-label text-md-end'
              >
                Content
              </label>

              <div className='col-md-6'>
                <textarea
                  id='content'
                  name='content'
                  className={"form-control" + (errors && errors.content ? " is-invalid" : "")}
                  required
                  defaultValue={blog.content}
                  onChange={(e) => setBlog({...blog, content: e.target.value})}
                ></textarea>
                {errors && errors.content ? (
                <span className='invalid-feedback' role='alert'>
                  <strong>{errors.content}</strong>
                </span>) : null}
              </div>
            </div>

            <div className='row mb-0'>
              <div className='col-md-8 offset-md-4'>
                <button type='submit' className='btn btn-primary' onClick={onSubmit}>
                  Submit
                </button>
              </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}
