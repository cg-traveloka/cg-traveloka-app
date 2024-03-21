import LocationIcon from "../icon/LocationIcon";
import axios from "../../config/privateAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { changeCityId, selectHotel } from "../../redux/features/hotelSlice";


function HotelSearchBar(params) {
    const hotel = useSelector(selectHotel);
    const [cities, setCities] = useState([]);

    useEffect(
        () => {
            axios.get("/api/cities")
                .then(result => setCities(result.data))
                .catch(error => console.log(error))
        }
        , []);



    return (
        <div className="hotelSearchBar">
            <div className="grid grid-cols-12 gap-4 content">
                <div className="col-span-3 item">
                    <LocationIcon />

                    <select className="selectCity" name="city" id="city">
                        {
                            cities.map(
                                city =>
                                    <option selected={city.id===hotel.cityId} value={city.id}>{city.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="col-span-3 item">

                </div>
                <div className="col-span-2 item">

                </div>
                <div className="col-span-2 item">

                </div>
                <div className="col-span-2 button">

                </div>
            </div>
        </div>
    )
}
export default HotelSearchBar;