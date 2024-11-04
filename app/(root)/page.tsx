import { Collection } from '@/components/collection'
import Header from '@/components/header'
import { navLinks } from '@/constants'
import { getAllImages } from '@/lib/actions/image'
import Link from 'next/link'

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1
  const searchQuery = (searchParams?.query as string) || ''

  const images = await getAllImages({ page, searchQuery })

  return (
    <>
      <Header className='absolute' title='Home' />
      <div className='banner-container' id='banner-container'>
        <div className='banner-text'>
          <h1 className='banner-heading'>Transform Your Ideas Into Images</h1>
          <p className='banner-subtext'>
            Create stunning, unique images instantly with our AI-powered
            platform. Your imagination is the only limit.
          </p>
          <ul className='flex w-full gap-20 justify-between'>
            {navLinks.navMain.slice(1, 5).map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className='flex-center flex-col gap-2'
              >
                <li className='flex-center w-fit rounded-full bg-white p-4'>
                  <link.icon className='text-black' width={24} height={24} />
                </li>
                <p className='p-14-medium text-center text-white'>
                  {link.title}
                </p>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <section className='sm:mt-6 m-5'>
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home
