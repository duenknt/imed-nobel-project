import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const baseURL = "https://api.nobelprize.org/2.1";

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [get, setGet] = useState([]);

  const awardYearFilter = [];
  for (let i = 0; i < get.length; i++) {
    if (awardYearFilter.indexOf(get[i].awardYear) < 0) {
      awardYearFilter.push(get[i].awardYear);
    }
  }

  useEffect(() => {
    axios.get(`${baseURL}/nobelPrizes`).then((response) => {
      setGet(response.data.nobelPrizes);
      console.log("ดูข้อมูล", response.data.nobelPrizes);
    });
  }, []);

  if (!get) return null;

  return (
    <>
      <Container>
        {/* title */}
        <Row>
          <Col>
            <h3 className="title">Nobel Prize</h3>
          </Col>
        </Row>
        <Row md={2}>
          {/* content left */}
          <Col md={3}>
            <Form>
              <Form.Label>
                <b>ปีที่ได้รับรางวัล</b>
              </Form.Label>{" "}
              <br />
              <Form.Label>ปีที่เริ่มต้น</Form.Label>
              {/* <Form.Select size="sm"> */}
              <Form.Select>
                <option value="">โปรดเลือก</option>
                {awardYearFilter.map((option) => (
                  // eslint-disable-next-line react/jsx-key
                  <option value={option}>{option}</option>
                ))}
              </Form.Select>
              <br />
              <Form.Label>ปีที่สิ้นสุด</Form.Label>
              <Form.Select>
                <option value="">โปรดเลือก</option>
                {awardYearFilter.map((option) => (
                  // eslint-disable-next-line react/jsx-key
                  <option value={option}>{option}</option>
                ))}
              </Form.Select>
              <br />
              <p>รวมเงินรางวัลทั้งหมด : {}</p>
            </Form>
            <Button className="button-filter">Apply Filter</Button>
          </Col>
          {/* content right */}
          <Col md={9}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ชื่อรางวัล</th>
                  <th>ปีที่ได้รับรางวัล</th>
                  <th>ผู้ได้รับรางวัล</th>
                  <th>แรงบันดาลใจ</th>
                  <th>เงินรางวัล</th>
                </tr>
              </thead>
              <tbody>
                {get.map((item, index) => (
                  <tr key={index}>
                    <td>{item.categoryFullName.en}</td>
                    <td>{item.awardYear}</td>
                    <td>
                      {Object.keys(item.laureates).map((key) => {
                        if (item.laureates[key].fullName) {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <p>{item.laureates[key].fullName.en}</p>
                          );
                        } else {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <p>{item.laureates[key].orgName.en}</p>
                          );
                        }
                      })}
                    </td>
                    <td>{item.category.en}</td>
                    <td>{item.prizeAmount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
