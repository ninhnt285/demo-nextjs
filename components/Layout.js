import Head from 'next/head';

import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div id='app'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />

      <main className='py-4'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-8'>{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
