import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { Error } from "../components/Error"
import StripeCheckout from 'react-stripe-checkout'
import moment from "moment"
import Swal from 'sweetalert2'
import { API_URL, STRIPE_CLIENT_URL } from "../Config.js";

export const BookingScreen = () => {
    const { roomid, checkin, checkout } = useParams()
    const [room, setRoom] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [amount, setAmount] = useState()

    const checkIn = moment(checkin, 'DD-MM-YYYY')
    const checkOut = moment(checkout, 'DD-MM-YYYY')
    const days = moment.duration(checkOut.diff(checkIn)).asDays() + 1
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const clientKey = STRIPE_CLIENT_URL;

    useEffect(() => {
        const fetchData = async () => {
            if (!localStorage.getItem('currentUser')) {
                window.location = '/login'
            }
            try {
                setLoading(true)
                const data = (await axios.post(`${API_URL}/api/rooms/getroombyid`, { roomid })).data
                setRoom(data)
                setAmount(data.rentPerNight * days)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const onToken = async token => {
        console.log(token)
        const bookingDetails = {
            room, checkIn, checkOut, amount, days, userId: user._id, token
        }
        try {
            setLoading(true)
            const result = await axios.post(`${API_URL}/api/bookings/bookroom`, bookingDetails)
            setLoading(false)
            Swal.fire('Congratulations', 'Room has been booked Successfully', 'success').then(result => {
                window.location.href = '/profile'
            })
        }
        catch (error) {
            setLoading(false)
            console.log(error)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }
    }
    return (
        <div className="cart mt-5">
            {loading ? <Loader /> : room ? (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h3>{room.name}</h3>
                        <img src={room.imageUrls[0]} alt={room.name} className="bigimg" />
                    </div>
                    <div className="col-md-6">
                        <div>
                            <h4>Booking Details</h4><hr />
                            <p>Name: {user.name}</p>
                            <p>From Date: {checkin}</p>
                            <p>To Date: {checkout}</p>
                            <p>Max Count: {room.maxCount}</p>
                        </div>
                        <div>
                            <h4>Amount</h4><hr />
                            <p>Total Days: {days}</p>
                            <p>Rent Per Day: {room.rentPerNight}</p>
                            <p>Total Amount: {room.rentPerNight * days}</p>
                        </div>
                        <StripeCheckout
                            token={onToken}
                            stripeKey={clientKey}
                            currency="USD"
                            amount={amount * 100}
                        >
                            <button className="btn btn-primary">Pay Now</button>
                        </StripeCheckout>
                    </div>
                </div>
            ) : <Error />}
        </div>
    )
}
