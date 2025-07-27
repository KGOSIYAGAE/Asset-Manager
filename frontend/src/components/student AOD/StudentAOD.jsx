import React, { useEffect, useState } from "react";
import { getMonthName, getTodayFullDate } from "../../utils/helperMethods";
import { getStudent, getStudentDetails } from "../../services/api/students/Students.Api";
import { getAllDeviceDetails } from "../../services/api/devices/Device.Api";
import { FaRedo } from "react-icons/fa";
import SubmitButton from "../buttons/SubmitButton";
import { getUser } from "../../services/api/staff/Staff.Api";
import Modal from "react-modal";
import SiganturePad from "../cards/signaturePad/SiganturePad";
import { getLoggedInUser } from "../../utils/getLoggedInUser";

function StudentAOD({ deviceId, handleOnPrint, student_no }) {
  const [openModal, setOpenModal] = useState({ isShown: false, trimmedDataURL: null, setTrimmedDataURL: null, user_id: null });

  const [ictStaffTrimmedDataURL, setIctStaffTrimmedDataURL] = useState(null);
  const [studentTrimmedDataURL, setStudentTrimmedDataURL] = useState(null);
  const [witness1TrimmedDataURL, setWitness1TrimmedDataURL] = useState(null);
  const [witness2TrimmedDataURL, setWitness2TrimmedDataURL] = useState(null);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState();

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [studentData, setStudentData] = useState();
  const [deviceDetails, setDeviceDetails] = useState();

  //Get Student data
  const getData = () => {
    if (student_no) {
      getStudentDetails(student_no, setStudentData);
    }
  };

  //Get Logged In User details
  const getLoggedInUserDetails = () => {
    if (loggedInUser?.id) {
      getUser(loggedInUser?.id, setLoggedInUserDetails);
    }
  };

  //Get device data based on device id
  const setDetails = (deviceData) => {
    setDeviceDetails(...deviceData);
    getLoggedInUserDetails();
  };

  const getDeviceDetails = () => {
    if (!deviceId) {
      return console.log("Selected device id not provided");
    }
    getAllDeviceDetails(deviceId, setDetails);
  };

  useEffect(() => {
    const { year, month, day } = getTodayFullDate();
    setYear(year);
    setDay(day);
    setMonth(getMonthName(month));
    getData();
    getDeviceDetails();
    setLoggedInUser(getLoggedInUser());

    //handleOnPrint();
  }, []);

  return (
    <div className="printable h-[1200px]">
      <div class="page-header ">
        <img src="\public\SPU-logo-1024x1024.jpg" alt="spu logo" class="page-logo" />
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
            do hereby acknowledge myself to be truly and lawfully indebted unto and in favour of Sol Plaatje University (hereinafter referred to as ‘SPU’) in the sum of <b>R</b>
            <span class="laptopValue content-data">{deviceDetails?.purchase_price}</span> being in respect of a laptop, Model:{" "}
            <span class="laptopModel content-data">{`${deviceDetails?.make} ${deviceDetails?.model}`}</span>
            with Serial No: <span class="laptopSerialNo content-data">{deviceDetails?.serial_no}</span> provided to me by SPU to be used as a student laptop.
          </span>
          {/*<br>*/}
          <div class="boo3">
            <ol className="flex flex-col marker:text-black list-decimal list-inside px-5 gap-1">
              <li>
                I acknowledge that on receipt of the laptop, the laptop becomes my property and I assume and bear all risk of loss associated with the laptop from the time and date that the laptop is
                in my possession. I acknowledge that the laptop is not the property of SPU from the moment I receive it. Therefore, I am responsible for keeping the laptop safe and will be responsible
                for all damages or out-of-warranty claims. I undertake that I will arrange comprehensive insurance in respect of my laptop and acknowledge that my laptop is not insured by SPU.
              </li>

              <li>I acknowledge that the abovementioned amount shall be debited against my student fees account with SPU, and that I am liable for payment of the said amount.</li>
              <li>Should my funders not cover this amount for whatsoever reason, I undertake to repay the said sum to SPU by no later than 30 November {year}.</li>
              <li>
                I hereby renounce the benefits of the legal exceptions “non numeratae pecuniae”, “errore calculi”, “non causa debiti” and “revision of accounts”, the meaning and effect of which I
                acknowledge myself to be fully acquainted.
              </li>
              <li>
                No act of relaxation, indulgence, or grace on the part of SPU shall in any way operate or be deemed to be a waiver by SPU of any of its rights against me under this acknowledgement of
                debt.
              </li>
              <li>
                In the event of me not making payment on or before the due date, then the full amount owed by me to SPU shall forthwith become due and payable by me to SPU and SPU shall have the right
                to institute legal proceedings against me for the recovery thereof without notice.
              </li>
              <li>
                I undertake to pay all, or any costs incurred by SPU while enforcing any of its rights against me in terms hereof on the scale as between SPU and its own attorney, including collection
                commission and notwithstanding that proceedings may not have been instituted against me by SPU out of any court.
              </li>
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
                {/*<br>*/}
              </li>

              <li>
                This acknowledgement of debt constitutes the whole agreement between the parties and no representations or warranties not contained herein shall be of any force or effect unless in
                writing and signed by both the parties hereto. No consensual termination of this agreement shall be of any force or effect unless in writing and signed by both parties hereto. The
                parties acknowledge that they have not been induced or coerced to enter into this contract by virtue of any representations, statements or warranties made by the other of them or
                persons acting on their behalf, which are not included herein. SPUshall not be responsible for any representations which may be made from time to time by its representatives, servants
                or agents, save as may be contained herein.
              </li>
            </ol>
          </div>
          <div>
            Signed at Kimberley on the: <span className="font-semibold">{day}</span> day of <span className="font-semibold">{month}</span> <span className="font-semibold">{year}</span>
          </div>
        </div>
        {/*<br>*/}
      </div>
      <div class="page-footer ">
        <div className="w-full">
          <div className=" flex justify-between ">
            {/**/}
            <div className="flex flex-col ">
              <div className=" flex justify-between ">
                <div className={` col-span-1 flex  ${ictStaffTrimmedDataURL || loggedInUserDetails?.image_base64 ? "justify-start" : "items-center"}`}>
                  {loggedInUserDetails?.image_base64 || ictStaffTrimmedDataURL ? (
                    <div>
                      <div className=" flex justify-between ">
                        <div className="flex flex-col items-center justify-center ">
                          <img alt="signature" src={ictStaffTrimmedDataURL || loggedInUserDetails?.image_base64} className="w-[180px] " />
                        </div>
                        <button
                          onClick={() => {
                            console.log(loggedInUserDetails?.staff_no);
                            setOpenModal({
                              isShown: true,
                              isShown: true,
                              trimmedDataURL: ictStaffTrimmedDataURL,
                              setTrimmedDataURL: setIctStaffTrimmedDataURL,
                              user_id: loggedInUserDetails?.staff_no,
                            });
                          }}
                        >
                          <div className="bg-slate-100 rounded-md 0 p-1 text-gray-500 border border-gray-500 noprint">
                            <FaRedo className={` hover:rotate-180 transition-all duration-300`} size={12} />
                          </div>
                        </button>
                      </div>
                      <div className="flex flex-col -mt-3">
                        <span class="">.............................................................</span>
                        <span class="">OBO SPU</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div>
                        <SubmitButton
                          text={"Add signature"}
                          onClick={() => {
                            setOpenModal({
                              isShown: true,
                              isShown: true,
                              trimmedDataURL: ictStaffTrimmedDataURL,
                              setTrimmedDataURL: setIctStaffTrimmedDataURL,
                              user_id: loggedInUserDetails?.staff_no,
                            });
                          }}
                        />
                      </div>
                      <div className="flex flex-col ">
                        <span class="">.............................................................</span>
                        <span class="">OBO SPU</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/**/}
            <div className="flex flex-col ">
              <div className=" flex justify-between ">
                <div className={` col-span-1 flex  ${studentTrimmedDataURL || studentData?.image_base64 ? "justify-start" : "items-center"}`}>
                  {studentData?.image_base64 || studentTrimmedDataURL ? (
                    <div>
                      <div className=" flex justify-between ">
                        <div className="flex flex-col items-center justify-center ">
                          <img alt="signature" src={studentTrimmedDataURL || studentData?.image_base64} className="w-[180px] " />
                        </div>
                        <button
                          onClick={() => {
                            setOpenModal({
                              isShown: true,
                              isShown: true,
                              trimmedDataURL: studentTrimmedDataURL,
                              setTrimmedDataURL: setStudentTrimmedDataURL,
                              user_id: studentData?.student_number,
                            });
                          }}
                        >
                          <div className="bg-slate-100 rounded-md 0 p-1 text-gray-500 border border-gray-500 noprint">
                            <FaRedo className={` hover:rotate-180 transition-all duration-300`} size={12} />
                          </div>
                        </button>
                      </div>
                      <div className="flex flex-col -mt-3">
                        <span class="">.............................................................</span>
                        <span class="">Student</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div>
                        <SubmitButton
                          text={"Add signature"}
                          onClick={() => {
                            console.log(studentData?.student_number);
                            setOpenModal({
                              isShown: true,
                              isShown: true,
                              trimmedDataURL: studentTrimmedDataURL,
                              setTrimmedDataURL: setStudentTrimmedDataURL,
                              user_id: studentData?.student_number,
                            });
                          }}
                        />
                      </div>
                      <div className="flex flex-col ">
                        <span class="">.............................................................</span>
                        <span class="">Student</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/**/}
          </div>
        </div>
        <div className="w-full">
          <div className=" flex justify-between ">
            <span class="">…………………………………………</span>
            <span class="">…………………………………………</span>
          </div>
          <div className=" flex justify-between ">
            <span class="">Witness 1</span>
            <span class="w-[192px] ">Witness 2</span>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openModal.isShown}
        ariaHideApp={false}
        onRequestClose={() => {
          setOpenModal({ isShown: false });
        }}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className="w-[80%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <SiganturePad
          lablel={"Signature"}
          trimmedDataURL={openModal?.trimmedDataURL}
          setTrimmedDataURL={openModal?.setTrimmedDataURL}
          user_id={openModal?.user_id}
          onClose={() => {
            setOpenModal({ isShown: false });
          }}
        />
      </Modal>
    </div>
  );
}

export default StudentAOD;

/*
<div class="">
          <p class="">…………………………………………</p>
          <p>Obo SPU</p>
          <p class="">…………………………………………</p>
          <p>Witness</p>
        </div>
        <div class="">
          <p class="">…………………………………………</p>
          <p>Student</p>
          <p class="">…………………………………………</p>
          <p>Witness</p>
        </div>
*/

/*
<div class="printable">
      <div class="page-header">
        <img src="\public\SPU-logo-1024x1024.jpg" alt="spu logo" class="page-logo" />
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
      <div class="body-header">
        <span class="body-title">ACKNOWLEDGEMENT OF DEBT</span>
      </div>
      <div class="page-body">
        <p class="page-content">
          I, the undersigned,
          <div class="content">
            <div class="left">
              <p class="boo">
                Full Names: <span class="fullnames content-data"></span>
              </p>
              <p class="boo">
                Course Code: <span class="qualCode content-data"></span>
              </p>
              <p class="boo">
                Student Number: <span class="studentNo content-data"></span>
              </p>
              <p class="boo">
                Contact Number: <span class="phoneNo content-data"></span>
              </p>
            </div>
            <div class="right">
              <p class="boo">&#160</p>
              <p class="boo">
                Course Name: <span class="qualName content-data"></span>
              </p>
              <p class="boo">
                ID Number: <span class="idNo content-data"></span>
              </p>
            </div>
          </div>
          do hereby acknowledge myself to be truly and lawfully indebted unto and in favour of Sol Plaatje University (hereinafter referred to as ‘SPU’) in the sum of <b>R</b>
          <span class="laptopValue content-data"></span> being in respect of a laptop, Model: <span class="laptopModel content-data"></span>
          with Serial No: <span class="laptopSerialNo content-data"></span> provided to me by SPU to be used as a student laptop.
          {/*<br>*
          <div class="boo3">
            <ol>
              <li>
                I acknowledge that on receipt of the laptop, the laptop becomes my property and I assume and bear all risk of loss associated with the laptop from the time and date that the laptop is
                in my possession. I acknowledge that the laptop is not the property of SPU from the moment I receive it. Therefore, I am responsible for keeping the laptop safe and will be responsible
                for all damages or out-of-warranty claims. I undertake that I will arrange comprehensive insurance in respect of my laptop and acknowledge that my laptop is not insured by SPU.
              </li>

              <li>I acknowledge that the abovementioned amount shall be debited against my student fees account with SPU, and that I am liable for payment of the said amount.</li>
              <li>Should my funders not cover this amount for whatsoever reason, I undertake to repay the said sum to SPU by no later than 30 November 2024.</li>
              <li>
                I hereby renounce the benefits of the legal exceptions “non numeratae pecuniae”, “errore calculi”, “non causa debiti” and “revision of accounts”, the meaning and effect of which I
                acknowledge myself to be fully acquainted.
              </li>
              <li>
                No act of relaxation, indulgence, or grace on the part of SPU shall in any way operate or be deemed to be a waiver by SPU of any of its rights against me under this acknowledgement of
                debt.
              </li>
              <li>
                In the event of me not making payment on or before the due date, then the full amount owed by me to SPU shall forthwith become due and payable by me to SPU and SPU shall have the right
                to institute legal proceedings against me for the recovery thereof without notice.
              </li>
              <li>
                I undertake to pay all, or any costs incurred by SPU while enforcing any of its rights against me in terms hereof on the scale as between SPU and its own attorney, including collection
                commission and notwithstanding that proceedings may not have been instituted against me by SPU out of any court.
              </li>
              <li>I hereby consent to the jurisdiction of the Magistrate’s Court.</li>
              <li>
                The parties do hereby choose domicillium et executandi as set out hereunder:
                <div class="boo2">
                  <ol>
                    <li>
                      <b>
                        The Student: <span class="fullnames2 content-data"></span>
                      </b>
                    </li>
                    <li>SPU: Luka Jantjie House, Chapel Street, Kimberley, 8301</li>
                  </ol>
                </div>
                {/*<br>*
              </li>

              <div class="boo4">
                <li>
                  This acknowledgement of debt constitutes the whole agreement between the parties and no representations or warranties not contained herein shall be of any force or effect unless in
                  writing and signed by both the parties hereto. No consensual termination of this agreement shall be of any force or effect unless in writing and signed by both parties hereto. The
                  parties acknowledge that they have not been induced or coerced to enter into this contract by virtue of any representations, statements or warranties made by the other of them or
                  persons acting on their behalf, which are not included herein. SPUshall not be responsible for any representations which may be made from time to time by its representatives,
                  servants or agents, save as may be contained herein.
                </li>
              </div>
            </ol>
          </div>
          Signed at Kimberley on the: ……………………… day of ………………………………………… 2024
        </p>
        {/*<br>*
      </div>
      <div class="page-footer">
        <div class="left">
          <p class="boo">…………………………………………</p>
          <p>Obo SPU</p>
          <p class="boo">…………………………………………</p>
          <p>Witness</p>
        </div>
        <div class="right">
          <p class="boo">…………………………………………</p>
          <p>Student</p>
          <p class="boo">…………………………………………</p>
          <p>Witness</p>
        </div>
      </div>
    </div>
*/
