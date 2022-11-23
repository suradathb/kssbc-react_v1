import React, { Component } from "react";
import { Link } from "react-router-dom";

class Abount extends React.Component {
  async componentWillMount() {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="container-fluid bg-light py-5">
          <div className="col-md-6 m-auto text-center">
            <h1 className="h1">Abount</h1>
            <div className="input-group mb-3 text-center">
              <p>{/* {this.state.acname} */}</p>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <h1 className="h2 text-center">โหนดและไคลเอนต์</h1>
            <h3>ระบบปฏิบัติการ</h3>
            <p>
              ลูกค้าทั้งหมดรองรับระบบปฏิบัติการหลัก - Linux, MacOS, Windows
              ซึ่งหมายความว่าคุณสามารถเรียกใช้โหนดบนเดสก์ท็อปหรือเครื่องเซิร์ฟเวอร์ทั่วไปด้วยระบบปฏิบัติการ
              (OS) ที่เหมาะกับคุณที่สุด
              ตรวจสอบให้แน่ใจว่าระบบปฏิบัติการของคุณเป็นรุ่นล่าสุดเพื่อหลีกเลี่ยงปัญหาที่อาจเกิดขึ้นและช่องโหว่ด้านความปลอดภัย
            </p>
            <table className="table">
              <thead>
                <tr>
                    <th>minimum/maximum</th>
                    <th>รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>ความต้องการขั้นต่ำ</td>
                    <td>
                        <li>CPU ที่มี 2+ คอร์</li>
                        <li>แรม 8GB</li>
                        <li>พื้นที่ว่างในดิสก์ 700GB</li>
                        <li>แบนด์วิธ 10+ MBit/s</li>
                    </td>
                </tr>
                <tr>
                    <td>ข้อมูลจำเพาะที่แนะนำ</td>
                    <td>
                        <li>CPU เร็วพร้อม 4+ คอร์</li>
                        <li>แรม 16GB+</li>
                        <li>SSD ที่รวดเร็วพร้อม 1+TB</li>
                        <li>แบนด์วิธ 25+ MBit/s</li>
                    </td>
                </tr>
              </tbody>
            </table>
            <p>โหมดการซิงค์และไคลเอ็นต์ที่คุณเลือกจะส่งผลต่อความต้องการพื้นที่ แต่เราได้ประมาณพื้นที่ดิสก์ที่คุณต้องการสำหรับแต่ละไคลเอ็นต์ด้านล่าง</p>

            <table className="table">
              <thead>
                <tr>
                    <th>ลูกค้า</th>
                    <th>ขนาดดิสก์ (สแนปซิงค์)</th>
                    <th>ขนาดดิสก์ (ไฟล์เก็บถาวรแบบเต็ม)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>Geth</td>
                    <td>500GB+</td>
                    <td>12TB+</td>
                </tr>
                <tr>
                    <td>Nethermind</td>
                    <td>500GB+</td>
                    <td>12TB+</td>
                </tr>
                <tr>
                    <td>Besu</td>
                    <td>800GB+</td>
                    <td>12TB+</td>
                </tr>
                <tr>
                    <td>Erigon</td>
                    <td>N/A</td>
                    <td>2.5TB+</td>
                </tr>
              </tbody>
            </table>
            <li>หมายเหตุ: Erigon ไม่มีการซิงค์แบบสแนป แต่สามารถตัดแต่งแบบเต็มได้ (~500GB)</li>
          </div>
        </div>
      </>
    );
  }
}

export default Abount;
