import React from "react";
import web3NFTCowCertService from "./web3NFTCowCert.server";

class NFTDashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nftcontract: null,
      account: "",
      name:"",
      symbol:"",
      ownerCount:0,
      NFTCowCount:0,
      balanceOf:0,
      TaskMapOwner:[]
    }
  }

  async componentWillMount() {
    await web3NFTCowCertService.loadWeb3();
    await web3NFTCowCertService.loadBlockchainData();
    // console.log(web3NFTCowCertService.state.NFTCowCert);
    this.setState({
      account : web3NFTCowCertService.state.account,
      nftcontract : web3NFTCowCertService.state.TaskMapOwner,
      name:web3NFTCowCertService.state.name,
      symbol:web3NFTCowCertService.state.symbol,
      ownerCount:web3NFTCowCertService.state.ownerCount,
      NFTCowCount:web3NFTCowCertService.state.NFTCowCount,
      balanceOf:web3NFTCowCertService.state.balanceOf,
      TaskMapOwner:web3NFTCowCertService.state.TaskMapOwner
    })
  }

  render() {
    return (
      <>
        <div className="container-fluid bg-light py-5">
          <div className="col-md-6 m-auto text-center">
            <h1 className="h1">{this.state.symbol}</h1>
            <div className="input-group mb-3 text-center">
              {/* <p>{this.state.name}</p> */}
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">No</th> */}
                  <th scope="col">No</th>
                  {/* <th scope="col">Method</th> */}
                  <th scope="col">Method</th>
                  <th scope="col">Remark</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Symbol()</td>
                  <td>ชื่อเหรียญ {this.state.symbol}  ผลิตออกมาจำนวน</td>
                  <td>{this.state.NFTCowCount} {this.state.symbol}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Name()</td>
                  <td>ชื่อเต็ม  NFT </td>
                  <td>{this.state.name}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>NFTCowCertCount()</td>
                  <td>จำนวนผู้ดูแลระบบ  NFT </td>
                  <td>{this.state.ownerCount}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>BlocklistNFTCow(uint256)</td>
                  <td>จำนวนผู้ดูแลระบบ  NFT </td>
                  <td>{this.state.ownerCount}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>TaskMapOwner(uint256)</td>
                  <td>จำนวนผู้ดูแลระบบ  NFT </td>
                  <td>{this.state.ownerCount}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>addNFTCowAdmin(address,string)</td>
                  <td>จำนวนผู้ดูแลระบบ  NFT </td>
                  <td>{this.state.ownerCount}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>approve(address,string)</td>
                  <td>จำนวนผู้ดูแลระบบ  NFT </td>
                  <td>{this.state.ownerCount}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>balanceOf(address)</td>
                  <td>จำนวนเหรียญที่ address  ถือครอง </td>
                  <td>{this.state.balanceOf}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>blockCowcert(uint256)</td>
                  <td>จำนวนเหรียญที่ address  ถือครอง </td>
                  <td>{this.state.balanceOf}</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>blockNFTCow(uint256)</td>
                  <td>จำนวนเหรียญที่ address  ถือครอง </td>
                  <td>{this.state.balanceOf}</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>getApproved(uint256)</td>
                  <td> </td>
                  <td>{this.state.balanceOf}</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>isApprovedForAll(address,address)</td>
                  <td></td>
                  <td>{this.state.balanceOf}</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>TaskMapOwner(uint256)</td>
                  <td>{this.state.TaskMapOwner[1]}</td>
                  <td>{this.state.TaskMapOwner[2]}</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>safeTransferFrom(address,address,uint256)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>setApprovalForAll(address,address,uint256)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>tokenMintCowCert(address,string,string,string)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>tokenURI(uint256)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>transferFrom(address,address,uint256)</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>19</td>
                  <td>blockNFTCow(uint256)</td>
                  <td>บล็อก NFT ในระบบไม่ให้ดำเนินการธุรกรรม</td>
                  <td></td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>unBlockNFTCow(uint256)</td>
                  <td>ปลดบล็อก NFT ในระบบให้สามารถดำเนินการธุรกรรมได้</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default NFTDashbord;
