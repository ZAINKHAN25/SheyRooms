import { Tabs } from "antd"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Loader } from "../components/Loader"
import Swal from 'sweetalert2'
import { Tag, Divider } from 'antd';

import { API_URL } from "../Config.js";

const { TabPane } = Tabs
const user = JSON.parse(localStorage.getItem('currentUser'))

export const ProfileScreen = () => {
  useEffect(() => {
    if (!user) {
      window.location.href = '/login'
    }
  }, [])
  return (
    <div className="ms-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab='Profile' key='1'>
          <h3>My Profile</h3><br />
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>isAdmin:</b> {user.isAdmin ? 'YES' : 'NO'}</p>
        </TabPane>
        <TabPane tab='Bookings' key='2'><MyBooking /></TabPane>
      </Tabs>
    </div>
  )
}

const MyBooking = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = (await axios.post(`${API_URL}/api/bookings/getbookingsbyuserid`, { userId: user._id })).data
        setBookings(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
      }
    }
    fetchData()
  }, [])

  const cancelBooking = async (bookingId, roomId) => {
    try {
      setLoading(true)
      const result = (await axios.post(`${API_URL}/api/bookings/cancelbooking`, { bookingId, roomId })).data
      console.log(result)
      setLoading(false)
      Swal.fire('Congrats', 'Your booking has been cancelled!', 'success').then(result => {
        window.location.reload()
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
      Swal.fire('Oops', 'Something went wrong', 'error')
    }
  }
  return (
    <div className="row">
      <h3>Bookings</h3>
      <div className="col-md-6">
        {loading && <Loader />}
        {bookings && bookings.map(booking => {
          return (
            <div className="booking">
              <h4>{booking.room}</h4>
              <p><b>Booking Id:</b> {booking._id}</p>
              <p><b>Check In:</b> {booking.checkIn}</p>
              <p><b>Check Out:</b> {booking.checkOut}</p>
              <p><b>Amount:</b> {booking.amount}</p>
              <p><b>Status:</b> {booking.status == 'booked' ? <Tag color="green">CONFIRMED</Tag> : <Tag color="red">CANCELLED</Tag>}</p>
              <button
                className="btn btn-primary"
                style={{ display: booking.status === 'cancelled' ? 'none' : '' }}
                onClick={() => { cancelBooking(booking._id, booking.roomId) }}
              >Cancel Booking</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
