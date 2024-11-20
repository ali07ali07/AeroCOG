import Head from 'next/head';

const SEO = ({
  title = 'AeroCOG - Your Aerospace Consulting Platform',
  description = 'Consult aerospace experts with ease on AeroCOG.',
  keywords = 'Aerospace, Consulting, Experts, AeroCOG',
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
  </Head>
);

export default SEO;
