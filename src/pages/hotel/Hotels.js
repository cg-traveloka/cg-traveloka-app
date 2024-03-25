import HotelCard from "../../components/layout/hotels/HotelCard";
import HotelFilterSideBar from "../../components/layout/hotels/HotelFilterSideBar";
import HotelSearchBar from "../../components/layout/hotels/HotelSearchBar";
import HotelSortBar from "../../components/layout/hotels/HotelSortBar";
import axios from "../../config/privateAxios";
import { useEffect, useState } from "react";
import { changeHotels, selectHotels } from "../../redux/features/hotelsSlice";
import { useDispatch, useSelector } from "react-redux";

function Hotels(params) {
    const hotelsStates = useSelector(selectHotels);
    const hotels = hotelsStates.hotels;
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("/api/hotels").then(
            result => dispatch(changeHotels(result.data.hotels))
        ).catch();
    }, [])
    return (
        <div className="hotels">
            <HotelSearchBar />
            <div className="hotels-container">
                <HotelFilterSideBar />
                <div className="hotels-body">
                    <HotelSortBar />
                    <div className="hotels-list">
                        {hotels.map((hotel) =>
                            <HotelCard key={hotel.id} hotel={hotel} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Hotels;