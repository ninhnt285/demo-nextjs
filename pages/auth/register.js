import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { sendRequest } from '@/lib/fetcher'
import { getCurrentUser } from '@/lib/auth'

import Layout from '@/components/Layout';

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(false);
  const [errors, setErrors] = useState(false);

  if (getCurrentUser()) {
    router.push("/")
  }

  async function submitForm() {
    setErrors(false)
    setLoading(true)

    try {
      const resData = await sendRequest("/register", 'POST', input)
      if (!resData.success) {
        setErrors(resData.data);
      } else {
        Cookies.set("currentUser", JSON.stringify(resData.data),  {sameSite: 'None', secure: true})
        router.push("/")
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <Layout>
      <div className='card'>
        <div className='card-header'>Register</div>

        <div className='card-body'>
          <div className='row mb-3'>
            <label
              htmlFor='name'
              className='col-md-4 col-form-label text-md-end'
            >
              Name
            </label>

            <div className='col-md-6'>
              <input
                id='name'
                type='text'
                className={"form-control" + (errors && errors.name ? " is-invalid" : "")}
                name='name'
                required
                autoComplete='name'
                autoFocus
                onChange={(e) => { setInput({...input, name: e.target.value}) }}
              />

              {errors && errors.name ? (
              <span className='invalid-feedback' role='alert'>
                <strong>{errors.name}</strong>
              </span>) : null}
              
            </div>
          </div>

          <div className='row mb-3'>
            <label
              htmlFor='email'
              className='col-md-4 col-form-label text-md-end'
            >
              Email Address
            </label>

            <div className='col-md-6'>
              <input
                id='email'
                type='email'
                className={"form-control" + (errors && errors.email ? " is-invalid" : "")}
                name='email'
                required
                autoComplete='email'
                onChange={(e) => { setInput({...input, email: e.target.value}) }}
              />

              {errors && errors.email ? (
              <span className='invalid-feedback' role='alert'>
                <strong>{errors.email}</strong>
              </span>) : null}
            </div>
          </div>

          <div className='row mb-3'>
            <label
              htmlFor='password'
              className='col-md-4 col-form-label text-md-end'
            >
              Password
            </label>

            <div className='col-md-6'>
              <input
                id='password'
                type='password'
                className={"form-control" + (errors && errors.password ? " is-invalid" : "")}
                name='password'
                required
                autoComplete='new-password'
                onChange={(e) => { setInput({...input, password: e.target.value}) }}
              />

              {errors && errors.password ? (
              <span className='invalid-feedback' role='alert'>
                <strong>{errors.password}</strong>
              </span>) : null}
            </div>
          </div>

          <div className='row mb-3'>
            <label
              htmlFor='password-confirm'
              className='col-md-4 col-form-label text-md-end'
            >
              Confirm Password
            </label>

            <div className='col-md-6'>
              <input
                id='password-confirm'
                type='password'
                className={"form-control" + (errors && errors.c_password ? " is-invalid" : "")}
                name='password_confirmation'
                required
                autoComplete='new-password'
                onChange={(e) => { setInput({...input, c_password: e.target.value}) }}
              />

              {errors && errors.c_password ? (
              <span className='invalid-feedback' role='alert'>
                <strong>{errors.c_password}</strong>
              </span>) : null}
            </div>
          </div>

          <div className='row mb-0'>
            <div className='col-md-6 offset-md-4'>
              <button type='submit' className='btn btn-primary' onClick={submitForm}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
