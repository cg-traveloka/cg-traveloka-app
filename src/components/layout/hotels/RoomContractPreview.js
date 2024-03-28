import PersonSmallIcon from "../../icon/PersonSmallIcon";
import TravelokaIcon from "../../icon/TravelokaIcon";
import YellowStar from "../../icon/YellowStar";
import BillIcon from "../../icon/BillIcon";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectHotel } from "../../../redux/features/hotelSlice";
import axios from "../../../config/privateAxios";
import { toast } from "react-toastify";

function RoomContractPreview(params) {
    const { id } = useParams();
    const [room, setRooms] = useState({});
    const hotel = useSelector(selectHotel);
    const [stars, setStars] = useState([]);
    const [image, setImage] = useState("");
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [date, setDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        axios.get(`/api/room/${id}`)
            .then(result => {
                console.log(result.data);
                setRooms(result.data);
                let arr = [];
                for (let index = 0; index < result.data.hotel.hotelStar; index++) {
                    arr.push(index);
                }
                setStars(arr);
            })
            .catch(error => console.log(error))
    }, []);
    useEffect(() => {
        axios.get(`/api/room/images`, { params: { roomId: id } })
            .then(result => setImage(result.data[0].url))
    }, []);
    useEffect(() => {
        let date = hotel.startDate;
        let dateList = date.split("-");
        console.log(date);
        let temporature = new Date(dateList[0], dateList[1]-1, dateList[2]);
        console.log(temporature);
        setDate(temporature);
        let temporature2 = new Date();
        temporature2.setDate(temporature.getDate() + hotel.nights);
        setEndDate(temporature2);
    }, []);
    function handleSubmit(params) {
        axios.post("/api/contracts", {
            roomId: room.id,
            startDate: date.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
            roomQuantity: hotel.roomQuantity
        }).then(result => { toast.success("Hợp đồng thuê phòng tạo thành công") })
            .catch(error => { console.log(error); toast.error("Có lỗi xảy ra") });
    }
    return (
        <div className="roomContractPreview">
            <div className="roomContractPreview-container">
                <div className="roomContractPreview-container-header"></div>
                <div className="roomContractPreview-container-group1">
                    <div className="roomContractPreview-container-group1-left">
                        <span className="roomContractPreview-container-group1-left-name">{room.hotel ? room.hotel.hotelName : null}</span><span><TravelokaIcon /></span><span className="roomContractPreview-container-group1-left-point">{room.hotel ? room.hotel.averagePoint : null}</span><span className="roomContractPreview-container-group1-left-booked">({room.hotel ? room.hotel.hotelBookedNumbers : null})</span>
                    </div>
                    <div className="roomContractPreview-container-group1-right">
                        {stars.map((value, index) => <span key={index}><YellowStar /></span>)}
                    </div>
                </div>
                <div className="roomContractPreview-container-group2">
                    <img src={image} alt="room" />
                </div>
                <div className="roomContractPreview-container-group3">
                    <div className="roomContractPreview-container-group3-container">
                        <div className="roomContractPreview-container-group3-container-left">
                            <div className="roomContractPreview-container-group3-container-left-title">Nhận phòng</div>
                            <div className="roomContractPreview-container-group3-container-left-content">{date.toLocaleDateString("vi-VN", options)}</div>
                        </div>
                        <div className="roomContractPreview-container-group3-container-center">
                            <div className="roomContractPreview-container-group3-container-center-nights">
                                {`${hotel.nights} đêm`}
                            </div>
                            <div className="roomContractPreview-container-group3-container-center-line">

                            </div>
                        </div>
                        <div className="roomContractPreview-container-group3-container-right">
                            <div className="roomContractPreview-container-group3-container-right-title">Trả phòng</div>
                            <div className="roomContractPreview-container-group3-container-right-content">{endDate.toLocaleDateString("vi-VN", options)}</div>
                        </div>
                    </div>
                </div>
                <div className="roomContractPreview-container-group4">
                    <div className="roomContractPreview-container-group4-roomName">
                        ({hotel.roomQuantity}x) {room.roomType ? room.roomType.name : null}
                    </div>
                    <div className="roomContractPreview-container-group4-person">
                        <span><PersonSmallIcon /></span> <span>{hotel.personQuantity} khách</span>
                    </div>
                </div>
                <div className="roomContractPreview-container-group5">
                    <div className="roomContractPreview-container-group5-left">
                        <div className="roomContractPreview-container-group5-left-row1">
                            <span><BillIcon /></span> <span className="roomContractPreview-container-group5-left-row1-text">Tổng giá phòng</span>
                        </div>
                        <div className="roomContractPreview-container-group5-left-row2">
                            <span className="roomContractPreview-container-group5-left-row2-text">{hotel.roomQuantity} phòng, {hotel.nights} đêm</span>
                        </div>
                    </div>
                    <div className="roomContractPreview-container-group5-right">
                        <div className="roomContractPreview-container-group5-right-row1">
                            <span className="roomContractPreview-container-group5-right-row1-originPrice">{`${(room.unitPriceOrigin * hotel.roomQuantity * hotel.nights).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</span>
                        </div>
                        <div className="roomContractPreview-container-group5-right-row2">
                            <span className="roomContractPreview-container-group5-right-row2-sellPrice">{`${(room.unitPriceSell * hotel.roomQuantity * hotel.nights).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</span>
                        </div>
                    </div>
                </div>
                <div className="roomContractPreview-container-group6">
                    <button onClick={handleSubmit} className="roomContractPreview-container-group6-button">Tiếp tục thanh toán</button>
                </div>
            </div>
        </div>
    )
}
export default RoomContractPreview;