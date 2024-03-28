import { useDispatch, useSelector } from "react-redux";
import { changePageNumber, changeSort, selectHotel } from "../../../redux/features/hotelSlice";
import { changeHotels, selectHotels } from "../../../redux/features/hotelsSlice";
import axios from "../../../config/privateAxios";
function HotelSortBar(params) {
    const hotel = useSelector(selectHotel);
    const hotels = useSelector(selectHotels).hotels;
    const dispatch = useDispatch();
    function handleChangeSort(event) {
        // console.log(event.target.value);
        dispatch(changeSort(event.target.value));
        dispatch(changePageNumber(0))
        axios.post("/api/search/hotels", {
            ...hotel,
            pageNumber: 0,
            sort: event.target.value
        })
            .then((result) => dispatch(changeHotels(result.data.hotels)))
            .catch(error => console.log(error))
    }
    return (
        <div className="hotelSortBar">
            <input onChange={handleChangeSort} value={"booked"} type="radio" name="sort" id="booked" hidden />
            <label htmlFor="booked" className="group">
                <p className="text-1">Sắp xếp theo</p>
                <p className="text-2">Độ phổ biến</p>
            </label>
            <input onChange={handleChangeSort} value={"point"} type="radio" name="sort" id="point" hidden />
            <label htmlFor="point" className="group">
                <p className="text-1">Sắp xếp theo</p>
                <p className="text-2">Điểm đánh giá</p>
            </label>
            <input onChange={handleChangeSort} value={"minPrice"} type="radio" name="sort" id="minPrice" hidden />
            <label htmlFor="minPrice" className="group">
                <p className="text-1">Sắp xếp theo</p>
                <p className="text-2">Giá thấp nhất</p>
            </label>
            <input onChange={handleChangeSort} value={"maxPrice"} type="radio" name="sort" id="maxPrice" hidden />
            <label htmlFor="maxPrice" className="group">
                <p className="text-1">Sắp xếp theo</p>
                <p className="text-2">Giá cao nhất</p>
            </label>
        </div>
    )
}
export default HotelSortBar;