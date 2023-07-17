import React from "react";
import Web3MyTokenService from "./web3Mytoken.server";
import STOMintDialog from "./STOMintDialog";
import STOApproveDialog from "./STOApproveDialog";
import STOTransferFromDialog from "./STOTransferFromDialog";
import STOTransferDialog from "./STOTransferDialog";
import STOAmlKyc from "./STOAmlKyc";
import STOBurnDialog from "./STOBurnDialog";

class StoMain extends React.Component {
  async componentWillMount() {
    await Web3MyTokenService.loadWeb3();
    await Web3MyTokenService.loadBlockchainData();
    console.log(Web3MyTokenService.state.MyToken);
    const balance = await Web3MyTokenService.state.MyToken.methods
      .balanceOf(Web3MyTokenService.state.account)
      .call({ from: Web3MyTokenService.state.account });
    const allowance = await Web3MyTokenService.state.MyToken.methods
      .allowance("0xE935a4C890a1D1B8b1F9aFC83eA96b65792e2736",Web3MyTokenService.state.account)
      .call({ from: Web3MyTokenService.state.account });
    const aml = await Web3MyTokenService.state.MyToken.methods.isAMLVerified(Web3MyTokenService.state.account).call({from:Web3MyTokenService.state.account});
    const kyc = await Web3MyTokenService.state.MyToken.methods.isKYCVerified(Web3MyTokenService.state.account).call({from:Web3MyTokenService.state.account});

    this.setState({
      stocontract: Web3MyTokenService.state.MyToken,
      account: Web3MyTokenService.state.account,
      stoname: Web3MyTokenService.state.name,
      stoTotalSuppy: Web3MyTokenService.state.totalSupply,
      stosymbol: Web3MyTokenService.state.symbol,
      stodecimals: Web3MyTokenService.state.decimals,
      stoowner: Web3MyTokenService.state.owner,
      stobalance: balance,
      allowance: allowance,
      stokyc:kyc,
      stoaml:aml,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      stocontract: null,
      account: "",
      stoname: "",
      stosymbol: "",
      stoTotalSuppy: 0,
      stodecimals: "",
      stoowner: "",
      stobalance: 0,
      allowance: "",
      stokyc:false,
      stoaml:false,
      showaml:"AML",
      showkyc:"KYC"
    };
  }

  render() {
    const aml = this.state.stoaml;
    const kyc = this.state.stokyc;
    let showaml;
    let showkyc;
    if(aml){
      showaml = "ผ่านการป้องกันและปราบปรามการฟอกเงิน";
    } else {
      showaml = "ยังwไม่ผ่านการป้องกันและปราบปรามการฟอกเงิน";
    }
    if(kyc){
      showkyc = "ผ่านการทำความรู้จักลูกค้า KYC";
    } else {
      showkyc = "ยังไม่ผ่านการทำความรู้จักลูกค้า KYC";
    }
    return (
      <>
        <div className="container-fluid bg-light py-5">
          <div className="col-md-6 m-auto text-center">
            <h1 className="h1">Security Token Offering</h1>
            <div className="input-group mb-3 text-center">
              <p></p>
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
                  <td>totalSupply()</td>
                  <td>จำนวนเหรียญ {this.state.stosymbol} ทั้งหมด</td>
                  <td>{this.state.stoTotalSuppy} Wei</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Owner()</td>
                  <td>address ของผู้มีสิทธ์ออก Token</td>
                  <td>{this.state.stoowner}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>symbol()</td>
                  <td>สัญลักษณ์โทเค้น สั้น</td>
                  <td>{this.state.stosymbol}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>name()</td>
                  <td>ชื่อเต็มโทเค้น</td>
                  <td>{this.state.stoname}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>decimals()</td>
                  <td>จำนวนทศนิยมที่ใช้ในการเป็นตัวแทนผู้ใช้</td>
                  <td>{this.state.stodecimals}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>balanceOf()</td>
                  <td>แสดงยอดคงเหลือ Address ที่เข้าใช้งาน</td>
                  <td>
                    {this.state.stobalance} {this.state.stosymbol}
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Transfer(address,amount)</td>
                  <td>โอน Token ผู้ใช้ให้กับ address เป้าหมาย</td>
                  <td>
                    <STOTransferDialog
                      state={{
                        contract: this.state.stocontract,
                        account: this.state.account,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Burn(amount)</td>
                  <td>
                    การสั่ง Burn Token ด้วย address ที่ใช้งานอยู่ ยอดการ burn
                    จะถูกลบทิ้ง
                  </td>
                  <td>
                    <STOBurnDialog
                      state={{
                        contract: this.state.stocontract,
                        account: this.state.account,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Approve(spender,amount)</td>
                  <td>สั่งจ่ายเช็ค Token ให้ address เป้าหมาย</td>
                  <td>
                    <STOApproveDialog
                      state={{
                        contract: this.state.stocontract,
                        account: this.state.account,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>allowance(tokenOwner ,spender)</td>
                  <td>ใช้ตรวจสอบยอดเงินที่ approve() ไว้</td>
                  <td>คุณมีเช็ครอรับ {this.state.allowance} KSSBC</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>TransferFrom(from,to,amount)</td>
                  <td>สั่งจ่ายเช็ค Token ให้ address เป้าหมาย</td>
                  <td>
                    <STOTransferFromDialog
                      state={{
                        contract: this.state.stocontract,
                        account: this.state.account,
                        from: this.state.fromaddress,
                        price: this.state.allowance,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Mint(to,amount)</td>
                  <td>ออกเหรียญเข้าระบบ</td>
                  <td>
                    <STOMintDialog
                      state={{
                        contract: this.state.stocontract,
                        account: this.state.account,
                        // from: this.state.fromaddress,
                        // price: this.state.allowance,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>AML(address)</td>
                  <td>{showaml}</td>
                  <td>
                    <STOAmlKyc
                      state={{
                        contract: this.state.stocontract,
                        account: this.state.account,
                        status: this.state.showaml
                        // from: this.state.fromaddress,
                        // price: this.state.allowance,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>KYC(address)</td>
                  <td>{showkyc}</td>
                  <td>
                    <STOAmlKyc
                      state={{
                        contract: this.state.stocontract,
                        account: this.state.account,
                        status: this.state.showkyc
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default StoMain;
