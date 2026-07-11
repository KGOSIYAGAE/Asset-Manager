import React from "react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineFacebook } from "react-icons/md";

function Approval() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-5 gap-5 border border-red-500 ">
      <div className="flex items-center justify-center">
        <span className="font-bold text-3xl">Approval Required</span>
      </div>
      <div className="">
        <p>Dear Admin,</p>
        <br />
        <p>A request to issue a company laptop requires your immediate review and approval.</p>
        <br />
        <span className="font-bold">Issuance Details:</span>
        <br />
        <table className=" border-0">
          <tbody>
            <tr className="">
              <td className=" border-b-0"> Recipient:</td>
              <td className=" border-b-0"> User A</td>
            </tr>
            <tr>
              <td className=" border-b-0"> Recipient Staff No:</td>
              <td className=" border-b-0"> 0000</td>
            </tr>
            <tr>
              <td className=" border-b-0"> Issued By:</td>
              <td className=" border-b-0"> Person B</td>
            </tr>
            <tr>
              <td className=" border-b-0"> Issuer Staff No:</td>
              <td className=" border-b-0"> 1111</td>
            </tr>
            <tr>
              <td className=" border-b-0"> Request Date:</td>
              <td className=" border-b-0"> 09 July 2026</td>
            </tr>
          </tbody>
        </table>
        <br />
        <span className="font-bold">Device Details:</span>
        <br />
        <table className=" border-0">
          <tbody>
            <tr className="">
              <td className=" border-b-0"> Model:</td>
              <td className=" border-b-0"> HP 255 G8</td>
            </tr>
            <tr>
              <td className=" border-b-0"> Serial number:</td>
              <td className=" border-b-0"> CND23818JS</td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="flex gap-3">
          <p> Please log into the asset management portal to approve or reject this request.</p>
          <a className="text-blue-600 underline">ICT-Asset-Manager</a>
        </div>

        <br />
        <p> Kind Regards,</p>
        <br />
        <div className="flex flex-col gap-3">
          <span className=" border-b-0">IT Service Desk</span>

          <span className=" border-b-0">Department of Information Communication Technology</span>

          <span className=" border-b-0"> Office of the Chief Information Officer</span>

          <span className=" border-b-0">26 Scanlan Street (Central Campus)</span>

          <span className=" border-b-0"> Private Bag X5008, Kimberley, 8300</span>

          <span className=" border-b-0">
            <b>Telephone:</b> <a className="text-blue-600 underline">+27(0)53-491-0495</a>
          </span>

          <span className=" border-b-0">
            <b>Email:</b>{" "}
            <a href="" className="text-blue-600 underline">
              it.servicedesk@spu.ac.za
            </a>
          </span>
          <span className=" border-b-0"></span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <p> Follow us:</p>
            <div className="flex gap-5 text-red-600">
              <a href="">
                <FaYoutube size={25} />
              </a>
              <a href="">
                <FaLinkedin size={25} />
              </a>
              <a href="">
                <MdOutlineFacebook size={25} />
              </a>
              <a href="">
                <FaInstagram size={25} />
              </a>
            </div>
          </div>
          <div>
            <img src="\public\ict_banner.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Approval;
