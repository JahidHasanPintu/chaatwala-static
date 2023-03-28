import React from 'react'
import { Footer } from '../../layouts/frontend/Footer'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'
import { Header } from './Header'
import { LatestPosts } from './LatestPosts'
import { ChaatWalaMap } from './ChaatWalaMap'
import { MenuCategories } from './MenuCategories'
import { PopularGoods } from './PopularGoods'
import { Testimonials } from './Testimonials'
import { WorkWays } from './WorkWays'
import { BottomFix } from './BottomFix'

export const Home = () => {
  return (
    <div>
        <TopNav />
        <Navbar />
        <Header />
        <MenuCategories />
        <WorkWays />
        <PopularGoods />
        <Testimonials />
        <LatestPosts /> 
        <ChaatWalaMap />
        <Footer />
        <BottomFix />
    </div>
  )
}
