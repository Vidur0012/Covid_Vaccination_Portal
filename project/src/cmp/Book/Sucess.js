import React from "react";
import { Card } from "react-bootstrap";
import './Sucess.css';

function Sucess({ beneficiarydata, center }) {

    return (
        <Card style={{ width: '50rem' }}>
            <Card.Body>
                <Card.Title ><h1>Sucessfully Booked...</h1></Card.Title>
                <Card.Text>
                    <p><b>Your turn number : {beneficiarydata.turn_num}</b></p><br />
                    <p><b>Date : {center.date}</b></p>
                    <p><b>Center Time : {center.from} to {center.to}</b></p><br />
                </Card.Text>
            </Card.Body>
        </Card>
    )

}
export default Sucess;