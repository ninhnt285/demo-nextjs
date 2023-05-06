import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { sendRequest } from '@/lib/fetcher'
import { getCurrentUser } from '@/lib/auth'

import Layout from '@/components/Layout';

export default function Login() {
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
      const resData = await sendRequest("/login", 'POST', input)
      if (!resData.success) {
        setErrors(resData.data);
      } else {
        Cookies.set("currentUser", JSON.stringify(resData.data),  {sameSite: 'None'})
        router.push("/")
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <Layout>
      <div className='card'>
        <div className='card-header'>Login</div>

        <div className='card-body'>
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
                autoFocus
                onChange={(e) => { setInput({...input, email: e.target.value}) }}
              />

              {errors && errors.email ? (
              <span className='invalid-feedback' role='alert'>
                <strong>{errors.email.join("<br />")}</strong>
              </span>) : ""}
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
                onChange={(e) => { setInput({...input, password: e.target.value}) }}
              />
              {errors && errors.password ?
              (<span className='invalid-feedback' role='alert'>
                <strong>{errors.password.join(", ")}</strong>
              </span>) : null}
            </div>
          </div>

          {/* <div className="row mb-3">
              <div className="col-md-6 offset-md-4">
                  <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                      <label className="form-check-label" for="remember">
                          {{ __('Remember Me') }}
                      </label>
                  </div>
              </div>
          </div> */}

          <div className='row mb-0'>
            <div className='col-md-8 offset-md-4'>
              <button type='submit' className='btn btn-primary' onClick={submitForm}>
                Login
              </button>

              {/* @if (Route::has('password.request'))
                  <a className="btn btn-link" href="{{ route('password.request') }}">
                      {{ __('Forgot Your Password?') }}
                  </a>
              @endif */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
