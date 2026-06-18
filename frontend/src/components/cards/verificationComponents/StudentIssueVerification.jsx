import React, { useEffect, useState } from "react";
import SiganturePad from "../signaturePad/SiganturePad";
import { getStudentDetails } from "../../../services/api/students/Students.Api";
import { getAllDeviceDetails } from "../../../services/api/devices/Device.Api";
import { getMonthName, getTodayFullDate, handleCurrency } from "../../../utils/helperMethods";

function StudentIssueVerification({ deviceId, student_no }) {
  const [studentData, setStudentData] = useState();
  const [deviceDetails, setDeviceDetails] = useState();

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();

  const [showToast, setShowToast] = useState({ isShow: false, type: "", message: null });

  //Get Student data
  const getStudentData = () => {
    if (student_no) {
      getStudentDetails(student_no, setStudentData);
    }
  };

  const handleDeviceDetails = (deviceDetails) => {
    setDeviceDetails(...deviceDetails);
  };

  const getDeviceDetails = () => {
    if (!deviceId) {
      return console.log("Selected device id not provided");
    }
    getAllDeviceDetails(deviceId, handleDeviceDetails);
  };

  useEffect(() => {
    //Date
    const { year, month, day } = getTodayFullDate();
    setYear(year);
    setDay(day);
    setMonth(getMonthName(month));

    getStudentData();
    getDeviceDetails();
  }, [student_no]);

  return (
    <div>
      <div className="printable h-[1200px]">
        <div class="page-header ">
          <img src="\SPU-logo-1024x1024.jpg" alt="spu logo" class="page-logo" />
          <div class="page-address">
            <span class="address-heading">SOL PLAATJE UNIVERSITY</span>
            <span class="address-text">Private Bag X 5008, Kimberly, 8300</span>
            <span class="address-text">Luka Jantjie House, Chapel Street,</span>
            <span class="address-text">Kimberly</span>
            <span class="address-text">Tel: 053 491 0000</span>
            <span class="address-text">
              <a href="http://spu.ac.za">www.spu.ac.za</a>
            </span>
          </div>
        </div>
        <div className="body-header">
          <span class="body-title">ACKNOWLEDGEMENT OF DEBT</span>
        </div>

        <div className="page-body ">
          <div className="page-content">
            <span className=""> I, the undersigned,</span>

            <div class="content">
              <div class="left">
                <span class="boo">
                  Full Names: <span class="fullnames content-data">{`${studentData?.name} ${studentData?.surname}`}</span>
                </span>

                <span class="boo">
                  Course Code: <span class="qualCode content-data">{studentData?.course_code}</span>
                </span>

                <span class="boo">
                  Student Number: <span class="studentNo content-data">{studentData?.student_number}</span>
                </span>

                <span class="boo">
                  Contact Number: <span class="phoneNo content-data">{studentData?.phone_number}</span>
                </span>
              </div>

              <div class="right">
                <span class="boo"></span>

                <span class="boo">
                  Course Name: <span class="qualName content-data">{studentData?.course_name}</span>
                </span>

                <p class="boo">
                  ID Number: <span class="idNo content-data">{studentData?.id_number}</span>
                </p>
              </div>
            </div>

            <span>
              do hereby acknowledge myself to be truly and lawfully indebted unto and in favour of Sol Plaatje University (hereinafter referred to as ‘SPU’) in the sum of <b></b>
              <span class="laptopValue content-data">{handleCurrency(deviceDetails?.purchase_price)}</span> being in respect of a laptop, Model:
              <span class="laptopModel content-data">{`${deviceDetails?.make} ${deviceDetails?.model} `}</span>
              with Serial No: <span class="laptopSerialNo content-data">{deviceDetails?.serial_no}</span> provided to me by SPU to be used as a student laptop.
            </span>

            <div class="boo3">
              <ol className="flex flex-col marker:text-black list-decimal list-inside px-5 gap-1">
                <li>
                  I acknowledge that on receipt of the laptop, the laptop becomes my property and I assume and bear all risk of loss associated with the laptop from the time and date that the laptop
                  is in my possession. I acknowledge that the laptop is not the property of SPU from the moment I receive it. Therefore, I am responsible for all damages or out-of-warranty claims. I
                  undertake that I will arrange comprehensive insurance in respect of my laptop and acknowledge that my laptop is not insured by SPU.
                </li>

                <li>I acknowledge that the abovementioned amount shall be debited against my student fees account with SPU, and that I am liable for payment of the said amount.</li>

                <li>Should my funders not cover this amount for whatsoever reason, I undertake to repay the said sum to SPU by no later than 30 November {year}.</li>

                <li>I hereby renounce the benefits of the legal exceptions “non numeratae pecuniae”, “errore calculi”, “non causa debiti” and “revision of accounts”.</li>

                <li>No act of relaxation, indulgence, or grace on the part of SPU shall in any way operate or be deemed to be a waiver by SPU of any of its rights against me.</li>

                <li>
                  In the event of me not making payment on or before the due date, then the full amount owed by me to SPU shall forthwith become due and payable and SPU shall have the right to
                  institute legal proceedings against me without notice.
                </li>

                <li>I undertake to pay all, or any costs incurred by SPU while enforcing any of its rights against me, including collection commission.</li>

                <li>I hereby consent to the jurisdiction of the Magistrate’s Court.</li>

                <li>
                  The parties do hereby choose domicillium et executandi as set out hereunder:
                  <ol className="flex flex-col marker:text-black list-decimal list-inside px-5 gap-2">
                    <li>
                      <b>
                        The Student: <span class="fullnames2 content-data">{`${studentData?.name} ${studentData?.surname}`}</span>
                      </b>
                    </li>
                    <li>SPU: Luka Jantjie House, Chapel Street, Kimberley, 8301</li>
                  </ol>
                </li>

                <li>This acknowledgement of debt constitutes the whole agreement between the parties and no representations or warranties not contained herein shall be of any force or effect.</li>
              </ol>
            </div>

            <div>
              Signed at Kimberley on the: <span className="font-semibold">{day}</span> day of <span className="font-semibold">{month}</span> <span className="font-semibold">{year}</span>
            </div>
            <SiganturePad
              lablel={"Student Signature"}
              user_id={studentData?.student_number}
              userDetails={studentData}
              deviceDetails={deviceDetails}
              setShowToast={setShowToast}
              formType={"student-issue"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentIssueVerification;

/*user_id={staff_no} staffData={staffData} deviceDetails={deviceDetails} setShowToast={setShowToast}*/
