import { Navbar } from '../components/Navbar'
import HomePic from '../assets/Home Pic.avif'

export const LandingScreen = () => {
    return (
        <div className='landing-page-father'>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center landing flex-wrap-wrap">
                <div className='Txt-Div-LPage p-3 flex-1'>
                    <h1>SheyRooms: Your Gateway to Exceptional Stays.</h1>
                    <h3>Discover comfortable and affordable places to stay, personalized just for you.</h3>
                    <a href='/home'>
                        <button className="btn btn-primary">Get Started</button>
                    </a>
                </div>
                <div className='Img-Div-LPage flex-1'>
                    <img src={HomePic} alt="" />
                </div>
            </div>
        </div>
    )
}
